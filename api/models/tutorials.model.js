import mongoose from "mongoose";

// Schema for tutorials
const TutorialSchema = new mongoose.Schema(
    {
        // Unique identifier for the tutorial
        tutorialId: {
            type: String,
            required: true,
            unique: true,
        },
        // Reference to the service this tutorial belongs to
        serviceId: {
            type: String,
            required: true,
            ref: "Service", // Refers to the Services collection
        },
        // Reference to the provider creating the tutorial
        providerId: {
            type: String,
            required: true,
            ref: "User", // Refers to the Users collection
        },
        // Title of the tutorial
        title: {
            type: String,
            required: true,
            maxlength: 200, // Limit the length of the title
        },
        // Description of the tutorial
        description: {
            type: String,
            maxlength: 1000, // Optional field with a limit on description length
        },
        // Steps in the tutorial
        steps: {
            type: [
                {
                    stepNumber: { type: Number, required: true }, // Step order
                    content: { type: String, required: true }, // Textual content of the step
                    media: { type: [String], default: [] }, // Array of URLs for media files
                },
            ],
            default: [], // Tutorials can start without steps
        },
        // Timestamps for tutorial creation and updates
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Export the Tutorial model
const Tutorial = mongoose.model("Tutorial", TutorialSchema);
export default Tutorial;