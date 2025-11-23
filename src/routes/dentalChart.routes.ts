import express from "express";
import {
  getAllCharts,
  getChartById,
  getPatientCharts,
  deleteChart,
  getChartStats,
} from "../controllers/dentalChart.controller";

const router = express.Router();

/**
 * GET /api/charts
 * Get all dental charts with pagination
 *
 * Query Parameters:
 * - page: number (default: 1)
 * - limit: number (default: 10)
 * - isComplete: boolean (filter by completion status)
 *
 * Response:
 * - data: Array of charts with patient info
 * - pagination: { currentPage, totalPages, totalCount, hasNextPage, hasPrevPage }
 */
router.get("/", getAllCharts);

/**
 * GET /api/charts/stats
 * Get dashboard statistics
 * Must be defined BEFORE /:id to avoid route conflict
 *
 * Response:
 * - totalCharts: number
 * - completeCharts: number
 * - incompleteCharts: number
 * - completionRate: number (percentage)
 * - totalPatients: number
 * - recentCharts: Array of 5 most recent charts
 */
router.get("/stats", getChartStats);

/**
 * GET /api/charts/patient/:patientId
 * Get all charts for a specific patient
 *
 * Response:
 * - patient: { id, firstName, lastName, email }
 * - chartCount: number
 * - data: Array of charts for this patient
 */
router.get("/patient/:patientId", getPatientCharts);

/**
 * GET /api/charts/:id
 * Get single dental chart by ID with all data
 *
 * Response:
 * - Complete chart data including all 4 pages
 * - completionStatus: object with flags for each page
 */
router.get("/:id", getChartById);

/**
 * DELETE /api/charts/:id
 * Delete a dental chart and associated uploaded images
 *
 * Response:
 * - deletedId: string
 * - deletedImages: number (count of deleted image files)
 */
router.delete("/:id", deleteChart);

export default router;
