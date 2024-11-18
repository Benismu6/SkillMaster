import mongoose from "mongoose";

// Define the schema for payments
const PaymentSchema = new mongoose.Schema(
    {
        // Unique identifier for the payment
        paymentId: {
            type: String,
            required: true,
            unique: true,
        },
        // Reference to the associated booking
        bookingId: {
            type: String,
            required: true,
            ref: "Booking",
        },
        // Reference to the seeker making the payment
        seekerId: {
            type: String,
            required: true,
            ref: "User",
        },
        // Reference to the provider receiving the payment
        providerId: {
            type: String,
            required: true,
            ref: "User",
        },
        // Payment amount
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        // Payment status
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Completed", "Failed"],
            default: "Pending",
        },
        // Transaction ID from the payment gateway
        transactionId: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Export the Payment model
const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;