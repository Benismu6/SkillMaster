import express from "express";
import { verifyToken } from "../middleware/auth.js"; // Middleware for authentication
import Tutorial from "../models/tutorials.model.js"; // Tutorial model

const router = express.Router();

/**
 * Route: Create a new tutorial
 * Method: POST
 * Endpoint: /api/tutorials
 * Description: Allows providers to create a new tutorial for their service.
 */
router.post("/", verifyToken, async (req, res) => {
    try {
        // Ensure the logged-in user is a provider
        if (!req.user.role.includes("provider")) {
            return res.status(403).json({ message: "Only providers can create tutorials." });
        }

        const { serviceId, title, description, steps } = req.body;

        // Generate a unique tutorialId
        const tutorialId = `tutorial_${Date.now()}`;

        // Create a new tutorial document
        const newTutorial = new Tutorial({
            tutorialId,
            serviceId,
            providerId: req.user.userId,
            title,
            description,
            steps,
        });

        // Save the tutorial to the database
        await newTutorial.save();

        res.status(201).json({ message: "Tutorial created successfully!", tutorial: newTutorial });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Fetch all tutorials
 * Method: GET
 * Endpoint: /api/tutorials
 * Description: Fetch all tutorials or filter by serviceId.
 */
router.get("/", async (req, res) => {
    try {
        const { serviceId } = req.query;

        const query = {};
        if (serviceId) query.serviceId = serviceId; // Filter by serviceId if provided

        const tutorials = await Tutorial.find(query);
        res.status(200).json({ tutorials });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Fetch a specific tutorial
 * Method: GET
 * Endpoint: /api/tutorials/:id
 * Description: Fetch a tutorial by tutorialId.
 */
router.get("/:id", async (req, res) => {
    try {
        const tutorial = await Tutorial.findOne({ tutorialId: req.params.id });

        if (!tutorial) {
            return res.status(404).json({ message: "Tutorial not found." });
        }

        res.status(200).json({ tutorial });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Update a tutorial
 * Method: PUT
 * Endpoint: /api/tutorials/:id
 * Description: Allows providers to update their tutorial.
 */
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const tutorial = await Tutorial.findOne({ tutorialId: req.params.id });

        if (!tutorial) {
            return res.status(404).json({ message: "Tutorial not found." });
        }

        if (tutorial.providerId !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to update this tutorial." });
        }

        const updates = req.body;
        for (const key in updates) {
            if (updates[key] !== undefined) {
                tutorial[key] = updates[key];
            }
        }

        await tutorial.save();

        res.status(200).json({ message: "Tutorial updated successfully!", tutorial });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Delete a tutorial
 * Method: DELETE
 * Endpoint: /api/tutorials/:id
 * Description: Allows providers to delete their tutorial.
 */
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const tutorial = await Tutorial.findOne({ tutorialId: req.params.id });

        if (!tutorial) {
            return res.status(404).json({ message: "Tutorial not found." });
        }

        if (tutorial.providerId !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to delete this tutorial." });
        }

        await tutorial.deleteOne();

        res.status(200).json({ message: "Tutorial deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

export default router;