import mongoose from "mongoose";

// Schema for services
const ServiceSchema = new mongoose.Schema(
    {
        // Unique identifier for the service
        serviceId: {
            type: String,
            required: true,
            unique: true,
        },
        // Reference to the provider (userId of the provider from the Users collection)
        providerId: {
            type: String,
            required: true,
            ref: "User", // Refers to the User collection
        },
        // Name of the service
        title: {
            type: String,
            required: true,
            maxlength: 100, // Limit title length
        },
        // Detailed description of the service
        description: {
            type: String,
            required: true,
            maxlength: 1000, // Limit description length
        },
        // Category to group similar services
        category: {
            type: String,
            required: true,
        },
        // Pricing details (e.g., hourly rate or fixed price)
        price: {
            type: Number,
            required: true,
            min: 0, // Ensure non-negative price
        },
        // Delivery method: Post Content Online or Live Video Streaming
        deliveryMethod: {
            type: String,
            required: true,
            enum: ["Post Content Online", "Live Video Streaming"], // Only these options allowed
        },
        // Keywords for easier searching
        tags: {
            type: [String], // Array of strings
            default: [], // Optional field
        },
        // Availability: Morning, Afternoon, or Evening
        availability: {
            type: [
                {
                    day: { type: String, required: true }, // E.g., Monday
                    timeOfDay: {
                        type: String,
                        required: true,
                        enum: ["Morning", "Afternoon", "Evening"], // Valid options
                    },
                },
            ],
            default: [], // Optional field
        },
        // Timestamps for service creation and updates
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Export the Service model
const Service = mongoose.model("Service", ServiceSchema);
export default Service;