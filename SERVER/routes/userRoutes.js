import express from "express";
import upload from "../middlewares/uploadMiddleware.js"; // Ensure it has a default export
import { submitUserData } from "../controllers/userController.js"; // Named export

const router = express.Router();

// POST route to submit form data with image upload handling
router.post("/submit", upload.single("image"), submitUserData);

export default router;
