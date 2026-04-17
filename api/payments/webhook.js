import Stripe from 'stripe'
import { getAdminDb } from '../_lib/firebaseAdmin.js'

/**
 * POST /api/payments/webhook  (Stripe webhook)
 *
 * 서명 검증 후 orders / invitations 의 상태 머신을 갱신한다.
 *  - checkout.session.completed → paid
 *  - checkout.session.expired   → expired
 *  - payment_intent.payment_failed → failed
 *
 * 주의: Vercel은 기본적으로 body 를 JSON 파싱한다. Stripe 서명 검증을 위해
 * raw body 가 필요하므로 `bodyParser: false` 로 끄고 직접 읽는다.
 */
export const config = { api: { bodyParser: false } }

async function readRaw(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end()
  }
  const stripeSecret = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!stripeSecret || !webhookSecret) {
    return res.status(500).end('Stripe env not configured')
  }

  const stripe = new Stripe(stripeSecret)
  const sig = req.headers['stripe-signature']
  let event
  try {
    const raw = await readRaw(req)
    event = stripe.webhooks.constructEvent(raw, sig, webhookSecret)
  } catch (e) {
    console.warn('[webhook] signature verification failed', e.message)
    return res.status(400).send(`Webhook Error: ${e.message}`)
  }

  const db = getAdminDb()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const s = event.data.object
        const { invitationId, orderId } = s.metadata || {}
        if (orderId) {
          await db.collection('orders').doc(orderId).set(
            {
              status: 'paid',
              pgPaymentIntent: s.payment_intent || null,
              paidAt: new Date(),
            },
            { merge: true },
          )
        }
        if (invitationId) {
          await db.collection('invitations').doc(invitationId).set(
            { status: 'paid', paidAt: new Date() },
            { merge: true },
          )
        }
        break
      }
      case 'checkout.session.expired': {
        const s = event.data.object
        const { orderId } = s.metadata || {}
        if (orderId) {
          await db.collection('orders').doc(orderId).set(
            { status: 'expired' },
            { merge: true },
          )
        }
        break
      }
      case 'payment_intent.payment_failed': {
        const pi = event.data.object
        const orderId = pi.metadata?.orderId
        if (orderId) {
          await db.collection('orders').doc(orderId).set(
            { status: 'failed', failedAt: new Date(), failureReason: pi.last_payment_error?.message || null },
            { merge: true },
          )
        }
        break
      }
      default:
      // 그 외 이벤트는 무시
    }
  } catch (e) {
    console.error('[webhook] handler error', e)
    return res.status(500).end('handler error')
  }

  return res.status(200).json({ received: true })
}
