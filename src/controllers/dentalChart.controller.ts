import { Request, Response } from "express";
import prisma from "../config/database";
import fs from "fs/promises";
import path from "path";

/**
 * Get all dental charts with patient info
 * Supports pagination and filtering
 */
export async function getAllCharts(req: Request, res: Response) {
  try {
    // Parse query parameters for pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Optional filters
    const isComplete =
      req.query.isComplete === "true"
        ? true
        : req.query.isComplete === "false"
        ? false
        : undefined;

    // Build where clause
    const where: any = {};
    if (isComplete !== undefined) {
      where.isComplete = isComplete;
    }

    // Get charts with patient info
    const [charts, totalCount] = await Promise.all([
      prisma.dentalChart.findMany({
        where,
        include: {
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.dentalChart.count({ where }),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);

    return res.json({
      success: true,
      data: charts,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get all charts error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve charts",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/**
 * Get single dental chart by ID with all data
 */
export async function getChartById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const chart = await prisma.dentalChart.findUnique({
      where: { id },
      include: {
        patient: true,
      },
    });

    if (!chart) {
      return res.status(404).json({
        success: false,
        error: "Chart not found",
      });
    }

    // Calculate completion status
    const completionStatus = {
      page1: { completed: chart.page1Completed, verified: chart.page1Verified },
      page2: { completed: chart.page2Completed, verified: chart.page2Verified },
      page3: { completed: chart.page3Completed, verified: chart.page3Verified },
      page4: { completed: chart.page4Completed, verified: chart.page4Verified },
      overallComplete: chart.isCompleted,
    };

    return res.json({
      success: true,
      data: {
        ...chart,
        completionStatus,
      },
    });
  } catch (error) {
    console.error("Get chart by ID error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve chart",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/**
 * Get all charts for a specific patient
 */
export async function getPatientCharts(req: Request, res: Response) {
  try {
    const { patientId } = req.params;

    // Verify patient exists
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        error: "Patient not found",
      });
    }

    // Get all charts for this patient
    const charts = await prisma.dentalChart.findMany({
      where: { patientId },
      orderBy: {
        visitDate: "desc",
      },
      select: {
        id: true,
        visitDate: true,
        visitType: true,
        isCompleted: true,
        page1Completed: true,
        page2Completed: true,
        page3Completed: true,
        page4Completed: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json({
      success: true,
      patient: {
        id: patient.id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email,
      },
      chartCount: charts.length,
      data: charts,
    });
  } catch (error) {
    console.error("Get patient charts error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve patient charts",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/**
 * Delete a dental chart
 * Also deletes associated uploaded images
 */
export async function deleteChart(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Find chart first to get image URLs
    const chart = await prisma.dentalChart.findUnique({
      where: { id },
    });

    if (!chart) {
      return res.status(404).json({
        success: false,
        error: "Chart not found",
      });
    }

    // Collect image paths to delete
    const imagePaths = [
      chart.page1ImageUrl,
      chart.page2ImageUrl,
      chart.page3ImageUrl,
      chart.page4ImageUrl,
    ].filter((url): url is string => url !== null);

    // Delete chart from database
    await prisma.dentalChart.delete({
      where: { id },
    });

    // Delete associated image files
    for (const imagePath of imagePaths) {
      try {
        await fs.unlink(imagePath);
      } catch (fileError) {
        // Log but don't fail if file doesn't exist
        console.warn(`Could not delete file ${imagePath}:`, fileError);
      }
    }

    return res.json({
      success: true,
      message: "Chart deleted successfully",
      deletedId: id,
      deletedImages: imagePaths.length,
    });
  } catch (error) {
    console.error("Delete chart error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to delete chart",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/**
 * Get chart statistics/summary
 */
export async function getChartStats(req: Request, res: Response) {
  try {
    const [
      totalCharts,
      completeCharts,
      incompleteCharts,
      totalPatients,
      recentCharts,
    ] = await Promise.all([
      prisma.dentalChart.count(),
      prisma.dentalChart.count({ where: { isCompleted: true } }),
      prisma.dentalChart.count({ where: { isCompleted: false } }),
      prisma.patient.count(),
      prisma.dentalChart.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          patient: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
    ]);

    return res.json({
      success: true,
      data: {
        totalCharts,
        completeCharts,
        incompleteCharts,
        completionRate:
          totalCharts > 0
            ? Math.round((completeCharts / totalCharts) * 100)
            : 0,
        totalPatients,
        recentCharts: recentCharts.map((chart) => ({
          id: chart.id,
          patientName: `${chart.patient.firstName} ${chart.patient.lastName}`,
          isComplete: chart.isCompleted,
          createdAt: chart.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error("Get chart stats error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve statistics",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
