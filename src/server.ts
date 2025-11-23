import app from "./app";
import { validateApiKey } from "./services/gemini.service";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// ==================== STARTUP VALIDATION ====================

/**
 * Validate required environment variables before starting server
 */
function validateEnvironment() {
  const requiredVars = ["DATABASE_URL", "GEMINI_API_KEY", "FRONTEND_URL"];

  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:");
    missing.forEach((varName) => console.error(`   - ${varName}`));
    process.exit(1);
  }

  // Validate Gemini API key
  try {
    validateApiKey();
    console.log("✅ Gemini API key validated");
  } catch (error) {
    console.error("❌ Gemini API key validation failed:", error);
    process.exit(1);
  }
}

// ==================== START SERVER ====================

/**
 * Start the Express server
 */
function startServer() {
  try {
    // Validate environment before starting
    validateEnvironment();

    // Start listening
    app.listen(PORT, () => {
      console.log("\n🚀 ================================");
      console.log("🚀 Dental Chart IDP API Started");
      console.log("🚀 ================================");
      console.log(`📍 Port: ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
      console.log(`📁 Uploads: http://localhost:${PORT}/uploads`);
      console.log(`🔗 Frontend: ${process.env.FRONTEND_URL}`);
      console.log("🚀 ================================\n");
      console.log("📝 Available endpoints:");
      console.log(`   POST   /api/extract/page1`);
      console.log(`   POST   /api/extract/page2`);
      console.log(`   POST   /api/extract/page3`);
      console.log(`   POST   /api/extract/page4`);
      console.log(`   GET    /api/charts`);
      console.log(`   GET    /api/charts/stats`);
      console.log(`   GET    /api/charts/:id`);
      console.log(`   DELETE /api/charts/:id\n`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Start the server
startServer();
