// Import necessary libraries
import express from "express";  // For creating routes
import bcrypt from "bcrypt";   // For password hashing and comparison
import jwt from "jsonwebtoken"; // For generating authentication tokens
import User from "../models/users.model.js";  // User model to interact with the Users collection
import { verifyToken } from "../middleware/auth.js"; // Import the middleware

const router = express.Router(); // Create an Express router instance

/**
 * Route: Create a new user (Sign-Up)
 * Method: POST
 * Endpoint: /api/users/signup
 */
router.post("/signup", async (req, res) => {
    try {
        // Extract user details from the request body
        const { userId, name, email, password, role, profilePicture, bio } = req.body;

        // Validate required fields
        if (!userId || !name || !email || !password || !role) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        // Check if a user with the same email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { userId }] });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email or username already exists." });
        }

        // Create a new user document
        const newUser = new User({
            userId,
            name,
            email,
            password, // Password will be hashed automatically by the pre-save middleware in the schema
            role,
            profilePicture: profilePicture || "", // Optional field
            bio: bio || "", // Optional field
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Log in an existing user
 * Method: POST
 * Endpoint: /api/users/login
 */
router.post("/login", async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Generate a JWT token for authentication
        const token = jwt.sign(
            { id: user._id, userId: user.userId, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Respond with user details and the token
        res.status(200).json({
            message: "Login successful!",
            user: {
                id: user._id,
                userId: user.userId,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token, // Include the token for future authenticated requests
        });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Fetch user profile by ID
 * Method: GET
 * Endpoint: /api/users/profile/:id
 */
router.get("/profile/:id", async (req, res) => {
    try {
        // Extract the user ID from the URL parameters
        const userId = req.params.id;

        // Find the user by their unique ID
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Respond with user details (excluding sensitive information)
        res.status(200).json({
            user: {
                userId: user.userId,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture,
                bio: user.bio,
                contactDetails: user.contactDetails,
                rating: user.rating,
                credentials: user.credentials,
                specialties: user.specialties,
                skillsMastered: user.skillsMastered,
                coursesCompleted: user.coursesCompleted,
                badges: user.badges,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Update user profile
 * Method: PUT
 * Endpoint: /api/users/profile/:id
 * Description: Allows a user to update their profile details.
 */
// Protect the update profile route
router.put("/profile/:id", verifyToken, async (req, res) => {
    // Ensure the logged-in user is authorized to update this profile
    if (req.user.userId !== req.params.id) {
        return res.status(403).json({ message: "You are not authorized to update this profile." });
    }

    try {
        // Extract userId from the request parameters
        const userId = req.params.id;

        // Extract updated fields from the request body
        const updates = req.body;

        // Find the user by userId
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Update only the fields provided in the request body
        for (const key in updates) {
            if (updates[key] !== undefined) {
                user[key] = updates[key];
            }
        }

        // Save the updated user document
        await user.save();

        // Respond with the updated user details
        res.status(200).json({
            message: "User profile updated successfully!",
            user: {
                userId: user.userId,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture,
                bio: user.bio,
                contactDetails: user.contactDetails,
                updatedAt: user.updatedAt,
            },
        });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Delete user account
 * Method: DELETE
 * Endpoint: /api/users/profile/:id
 * Description: Allows a user to delete their account.
 */
// Protect the delete account route
router.delete("/profile/:id", verifyToken, async (req, res) => {
    // Ensure the logged-in user is authorized to delete this account
    if (req.user.userId !== req.params.id) {
        return res.status(403).json({ message: "You are not authorized to update this profile." });
    }

    try {
        // Extract userId from the request parameters
        const userId = req.params.id;

        // Find the user by userId and delete them
        const user = await User.findOneAndDelete({ userId });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Respond with a success message
        res.status(200).json({ message: "User account deleted successfully." });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: "Internal server error", error });
    }
});

// Export the router to be used in the main server file
export default router;