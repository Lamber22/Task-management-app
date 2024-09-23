import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Load environment variables from .env file
dotenv.config();

// Secret key for JWT (stored securely in environment variables)
const secretKey = process.env.JWT_SECRET;

// Middleware function to authenticate users by verifying their JWT
const authMiddleware = (req, res, next) => {
    // Extract the token from the "Authorization" header (Bearer token)
    const token = req.header("Authorization")?.split(" ")[1];

    // If no token is provided, deny access and return a 401 Unauthorized status
    if (!token) {
        return res
        .status(401)
        .json({
            status: "failed",
            message: "Authorization denied"
        });
    }

    try {
        // Verify the token using the secret key, and decode the payload
        const decoded = jwt.verify(token, secretKey);

        // Attach the decoded user data to the request object (req.user)
        req.user = decoded;
        // Move to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails (e.g., invalid or expired token), return a 401 Unauthorized status
        console.error("Error verifying token:", error); // Log the error for debugging
        res.status(401).json({ message: "Token is not valid" });
    }
};

export default authMiddleware;
