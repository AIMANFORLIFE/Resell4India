import express, { Request, Response } from 'express'
import crypto from 'crypto'

const router = express.Router()

// Polar.sh webhook secret from environment variables
const WEBHOOK_SECRET = process.env.POLAR_WEBHOOK_SECRET || ''

// Interface for Polar.sh webhook event
interface PolarWebhookEvent {
  type: string
  data: {
    id: string
    organization_id: string
    product_id: string
    customer_id: string
    amount: number
    currency: string
    status: string
    created_at: string
    updated_at: string
  }
}

/**
 * Verifies the webhook signature from Polar.sh
 * @param payload - Raw request body
 * @param signature - Signature from 'x-polar-signature' header
 * @returns boolean indicating if signature is valid
 */
function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) {
    console.error('Webhook secret is not configured')
    return false
  }

  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET)
  const calculatedSignature = hmac.update(payload).digest('hex')
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(calculatedSignature)
  )
}

/**
 * Handles different types of Polar.sh webhook events
 * @param event - The webhook event
 */
async function handleWebhookEvent(event: PolarWebhookEvent) {
  switch (event.type) {
    case 'product.purchase':
      console.log('Product purchase event:', {
        productId: event.data.product_id,
        customerId: event.data.customer_id,
        amount: event.data.amount,
        currency: event.data.currency,
        status: event.data.status
      })
      // TODO: Implement your business logic here
      // e.g., update order status, send confirmation email, etc.
      break

    case 'product.refund':
      console.log('Product refund event:', {
        productId: event.data.product_id,
        customerId: event.data.customer_id,
        amount: event.data.amount,
        status: event.data.status
      })
      // TODO: Implement refund handling logic
      break

    default:
      console.log('Unhandled webhook event type:', event.type)
  }
}

// Webhook endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
  try {
    // Get the signature from the header
    const signature = req.headers['x-polar-signature'] as string
    if (!signature) {
      return res.status(400).json({ error: 'Missing signature header' })
    }

    // Get the raw body for signature verification
    const rawBody = req.body.toString()

    // Verify the webhook signature
    if (!verifyWebhookSignature(rawBody, signature)) {
      return res.status(401).json({ error: 'Invalid signature' })
    }

    // Parse the webhook event
    const event: PolarWebhookEvent = JSON.parse(rawBody)

    // Handle the webhook event
    await handleWebhookEvent(event)

    // Return success response
    res.status(200).json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router 