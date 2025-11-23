import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { handleUploadError } from "./middleware/upload.middleware";
import { errorHandler } from "./middleware/errorHandler.middleware";

// Import routes
import page1Routes from "./routes/page1.routes";
import page2Routes from "./routes/page2.routes";
import page3Routes from "./routes/page3.routes";
import page4Routes from "./routes/page4.routes";
import dentalChartRoutes from "./routes/dentalChart.routes";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// ==================== MIDDLEWARE ====================

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically (for viewing original images)
app.use("/uploads", express.static("uploads"));

// ==================== HEALTH CHECK ====================

/**
 * GET /api/health
 * Health check endpoint to verify API is running
 */
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Dental Chart IDP API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ==================== API ROUTES ====================

/**
 * Extraction Endpoints
 * Handle image upload and AI extraction for each page
 */
app.use("/api/extract/page1", page1Routes);
app.use("/api/extract/page2", page2Routes);
app.use("/api/extract/page3", page3Routes);
app.use("/api/extract/page4", page4Routes);

/**
 * Chart Management Endpoints
 * Handle CRUD operations for dental charts
 */
app.use("/api/charts", dentalChartRoutes);

// ==================== ERROR HANDLING ====================

// Multer upload error handling
app.use(handleUploadError);

// Global error handler
app.use(errorHandler);

// 404 handler (must be last)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
    path: req.path,
    method: req.method,
  });
});

// ==================== EXPORT ====================

export default app;
