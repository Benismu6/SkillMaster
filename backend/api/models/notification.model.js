import mongoose from "mongoose";

// Define the schema for notifications
const NotificationSchema = new mongoose.Schema(
    {
        // Unique identifier for the notification
        notificationId: {
            type: String,
            required: true,
            unique: true,
        },
        // Reference to the user receiving the notification
        userId: {
            type: String,
            required: true,
            ref: "User",
        },
        // Type of notification
        type: {
            type: String,
            required: true,
            enum: ["Booking Update", "New Message", "Payment Update", "General"],
        },
        // Content of the notification
        content: {
            type: String,
            required: true,
        },
        // Whether the notification has been read
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// Export the Notification model
const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;