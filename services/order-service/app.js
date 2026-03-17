const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3003;

// Call payment service
app.get("/order", async (req, res) => {
    try {
        const response = await axios.get("http://payment-service:3002/pay");

        res.json({
            order: "Order placed successfully",
            payment: response.data
        });

    } catch (error) {
        res.status(500).json({
            order: "Order failed",
            payment_error: error.message
        });
    }
});

app.get("/health", (req, res) => {
    res.json({ status: "Order service OK" });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Order Service running on ${PORT}`);
});