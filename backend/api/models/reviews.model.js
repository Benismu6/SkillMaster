import mongoose from "mongoose";

// Define the schema for reviews
const ReviewSchema = new mongoose.Schema(
    {
        // Unique identifier for the review
        reviewId: {
            type: String,
            required: true,
            unique: true,
        },
        // Reference to the service being reviewed
        serviceId: {
            type: String,
            required: true,
            ref: "Service",
        },
        // Reference to the seeker leaving the review
        seekerId: {
            type: String,
            required: true,
            ref: "User",
        },
        // Numeric rating (1-5)
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        // Textual feedback
        comment: {
            type: String,
            maxlength: 1000, // Optional with a limit on length
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Export the Review model
const Review = mongoose.model("Review", ReviewSchema);
export default Review;