import Stripe from 'stripe'
import { getAdminDb } from '../_lib/firebaseAdmin.js'
import { resolveTemplate } from '../_lib/templates.js'

/**
 * POST /api/payments/checkout
 *  body: { invitationId?, templateId, name, phoneNumber }
 *  res:  { url }   // Stripe Checkout 결제 페이지 URL
 *
 * 서버는 templateId 기준으로 결제 금액을 권위적으로 결정하고
 * orders/{orderId} 를 'pending' 으로 생성한 뒤 Stripe 세션을 만든다.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const {
      invitationId,
      templateId,
      name,
      phoneNumber,
    } = body

    const buyerName = String(name || '').trim()
    const buyerPhone = normalizePhone(phoneNumber)

    if (!templateId || !buyerName || buyerPhone.length < 10) {
      return res.status(400).json({ error: 'templateId, name, phoneNumber required' })
    }
    const template = resolveTemplate(templateId)
    if (!template) return res.status(400).json({ error: 'unknown templateId' })

    const stripeSecret = process.env.STRIPE_SECRET_KEY
    if (!stripeSecret) return res.status(500).json({ error: 'STRIPE_SECRET_KEY not configured' })

    const db = getAdminDb()
    let resolvedInvitationId = invitationId || null
    if (invitationId) {
      const invSnap = await db.collection('invitations').doc(invitationId).get()
      if (!invSnap.exists) return res.status(404).json({ error: 'invitation not found' })
    }

    const orderRef = await db.collection('orders').add({
      invitationId: resolvedInvitationId,
      templateId,
      templateName: template.name,
      buyerName,
      buyerPhone,
      amount: template.amount,
      currency: template.currency,
      discount: 0,
      finalAmount: template.amount,
      status: 'pending',
      createdAt: new Date(),
    })

    if (resolvedInvitationId) {
      await db.collection('invitations').doc(resolvedInvitationId).set(
        {
          templateId,
          buyerName,
          buyerPhone,
          status: 'awaiting_payment',
          lastOrderId: orderRef.id,
        },
        { merge: true },
      )
    }

    const baseUrl = process.env.PUBLIC_BASE_URL || `https://${req.headers.host}`
    const stripe = new Stripe(stripeSecret)
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: template.currency,
            product_data: { name: `오즈청첩장 — ${template.name}` },
            unit_amount: template.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/create/complete?orderId=${orderRef.id}`,
      cancel_url: `${baseUrl}/create/checkout?canceled=1`,
      metadata: {
        invitationId: resolvedInvitationId || '',
        orderId: orderRef.id,
        templateId,
        buyerName,
        buyerPhone,
      },
    })

    await orderRef.set({ pgSessionId: session.id }, { merge: true })

    return res.status(200).json({ url: session.url, orderId: orderRef.id })
  } catch (e) {
    console.error('[checkout] error', e)
    return res.status(500).json({ error: e.message })
  }
}

function normalizePhone(value) {
  return String(value || '').replace(/\D+/g, '')
}
