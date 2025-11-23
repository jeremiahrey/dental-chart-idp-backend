import express from "express";
import { extractPage4, updatePage4 } from "../controllers/page4.controller";
import { uploadSingle } from "../middleware/upload.middleware";

const router = express.Router();

/**
 * POST /api/extract/page4
 * Extract data from Page 4 image (Treatment Record)
 * Requires existing chartId from Page 1
 * Sets isComplete = true when extraction succeeds
 *
 * Request:
 * - multipart/form-data
 * - image: file (JPEG/PNG/PDF)
 * - chartId: string (from Page 1 response)
 *
 * Response:
 * - chartId: string
 * - data: Page4Data object (treatment entries, amounts)
 * - isComplete: true (chart is now fully extracted)
 */
router.post("/", uploadSingle, extractPage4);

/**
 * PUT /api/extract/page4/:chartId
 * Update Page 4 data after user verification (final step)
 *
 * Request:
 * - JSON body
 * - data: Page4Data object (corrected by user)
 *
 * Response:
 * - Updated page4Data
 * - page4Verified: true
 * - allPagesVerified: boolean (true if all 4 pages verified)
 */
router.put("/:chartId", updatePage4);

export default router;
