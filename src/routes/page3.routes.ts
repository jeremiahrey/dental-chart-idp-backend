import express from "express";
import { extractPage3, updatePage3 } from "../controllers/page3.controller";
import { uploadSingle } from "../middleware/upload.middleware";

const router = express.Router();

/**
 * POST /api/extract/page3
 * Extract data from Page 3 image (Informed Consent)
 * Requires existing chartId from Page 1
 *
 * Request:
 * - multipart/form-data
 * - image: file (JPEG/PNG/PDF)
 * - chartId: string (from Page 1 response)
 *
 * Response:
 * - chartId: string
 * - data: Page3Data object
 */
router.post("/", uploadSingle, extractPage3);

/**
 * PUT /api/extract/page3/:chartId
 * Update Page 3 data after user verification
 *
 * Request:
 * - JSON body
 * - data: Page3Data object (corrected by user)
 *
 * Response:
 * - Updated page3Data
 * - page3Verified: true
 */
router.put("/:chartId", updatePage3);

export default router;
