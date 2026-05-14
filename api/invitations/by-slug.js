import { head } from '@vercel/blob'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const slug = sanitizeSlug(req.query?.slug)
    if (!slug) return res.status(400).json({ error: 'slug required' })

    const meta = await head(`published/${slug}.json`)
    const blobRes = await fetch(`${meta.url}?t=${Date.now()}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })

    if (!blobRes.ok) return res.status(404).json({ error: 'not found' })

    const text = await blobRes.text()
    const invitation = JSON.parse(text)
    return res.status(200).json({ invitation })
  } catch (e) {
    if (e?.name === 'BlobNotFoundError') {
      return res.status(404).json({ error: 'not found' })
    }
    console.error('[/api/invitations/by-slug] error:', e)
    return res.status(500).json({ error: e?.message || 'Lookup failed' })
  }
}

function sanitizeSlug(value) {
  const slug = String(value || '').trim().toLowerCase()
  return /^[a-z0-9_-]{4,64}$/.test(slug) ? slug : ''
}
