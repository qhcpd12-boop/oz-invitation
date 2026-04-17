import Stripe from 'stripe'
import { getAdminDb } from '../_lib/firebaseAdmin.js'
import { resolvePlan } from '../_lib/plans.js'

/**
 * POST /api/payments/checkout
 *  body: { invitationId, plan }
 *  res:  { url }   // Stripe Checkout 결제 페이지 URL
 *
 * 서버는 결제 금액과 invitationId 를 신뢰 가능한 형태로 결정하고
 * orders/{orderId} 를 'pending' 으로 생성한 뒤 Stripe 세션을 만든다.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const { invitationId, plan: planId } = body
    if (!invitationId || !planId) {
      return res.status(400).json({ error: 'invitationId & plan required' })
    }
    const plan = resolvePlan(planId)
    if (!plan) return res.status(400).json({ error: 'unknown plan' })

    const stripeSecret = process.env.STRIPE_SECRET_KEY
    if (!stripeSecret) return res.status(500).json({ error: 'STRIPE_SECRET_KEY not configured' })

    const db = getAdminDb()
    const invSnap = await db.collection('invitations').doc(invitationId).get()
    if (!invSnap.exists) return res.status(404).json({ error: 'invitation not found' })
    const invitation = invSnap.data()

    const orderRef = await db.collection('orders').add({
      invitationId,
      ownerId: invitation.ownerId,
      plan: planId,
      amount: plan.amount,
      currency: plan.currency,
      status: 'pending',
      createdAt: new Date(),
    })

    await db.collection('invitations').doc(invitationId).set(
      { status: 'awaiting_payment', plan: planId, lastOrderId: orderRef.id },
      { merge: true },
    )

    const baseUrl = process.env.PUBLIC_BASE_URL || `https://${req.headers.host}`
    const stripe = new Stripe(stripeSecret)
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: plan.currency,
            product_data: { name: plan.name },
            unit_amount: plan.amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/create/complete?orderId=${orderRef.id}`,
      cancel_url: `${baseUrl}/create/checkout?plan=${planId}&canceled=1`,
      metadata: {
        invitationId,
        orderId: orderRef.id,
        plan: planId,
      },
    })

    await orderRef.set({ pgSessionId: session.id }, { merge: true })

    return res.status(200).json({ url: session.url, orderId: orderRef.id })
  } catch (e) {
    console.error('[checkout] error', e)
    return res.status(500).json({ error: e.message })
  }
}
