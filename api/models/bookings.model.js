import mongoose from "mongoose";

// Define the schema for bookings
const BookingSchema = new mongoose.Schema(
    {
        // Unique identifier for the booking
        bookingId: {
            type: String,
            required: true,
            unique: true,
        },
        // Reference to the service being booked
        serviceId: {
            type: String,
            required: true,
            ref: "Service",
        },
        // Reference to the seeker booking the service
        seekerId: {
            type: String,
            required: true,
            ref: "User",
        },
        // Reference to the provider offering the service
        providerId: {
            type: String,
            required: true,
            ref: "User",
        },
        // Schedule for the booking
        schedule: {
            day: { type: String, required: true }, // E.g., "Monday"
            timeOfDay: {
                type: String,
                required: true,
                enum: ["Morning", "Afternoon", "Evening"], // Booking times
            },
        },
        // Status of the booking
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Confirmed", "Cancelled"], // Booking statuses
            default: "Pending",
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Export the Booking model
const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;