import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Notification from "../models/notification.model.js";

const router = express.Router();

/**
 * Route: Create a notification
 * Method: POST
 * Endpoint: /api/notifications
 * Description: Creates a new notification for a user.
 */
router.post("/", async (req, res) => {
    try {
        const { userId, type, content } = req.body;

        // Generate a unique notificationId
        const notificationId = `notification_${Date.now()}`;

        // Create a new notification
        const newNotification = new Notification({
            notificationId,
            userId,
            type,
            content,
        });

        await newNotification.save();

        res.status(201).json({ message: "Notification created successfully!", notification: newNotification });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Fetch all notifications for the logged-in user
 * Method: GET
 * Endpoint: /api/notifications
 * Description: Retrieves all notifications for the logged-in user.
 */
router.get("/", async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.userId });
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Fetch unread notifications
 * Method: GET
 * Endpoint: /api/notifications/unread
 * Description: Retrieves unread notifications for the logged-in user.
 */
router.get("/unread", async (req, res) => {
    try {
        const notifications = await Notification.find({
            userId: req.user.userId,
            isRead: false,
        });
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Mark a notification as read
 * Method: PUT
 * Endpoint: /api/notifications/:id
 * Description: Marks a notification as read.
 */
router.put("/:id", async (req, res) => {
    try {
        const notification = await Notification.findOne({ notificationId: req.params.id });
        if (!notification) {
            return res.status(404).json({ message: "Notification not found." });
        }

        if (notification.userId !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to update this notification." });
        }

        notification.isRead = true;
        await notification.save();

        res.status(200).json({ message: "Notification marked as read.", notification });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Delete a notification
 * Method: DELETE
 * Endpoint: /api/notifications/:id
 * Description: Deletes a notification.
 */
router.delete("/:id", async (req, res) => {
    try {
        const notification = await Notification.findOne({ notificationId: req.params.id });
        if (!notification) {
            return res.status(404).json({ message: "Notification not found." });
        }

        if (notification.userId !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to delete this notification." });
        }

        await notification.deleteOne();

        res.status(200).json({ message: "Notification deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

export default router;