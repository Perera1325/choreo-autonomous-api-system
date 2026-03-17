const express = require("express");
const app = express();

app.get("/users", (req, res) => {
    res.json({
        users: ["Vinod", "Alex", "John"],
        status: "User service running"
    });
});

app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});