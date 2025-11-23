import express from "express";
import { extractPage1, updatePage1 } from "../controllers/page1.controller";
import { uploadSingle } from "../middleware/upload.middleware";

const router = express.Router();

/**
 * POST /api/extract/page1
 * Extract data from Page 1 image
 * Creates new Patient and DentalChart records
 *
 * Request:
 * - multipart/form-data
 * - image: file (JPEG/PNG/PDF)
 *
 * Response:
 * - chartId: string (use for subsequent pages)
 * - patientId: string
 * - data: Page1Data object
 */
router.post("/", uploadSingle, extractPage1);

/**
 * PUT /api/extract/page1/:chartId
 * Update Page 1 data after user verification
 *
 * Request:
 * - JSON body
 * - data: Page1Data object (corrected by user)
 *
 * Response:
 * - Updated page1Data
 * - page1Verified: true
 */
router.put("/:chartId", updatePage1);

export default router;
