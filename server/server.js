import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hello from Task Management Server!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});