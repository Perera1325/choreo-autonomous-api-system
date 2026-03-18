const express = require("express");
const axios = require("axios");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 3003;

// Logger
function log(service, message) {
    console.log(JSON.stringify({
        service,
        message,
        timestamp: new Date().toISOString()
    }));
}

// Metrics
const orderCounter = new client.Counter({
    name: "order_requests_total",
    help: "Total order requests"
});

// Routes
app.get("/order", async (req, res) => {
    log("order-service", "Order request started");
    orderCounter.inc();

    try {
        const response = await axios.get("http://payment-service:3002/pay");

        log("order-service", "Payment SUCCESS");

        res.json({
            order: "Order placed successfully",
            payment: response.data
        });

    } catch (error) {
        log("order-service", "Payment FAILED");

        res.status(500).json({
            order: "Order failed",
            error: error.message
        });
    }
});

app.get("/health", (req, res) => {
    log("order-service", "Health check");
    res.json({ status: "OK" });
});

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    log("order-service", `Running on port ${PORT}`);
});