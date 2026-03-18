const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

function log(service, message) {
    console.log(JSON.stringify({
        service,
        message,
        timestamp: new Date().toISOString()
    }));
}

app.get("/users", (req, res) => {
    log("user-service", "Fetching users");
    res.json({
        users: ["Vinod", "Alex", "John"]
    });
});

app.get("/health", (req, res) => {
    log("user-service", "Health check");
    res.json({ status: "OK" });
});

app.listen(PORT, "0.0.0.0", () => {
    log("user-service", `Running on ${PORT}`);
});