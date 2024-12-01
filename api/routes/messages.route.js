import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Message from "../models/messages.model.js";

const router = express.Router();

/**
 * Route: Create a new conversation or add a message
 * Method: POST
 * Endpoint: /api/messages
 * Description: Starts a new conversation or adds a message to an existing one.
 */
router.post("/", async (req, res) => {
    try {
        const { participants, text } = req.body;

        // Ensure there are exactly two participants
        if (!participants || participants.length !== 2) {
            return res
                .status(400)
                .json({ message: "Conversations must have exactly two participants." });
        }

        // Check if a conversation already exists
        let conversation = await Message.findOne({ participants: { $all: participants } });

        if (!conversation) {
            // Create a new conversation if it doesn't exist
            const conversationId = `conversation_${Date.now()}`;
            conversation = new Message({
                conversationId,
                participants,
                messages: [{ senderId: req.user.userId, text }],
            });
            await conversation.save();
            return res.status(201).json({
                message: "Conversation created successfully!",
                conversation,
            });
        }

        // Add a message to the existing conversation
        conversation.messages.push({
            senderId: req.user.userId,
            text,
        });
        await conversation.save();

        res.status(200).json({
            message: "Message added successfully!",
            conversation,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Fetch all conversations for a user
 * Method: GET
 * Endpoint: /api/messages
 * Description: Retrieves all conversations for the logged-in user.
 */
router.get("/", async (req, res) => {
    try {
        const conversations = await Message.find({ participants: req.user.userId });
        res.status(200).json({ conversations });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Fetch a specific conversation
 * Method: GET
 * Endpoint: /api/messages/:conversationId
 * Description: Retrieves a specific conversation by its ID.
 */
router.get("/:conversationId", async (req, res) => {
    try {
        const conversation = await Message.findOne({ conversationId: req.params.conversationId });
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found." });
        }

        res.status(200).json({ conversation });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Delete a conversation
 * Method: DELETE
 * Endpoint: /api/messages/:conversationId
 * Description: Deletes a conversation and its messages.
 */
router.delete("/:conversationId", async (req, res) => {
    try {
        const conversation = await Message.findOne({ conversationId: req.params.conversationId });
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found." });
        }

        // Ensure only participants can delete the conversation
        if (!conversation.participants.includes(req.user.userId)) {
            return res.status(403).json({ message: "You are not authorized to delete this conversation." });
        }

        await conversation.deleteOne();
        res.status(200).json({ message: "Conversation deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

export default router;