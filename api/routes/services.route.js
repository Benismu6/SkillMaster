// Import necessary libraries
import express from "express";  // For creating routes
import { verifyToken } from "../middleware/auth.js"; // Import the middleware
import Service from "../models/services.model.js";

const router = express.Router(); // Create a router instance

/**
 * Route: Add a new service
 * Method: POST
 * Endpoint: /api/services
 * Description: Allows providers to add a new service.
 */
router.post("/", verifyToken, async (req, res) => {
    try {
        // Ensure the logged-in user is a provider
        if (!req.user.role.includes("provider")) {
            return res.status(403).json({ message: "Only providers can add services." });
        }

        // Extract service details from the request body
        const { title, description, category, price, deliveryMethod, tags, availability } = req.body;

        // Create a unique serviceId
        const serviceId = `service_${Date.now()}`;

        // Create a new service document
        const newService = new Service({
            serviceId,
            providerId: req.user.userId, // Set the logged-in user as the provider
            title,
            description,
            category,
            price,
            deliveryMethod,
            tags,
            availability,
        });

        // Save the service to the database
        await newService.save();

        res.status(201).json({ message: "Service created successfully!", service: newService });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Fetch all services with search and filters
 * Method: GET
 * Endpoint: /api/services
 * Description: Allows seekers to browse all services OR with optional filters for category, tags, and price range.
 */
router.get("/", async (req, res) => {
    try {
        // Step 1: Extract filters from query parameters
        const { category, tags, minPrice, maxPrice, search } = req.query;

        // Initialize an empty query object
        const query = {};

        // Step 2: Add category filter if provided
        if (category) {
            query.category = category; // Matches services in the specified category
        }

        // Step 3: Add tags filter if provided
        if (tags) {
            const tagsArray = tags.split(","); // Convert tags string to an array
            query.tags = { $in: tagsArray }; // Matches any of the tags provided
        }

        // Step 4: Add price range filter if provided
        if (minPrice || maxPrice) {
            query.price = {}; // Initialize price filter
            if (minPrice) query.price.$gte = Number(minPrice); // Greater than or equal to minPrice
            if (maxPrice) query.price.$lte = Number(maxPrice); // Less than or equal to maxPrice
        }

        // Step 5: Add search filter if provided
        if (search) {
            const searchRegex = new RegExp(search, "i"); // Case-insensitive regex for search
            query.$or = [
                { title: searchRegex },       // Match the search term in the title
                { description: searchRegex }, // Match the search term in the description
                { tags: searchRegex },        // Match the search term in the tags
            ];
        }

        // Step 6: Fetch services based on the constructed query
        const services = await Service.find(query);

        // If no services are found, return a message
        if (services.length === 0) {
            return res.status(200).json({
                message: "No services found. Please try again later or adjust your filters.",
                services: [],
            });
        }

        // Step 7: Respond with the filtered services
        res.status(200).json({ services });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Fetch a single service
 * Method: GET
 * Endpoint: /api/services/:id
 * Replace :id with serviceId
 * Description: Fetches details of a specific service by serviceId.
 */
router.get("/:id", async (req, res) => {
    try {
        // Find the service by serviceId
        const service = await Service.findOne({ serviceId: req.params.id });

        if (!service) {
            return res.status(404).json({ message: "Service not found." });
        }

        res.status(200).json({ service });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Update a service
 * Method: PUT
 * Endpoint: /api/services/:id
 * Replace :id with serviceId
 * Description: Allows providers to update their own services.
 */
router.put("/:id", verifyToken, async (req, res) => {
    try {
        // Find the service by serviceId
        const service = await Service.findOne({ serviceId: req.params.id });

        if (!service) {
            return res.status(404).json({ message: "Service not found." });
        }

        // Ensure the logged-in user is the provider of this service
        if (service.providerId !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to update this service." });
        }

        // Update the service with fields provided in the request body
        const updates = req.body;
        for (const key in updates) {
            if (updates[key] !== undefined) {
                service[key] = updates[key];
            }
        }

        await service.save();

        res.status(200).json({ message: "Service updated successfully!", service });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Delete a service
 * Method: DELETE
 * Endpoint: /api/services/:id
 * Description: Allows providers to delete their own services.
 */
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        // Find the service by serviceId
        const service = await Service.findOne({ serviceId: req.params.id });

        if (!service) {
            return res.status(404).json({ message: "Service not found." });
        }

        // Ensure the logged-in user is the provider of this service
        if (service.providerId !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to delete this service." });
        }

        // Delete the service
        await service.deleteOne();

        res.status(200).json({ message: "Service deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

export default router;