const express = require("express");
const client = require("prom-client");

const app = express();
const PORT = process.env.PORT || 3002;

// Logger
function log(service, message) {
    console.log(JSON.stringify({
        service,
        message,
        timestamp: new Date().toISOString()
    }));
}

// Metrics
const paymentCounter = new client.Counter({
    name: "payment_requests_total",
    help: "Total payment requests"
});

// Routes
app.get("/pay", (req, res) => {
    log("payment-service", "Payment request received");
    paymentCounter.inc();

    const random = Math.random();

    if (random < 0.4) {
        log("payment-service", "Payment FAILED");

        return res.status(500).json({
            status: "Payment Failed",
            reason: "Simulated failure"
        });
    }

    log("payment-service", "Payment SUCCESS");

    res.json({
        status: "Payment Successful"
    });
});

app.get("/health", (req, res) => {
    log("payment-service", "Health check");
    res.json({ status: "OK" });
});

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    log("payment-service", `Running on port ${PORT}`);
});