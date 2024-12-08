import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Payment from "../models/payments.model.js";
import Booking from "../models/bookings.model.js";

const router = express.Router();

/**
 * Route: Initiate a payment
 * Method: POST
 * Endpoint: /api/payments
 * Description: Allows seekers to initiate a payment for a booking.
 */
router.post("/", verifyToken, async (req, res) => {
    try {
        const { bookingId, amount } = req.body;

        // Ensure the logged-in user is a seeker
        if (!req.user.role.includes("seeker")) {
            return res.status(403).json({ message: "Only seekers can initiate payments." });
        }

        // Validate the booking
        const booking = await Booking.findOne({ bookingId });
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        if (booking.seekerId !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to pay for this booking." });
        }

        // Generate a unique paymentId
        const paymentId = `payment_${Date.now()}`;

        // Create a new payment record
        const newPayment = new Payment({
            paymentId,
            bookingId,
            seekerId: req.user.userId,
            providerId: booking.providerId,
            amount,
            status: "Pending",
        });

        await newPayment.save();

        res.status(201).json({ message: "Payment initiated successfully!", payment: newPayment });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Fetch payment history for a user
 * Method: GET
 * Endpoint: /api/payments
 * Description: Retrieve payment history for the logged-in user.
 */
router.get("/", verifyToken, async (req, res) => {
    try {
        const query = req.user.role.includes("provider")
            ? { providerId: req.user.userId }
            : { seekerId: req.user.userId };

        const payments = await Payment.find(query);
        res.status(200).json({ payments });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Fetch payment details
 * Method: GET
 * Endpoint: /api/payments/:paymentId
 * Description: Retrieve details of a specific payment.
 */
router.get("/:paymentId", verifyToken, async (req, res) => {
    try {
        const payment = await Payment.findOne({ paymentId: req.params.paymentId });
        if (!payment) {
            return res.status(404).json({ message: "Payment not found." });
        }

        res.status(200).json({ payment });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Update payment status
 * Method: PUT
 * Endpoint: /api/payments/:paymentId
 * Description: Update the status of a payment.
 */
router.put("/:paymentId", verifyToken, async (req, res) => {
    try {
        const { status, transactionId } = req.body;

        const payment = await Payment.findOne({ paymentId: req.params.paymentId });
        if (!payment) {
            return res.status(404).json({ message: "Payment not found." });
        }

        if (payment.providerId !== req.user.userId && payment.seekerId !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to update this payment." });
        }

        if (status) payment.status = status;
        if (transactionId) payment.transactionId = transactionId;

        await payment.save();

        res.status(200).json({ message: "Payment status updated successfully!", payment });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

export default router;