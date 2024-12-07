import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/users.route.js"; // Import the user routes
import serviceRoute from "./routes/services.route.js"; // Import the service routes
import tutorialRoute from "./routes/tutorials.route.js"; // Import the tutorial routes
import bookingsRoute from "./routes/bookings.route.js"; // Import the booking routes
import reviewsRoute from "./routes/reviews.route.js"; // Import the Reviews routes
import messagesRoute from "./routes/messages.route.js"; // Import the Message routes
import paymentsRoute from "./routes/payments.route.js"; // Import the Payments route
import notificationRoute from "./routes/notification.route.js"; // Import the Notification route

dotenv.config(); // Load environment variables
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
};

// Use the routes
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoute);
app.use("/api/tutorials", tutorialRoute);
app.use("/api/bookings", bookingsRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/payments", paymentsRoute);
app.use("/api/notifications", notificationRoute);


const startServer = async () => {
    try {
        await connect(); // Wait for the database connection to be established
        console.log("Database connected successfully!");

        app.listen(5000, () => {
            console.log("Backend server is running on http://localhost:5000!");
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1); // Exit the process if the connection fails
    }
};

startServer();