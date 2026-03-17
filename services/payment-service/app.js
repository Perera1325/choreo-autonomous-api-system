const express = require("express");
const app = express();

const PORT = process.env.PORT || 3002;

// Simulate random failure
app.get("/pay", (req, res) => {
    const random = Math.random();

    if (random < 0.4) {
        return res.status(500).json({
            status: "Payment Failed",
            reason: "Random failure simulation"
        });
    }

    res.json({
        status: "Payment Successful"
    });
});

app.get("/health", (req, res) => {
    res.json({ status: "Payment service OK" });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Payment Service running on ${PORT}`);
});