import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe("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"); // Ensure this line uses the environment variable

router.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
