import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Schema for the Users Collection
const UserSchema = new mongoose.Schema(
    {
        // Unique identifier for each user
        userId: {
            type: String,
            required: true,
            unique: true, // Ensures no two users have the same userId
        },
        // Full name of the user
        name: {
            type: String,
            required: true, // This field is mandatory
        },
        // Email address of the user
        email: {
            type: String,
            required: true,
            unique: true, // Ensures no duplicate emails
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email address",
            ],
        },
        // Encrypted password
        password: {
            type: String,
            required: true,
            minlength: 6, // Password must be at least 6 characters long
        },
        // Role of the user: 'provider', 'seeker', or both
        role: {
            type: [String], // Can have multiple roles (e.g., ['provider', 'seeker'])
            required: true,
            enum: ["provider", "seeker"], // Restricts values to these options
        },
        // Profile picture URL or binary data
        profilePicture: {
            type: String,
            default: "", // Optional field; empty by default
        },
        // Contact details such as phone number or address
        contactDetails: {
            type: {
                phone: { type: String, default: "" },
                address: { type: String, default: "" },
            },
        },
        // Short biography or description
        bio: {
            type: String,
            maxlength: 500, // Optional field; max 500 characters
        },
        // Average rating for providers (optional)
        rating: {
            type: Number,
            min: 0,
            max: 5, // Ratings between 0 and 5
            default: null,
        },
        // Provider-specific fields
        credentials: {
            type: [String], // Array of uploaded certificates
            default: [], // Optional field; empty array by default
        },
        specialties: {
            type: [String], // Array of skills/services offered
            default: [], // Optional field; empty array by default
        },
        classesTaught: {
            type: Number, // Number of classes taught by the provider
            default: 0,
        },
        totalStudents: {
            type: Number, // Total number of students taught
            default: 0,
        },
        earnings: {
            type: Number, // Total earnings from the platform
            default: 0,
        },
        // Seeker-specific fields
        skillsMastered: {
            type: Number, // Number of skills mastered
            default: 0,
        },
        coursesCompleted: {
            type: Number, // Number of courses completed
            default: 0,
        },
        badges: {
            type: [String], // Array of earned badges
            default: [], // Optional field; empty array by default
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

// Pre-save middleware to hash the password before saving it to the database
UserSchema.pre("save", async function (next) {
    // Only hash the password if it has been modified or is new
    if (!this.isModified("password")) return next();

    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error); // Pass any errors to the next middleware
    }
});

// Export the User model
const User = mongoose.model("User", UserSchema);
export default User;