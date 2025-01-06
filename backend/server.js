const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authorRoutes = require("./routes/authorRoutes");

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// ROUTES
app.use("/api/v1/authors", authorRoutes);

const chartsData = [
  { name: "Apple", uv: 14000, pv: 32000, amt: 21000 },
  { name: "Samsung", uv: 76000, pv: 54000, amt: 16000 },
  { name: "Sony", uv: 34000, pv: 26000, amt: 9800 },
  { name: "LG", uv: 128000, pv: 18000, amt: 23000 },
  { name: "Nokia", uv: 42000, pv: 73000, amt: 1500 },
  { name: "Xiaomi", uv: 94000, pv: 35000, amt: 11200 },
];

// Fetch chart endpoint
app.get("/api/v1/charts", (req, res) => {
  res.send(chartsData);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error in MongoDB connection", err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
