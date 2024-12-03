// Initialize Stripe
export function createStripePaymentBox(publishableKey, amount, currency, containerId) {
    const stripe = Stripe(publishableKey);
    const elements = stripe.elements();

    // Create a card element
    const cardElement = elements.create("card");
    cardElement.mount(`#${containerId}`);

    // Add event listener for the payment button
    document.getElementById("submit-payment").addEventListener("click", async () => {
        const response = await fetch("/api/stripe/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, currency }),
        });

        const { clientSecret } = await response.json();

        const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: cardElement },
        });

        if (error) {
            document.getElementById("payment-message").textContent = error.message;
        } else {
            document.getElementById("payment-message").textContent = "Payment successful!";
        }
    });
}
