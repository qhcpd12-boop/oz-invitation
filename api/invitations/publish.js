import { put } from '@vercel/blob'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const slug = sanitizeSlug(body.slug)
    const draft = body.draft && typeof body.draft === 'object' ? body.draft : null

    if (!slug || !draft) {
      return res.status(400).json({ error: 'slug and draft required' })
    }

    const now = new Date().toISOString()
    const invitation = {
      ...draft,
      id: draft.id || `blob-${slug}`,
      slug,
      status: 'published',
      step: 4,
      publishedAt: draft.publishedAt || now,
      updatedAt: now,
    }

    const payload = JSON.stringify(invitation)
    await put(`published/${slug}.json`, payload, {
      access: 'public',
      allowOverwrite: true,
      contentType: 'application/json; charset=utf-8',
      cacheControlMaxAge: 60,
    })

    return res.status(200).json({ invitation })
  } catch (e) {
    console.error('[/api/invitations/publish] error:', e)
    return res.status(500).json({ error: e?.message || 'Publish failed' })
  }
}

function sanitizeSlug(value) {
  const slug = String(value || '').trim().toLowerCase()
  return /^[a-z0-9_-]{4,64}$/.test(slug) ? slug : ''
}
