import express from "express";
import { extractPage2, updatePage2 } from "../controllers/page2.controller";
import { uploadSingle } from "../middleware/upload.middleware";

const router = express.Router();

/**
 * POST /api/extract/page2
 * Extract data from Page 2 image (Dental Chart & Examination)
 * Requires existing chartId from Page 1
 *
 * Request:
 * - multipart/form-data
 * - image: file (JPEG/PNG/PDF)
 * - chartId: string (from Page 1 response)
 *
 * Response:
 * - chartId: string
 * - data: Page2Data object (tooth status, periodontal, occlusion, TMD)
 */
router.post("/", uploadSingle, extractPage2);

/**
 * PUT /api/extract/page2/:chartId
 * Update Page 2 data after user verification
 *
 * Request:
 * - JSON body
 * - data: Page2Data object (corrected by user)
 *
 * Response:
 * - Updated page2Data
 * - page2Verified: true
 */
router.put("/:chartId", updatePage2);

export default router;
