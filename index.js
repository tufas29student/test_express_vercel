require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const getData = require("./getData");

app.use(
  cors({
    origin:
      process.env.DEV === "true"
        ? process.env.CLIENT_URL_DEVELOPMENT
        : process.env.CLIENT_URL_PRODUCTION,
    credentials: true,
  })
);

app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

const calculateTotalProfit = (stocks) => {
  const profit = stocks.reduce((total, stock) => {
    return total + parseFloat(stock.profit);
  }, 0);

  return profit;
};

const calculateTotalValue = (stocks) => {
  const value = stocks.reduce((total, stock) => {
    return total + parseFloat(stock.value);
  }, 0);
  return value;
};

app.get("/api/stocks", async (req, res) => {
  try {
    const { portfolio } = req.query;

    const { stocks, totalProfit, precentChange } = await getData(portfolio);

    const totalValue = calculateTotalValue(stocks);

    res.json({
      data: stocks,
      totalProfit,
      totalValue,
      precentChange,
    });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({
      error: "Failed to fetch stock data",
      message: error.message,
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use(/.*/, (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    error: "Internal server error",
    message: error.message,
  });
});

if (process.env.DEV === "true") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
module.exports = app;
