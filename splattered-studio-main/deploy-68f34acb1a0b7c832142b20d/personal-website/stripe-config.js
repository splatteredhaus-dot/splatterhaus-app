// Stripe Payment Configuration
// Add your Stripe keys here securely

const STRIPE_CONFIG = {
    // Get these from your Stripe Dashboard: https://dashboard.stripe.com/apikeys
    publishableKey: 'pk_test_YOUR_PUBLISHABLE_KEY_HERE', // Safe to use in frontend
    // SECRET KEY SHOULD NEVER BE IN CLIENT-SIDE CODE
    // Add to your server environment variables instead
};

class StripePaymentProcessor {
    constructor() {
        this.stripe = null;
        this.elements = null;
        this.cardElement = null;
    }

    async initialize() {
        // Initialize Stripe with your publishable key
        this.stripe = Stripe(STRIPE_CONFIG.publishableKey);
        this.elements = this.stripe.elements();

        // Create card element
        this.cardElement = this.elements.create('card');
        this.cardElement.mount('#card-element');
    }

    async processPayment(amount, currency = 'usd') {
        try {
            // Create payment intent on your server
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount * 100, // Convert to cents
                    currency: currency,
                }),
            });

            const { clientSecret } = await response.json();

            // Confirm payment
            const result = await this.stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: this.cardElement,
                }
            });

            if (result.error) {
                throw new Error(result.error.message);
            }

            return {
                success: true,
                paymentIntent: result.paymentIntent
            };

        } catch (error) {
            console.error('Payment failed:', error);
            throw error;
        }
    }
}

// Initialize payment processor
const paymentProcessor = new StripePaymentProcessor();
