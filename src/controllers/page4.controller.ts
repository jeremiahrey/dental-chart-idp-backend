import { Request, Response } from "express";
import { extractPageData, loadPrompt } from "../services/gemini.service";
import prisma from "../config/database";
import path from "path";
import { MulterRequest } from "../types/express.types";
import { Page4Data } from "../types/dentalChart.types";

/**
 * Extract data from Page 4 (Treatment Record)
 * Extracts treatment entries, amounts, and sets chart as complete
 */
export async function extractPage4(req: MulterRequest, res: Response) {
  try {
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    // Get chartId from request body
    const { chartId } = req.body;

    if (!chartId) {
      return res.status(400).json({
        success: false,
        error: "chartId is required",
        message: "Please complete Page 1 first to get a chartId",
      });
    }

    // Verify chart exists
    const existingChart = await prisma.dentalChart.findUnique({
      where: { id: chartId },
    });

    if (!existingChart) {
      return res.status(404).json({
        success: false,
        error: "Chart not found",
        message: "No dental chart found with the provided chartId",
      });
    }

    // Load Page 4 prompt
    const promptPath = path.join(
      __dirname,
      "../../docs/prompts/page4-prompt.md"
    );
    const prompt = await loadPrompt(promptPath);

    // Extract data using Gemini
    const imagePath = req.file.path;
    const mimeType = req.file.mimetype;

    const result = await extractPageData(imagePath, prompt, mimeType);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: "Extraction failed",
        details: result.error,
      });
    }

    const page4Data = result.data as Page4Data;

    // Update existing chart with Page 4 data
    // Also set isComplete = true since this is the final page
    const updatedChart = await prisma.dentalChart.update({
      where: { id: chartId },
      data: {
        page4Data: result.data,
        page4ImageUrl: req.file.path,
        page4Completed: true,
        isCompleted: true, // Mark chart as complete!
        updatedAt: new Date(),
      },
    });

    // Return success responseS
    return res.json({
      success: true,
      chartId: updatedChart.id,
      data: page4Data,
      isComplete: true,
      message: "Page 4 extracted successfully. Dental chart is now complete!",
    });
  } catch (error) {
    console.error("Page 4 extraction error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/**
 * Update Page 4 data after user verification
 * Final verification step for the dental chart
 */
export async function updatePage4(req: Request, res: Response) {
  try {
    const { chartId } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        success: false,
        error: "No data provided",
      });
    }

    // Update chart with verified data
    const updatedChart = await prisma.dentalChart.update({
      where: { id: chartId },
      data: {
        page4Data: data,
        page4Verified: true,
        updatedAt: new Date(),
      },
    });

    // Check if all pages are now verified
    const allVerified =
      updatedChart.page1Verified &&
      updatedChart.page2Verified &&
      updatedChart.page3Verified &&
      updatedChart.page4Verified;

    return res.json({
      success: true,
      message: "Page 4 updated successfully",
      data: updatedChart.page4Data,
      allPagesVerified: allVerified,
    });
  } catch (error) {
    console.error("Page 4 update error:", error);

    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return res.status(404).json({
        success: false,
        error: "Chart not found",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Update failed",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
