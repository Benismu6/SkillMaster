import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Review from "../models/reviews.model.js";
import Booking from "../models/bookings.model.js";
import Service from "../models/services.model.js";

const router = express.Router();

/**
 * Route: Add a new review
 * Method: POST
 * Endpoint: /api/reviews
 * Description: Allows seekers to leave a review for a service they’ve booked.
 */
router.post("/", verifyToken, async (req, res) => {
    try {
        const { serviceId, rating, comment } = req.body;

        // Ensure the logged-in user is a seeker
        if (!req.user.role.includes("seeker")) {
            return res.status(403).json({ message: "Only seekers can leave reviews." });
        }

        // Ensure the service exists
        const service = await Service.findOne({ serviceId });
        if (!service) {
            return res.status(404).json({ message: "Service not found." });
        }

        // Ensure the seeker has a completed booking for this service
        const booking = await Booking.findOne({
            serviceId,
            seekerId: req.user.userId,
            status: "Confirmed",
        });
        if (!booking) {
            return res.status(403).json({ message: "You can only review services you have completed." });
        }

        // Generate a unique reviewId
        const reviewId = `review_${Date.now()}`;

        // Create a new review
        const newReview = new Review({
            reviewId,
            serviceId,
            seekerId: req.user.userId,
            rating,
            comment,
        });

        await newReview.save();

        // Update the average rating for the service
        const reviews = await Review.find({ serviceId });
        const averageRating =
            reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        service.rating = averageRating;
        await service.save();

        res.status(201).json({ message: "Review added successfully!", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Fetch reviews for a service
 * Method: GET
 * Endpoint: /api/reviews/:serviceId
 * Description: Fetches all reviews for a specific service.
 */
router.get("/:serviceId", async (req, res) => {
    try {
        const { serviceId } = req.params;

        // Ensure the service exists
        const service = await Service.findOne({ serviceId });
        if (!service) {
            return res.status(404).json({ message: "Service not found." });
        }

        // Fetch reviews for the service
        const reviews = await Review.find({ serviceId });

        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Update a review
 * Method: PUT
 * Endpoint: /api/reviews/:id
 * Description: Allows seekers to update their review.
 */
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const review = await Review.findOne({ reviewId: req.params.id });
        if (!review) {
            return res.status(404).json({ message: "Review not found." });
        }

        if (review.seekerId !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to update this review." });
        }

        if (rating !== undefined) review.rating = rating;
        if (comment !== undefined) review.comment = comment;

        await review.save();

        const reviews = await Review.find({ serviceId: review.serviceId });
        const averageRating =
            reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        const service = await Service.findOne({ serviceId: review.serviceId });
        service.rating = averageRating;
        await service.save();

        res.status(200).json({ message: "Review updated successfully!", review });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Delete a review
 * Method: DELETE
 * Endpoint: /api/reviews/:id
 * Description: Allows seekers to delete their review.
 */
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const review = await Review.findOne({ reviewId: req.params.id });
        if (!review) {
            return res.status(404).json({ message: "Review not found." });
        }

        if (review.seekerId !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to delete this review." });
        }

        const serviceId = review.serviceId;

        await review.deleteOne();

        const reviews = await Review.find({ serviceId });
        const averageRating =
            reviews.length > 0
                ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
                : 0;

        const service = await Service.findOne({ serviceId });
        service.rating = averageRating;
        await service.save();

        res.status(200).json({ message: "Review deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

export default router;