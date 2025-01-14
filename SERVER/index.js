import express, { json, urlencoded } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/userRoutes.js";

// Create the Express app
const app = express();

// Initialize middleware
app.use(cors());
app.use(json({ limit: "10mb" }));
app.use(urlencoded({ limit: "10mb", extended: true }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Connect to the database
connectDB();

// Use routes
app.use("/api", router); // Prefix routes for API endpoints

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
