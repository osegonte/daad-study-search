import { loadStripe } from '@stripe/stripe-js'

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
const stripePriceId = import.meta.env.VITE_STRIPE_PRICE_ID

if (!stripePublishableKey) {
  throw new Error('Missing Stripe publishable key')
}

if (!stripePriceId) {
  throw new Error('Missing Stripe price ID')
}

// Initialize Stripe
export const stripePromise = loadStripe(stripePublishableKey)

export const STRIPE_PRICE_ID = stripePriceId

// Create Stripe Checkout Session
export async function createCheckoutSession(userId: string, userEmail: string) {
  try {
    // Call your backend to create a checkout session
    // For now, we'll use Stripe Checkout directly
    const stripe = await stripePromise
    
    if (!stripe) {
      throw new Error('Stripe failed to initialize')
    }

    // You'll need to create this endpoint in your backend
    // For now, this is a placeholder structure
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: STRIPE_PRICE_ID,
        userId,
        userEmail,
      }),
    })

    const session = await response.json()

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    })

    if (result.error) {
      throw new Error(result.error.message)
    }
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}