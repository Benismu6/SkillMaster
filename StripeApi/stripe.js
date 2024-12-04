import { Popup } from "../popup/popup.js";

export async function renderStripePaymentBox(containerId, amount, currency = "usd", onSuccess) {
    const popup = new Popup(); // Initialize Popup

    const stripe = Stripe("your-publishable-key"); // Replace with your Stripe Publishable Key
    const elements = stripe.elements();
    const cardElement = elements.create("card");
    cardElement.mount(`#${containerId} #card-element`);

    document.querySelector(`#${containerId} #submit`).addEventListener("click", async () => {
        try {
            // Check if user inputs "2" for testing success
            const cardInputs = document.querySelectorAll(`#${containerId} iframe`);
            const isTestSuccess = [...cardInputs].every(input => input.value === "2");

            if (isTestSuccess) {
                alert("Test mode: Payment successful! Redirecting...");
                if (typeof onSuccess === "function") {
                    onSuccess(); // Trigger the redirection or success callback
                }
                return;
            }

            // Call backend to create a payment intent
            const response = await fetch("http://localhost:3000/api/stripe/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount, currency }),
            });

            if (!response.ok) {
                throw new Error("Failed to create payment intent. Please try again.");
            }

            const { clientSecret } = await response.json();

            // Confirm the payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement },
            });

            if (error) {
                popup.showPopup(`Payment failed: ${error.message}`); // Use popup for Stripe errors
            } else {
                alert("Payment successful! Redirecting...");
                if (typeof onSuccess === "function") {
                    onSuccess(); // Trigger the redirection or success callback
                }
            }
        } catch (err) {
            popup.showPopup(`An unexpected error occurred: ${err.message}`); // Use popup for unexpected errors
        }
    });
}
