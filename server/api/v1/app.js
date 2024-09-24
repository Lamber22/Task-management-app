import express from 'express';
import morgan from "morgan";
import cors from "cors";
import dbClient from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

app.get("/api/v1/", (req, res) => {
    res.status(200).json({ message: "Hello from Task Management API" });
});
app.use(morgan("dev"));
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);

export default app;
