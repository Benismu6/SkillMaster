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
        // Keywords for easier searching
        tags: {
            type: [String], // Array of strings
            default: [], // Optional field
        },
        // Experience Level needed for the Service
        experience: {
            type: String,
            enum: ["Beginner", "Intermediate", "Expert"],
            default: "Beginner",
        },
        // Contact Information of the Service Provider
        contact: {
            type: String,
            required: true,
        },
        // Additional Details of the Service
        additionalDetails: {
            type: String,
            maxlength: 500,
            default: null,
        },
        // Optional image for the service provided
        imageUrl: {
            type: String,
            default: null,
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