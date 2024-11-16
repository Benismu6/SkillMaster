import mongoose from "mongoose";

// Define the schema for messages
const MessageSchema = new mongoose.Schema(
    {
        // Unique identifier for the conversation
        conversationId: {
            type: String,
            required: true,
            unique: true,
        },
        // Array of user IDs participating in the conversation
        participants: {
            type: [String], // List of user IDs
            required: true,
            validate: [arrayLimit, "Participants array should have exactly two users."],
        },
        // Array of messages within the conversation
        messages: {
            type: [
                {
                    senderId: { type: String, required: true }, // Sender's user ID
                    text: { type: String, required: true }, // Message content
                    timestamp: { type: Date, default: Date.now }, // Time of message
                },
            ],
            default: [], // Messages array starts empty
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Validate that the participants array contains exactly two users
function arrayLimit(val) {
    return val.length === 2;
}

// Export the Message model
const Message = mongoose.model("Message", MessageSchema);
export default Message;