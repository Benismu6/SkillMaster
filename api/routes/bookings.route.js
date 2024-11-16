import express from "express";
import { verifyToken } from "../middleware/auth.js";
import Booking from "../models/bookings.model.js";
import Service from "../models/services.model.js";

const router = express.Router();

/**
 * Route: Create a new booking
 * Method: POST
 * Endpoint: /api/bookings
 * Description: Allows seekers to book a service.
 */
router.post("/", verifyToken, async (req, res) => {
    try {
        const { serviceId, schedule } = req.body;

        // Ensure the logged-in user is a seeker
        if (!req.user.role.includes("seeker")) {
            return res.status(403).json({ message: "Only seekers can book services." });
        }

        // Find the service being booked
        const service = await Service.findOne({ serviceId });
        if (!service) {
            return res.status(404).json({ message: "Service not found." });
        }

        // Prevent seekers from booking their own service
        if (service.providerId === req.user.userId) {
            return res.status(403).json({ message: "You cannot book your own service." });
        }

        // Generate a unique bookingId
        const bookingId = `booking_${Date.now()}`;

        // Create a new booking document
        const newBooking = new Booking({
            bookingId,
            serviceId,
            seekerId: req.user.userId,
            providerId: service.providerId,
            schedule,
            status: "Pending",
        });

        // Save the booking to the database
        await newBooking.save();

        res.status(201).json({ message: "Booking created successfully!", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Fetch bookings for the logged-in user
 * Method: GET
 * Endpoint: /api/bookings
 * Description: Retrieve bookings for seekers or providers.
 */
router.get("/", verifyToken, async (req, res) => {
    try {
        const query = req.user.role.includes("provider")
            ? { providerId: req.user.userId }
            : { seekerId: req.user.userId };

        const bookings = await Booking.find(query);
        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Fetch a specific booking
 * Method: GET
 * Endpoint: /api/bookings/:id
 * Description: Retrieve details of a specific booking by its bookingId.
 */
router.get("/:id", verifyToken, async (req, res) => {
    try {
        // Find the booking by bookingId
        const booking = await Booking.findOne({ bookingId: req.params.id });

        // If the booking does not exist, return a 404 error
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        // Ensure the logged-in user is authorized to view this booking
        if (
            booking.seekerId !== req.user.userId &&
            booking.providerId !== req.user.userId
        ) {
            return res.status(403).json({ message: "You are not authorized to view this booking." });
        }

        // Respond with the booking details
        res.status(200).json({ booking });
    } catch (error) {
        // Handle server errors
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Update booking status
 * Method: PUT
 * Endpoint: /api/bookings/:id
 * Description: Allows providers to confirm or cancel bookings.
 */
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const { status } = req.body;

        const booking = await Booking.findOne({ bookingId: req.params.id });
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        if (booking.providerId !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to update this booking." });
        }

        booking.status = status;
        await booking.save();

        res.status(200).json({ message: "Booking status updated successfully!", booking });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

/**
 * Route: Cancel a booking
 * Method: DELETE
 * Endpoint: /api/bookings/:id
 * Description: Allows seekers or providers to cancel a booking.
 */
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const booking = await Booking.findOne({ bookingId: req.params.id });
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        if (
            booking.seekerId !== req.user.userId &&
            booking.providerId !== req.user.userId
        ) {
            return res.status(403).json({ message: "You are not authorized to cancel this booking." });
        }

        await booking.deleteOne();

        res.status(200).json({ message: "Booking cancelled successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

export default router;