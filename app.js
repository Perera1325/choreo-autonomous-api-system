const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("User Service Running");
});

app.get("/users", (req, res) => {
    res.json({
        users: ["Vinod", "Alex", "John"],
        status: "User service running"
    });
});

app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`User Service running on port ${PORT}`);
});