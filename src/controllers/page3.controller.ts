import { Request, Response } from "express";
import { extractPageData, loadPrompt } from "../services/gemini.service";
import prisma from "../config/database";
import path from "path";
import { MulterRequest } from "../types/express.types";
import { Page3Data } from "../types/dentalChart.types";

//Extract data from Page 3 (Informed Consent)
export async function extractPage3(req: MulterRequest, res: Response) {
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
      });
    }

    // Load Page 3 prompt
    const promptPath = path.join(
      __dirname,
      "../../docs/prompts/page3-prompt.md"
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

    const page3Data = result.data as Page3Data;

    // Update existing chart with Page 3 data
    const updatedChart = await prisma.dentalChart.update({
      where: { id: chartId },
      data: {
        page3Data: result.data,
        page3ImageUrl: req.file.path,
        page3Completed: true,
        updatedAt: new Date(),
      },
    });

    // Return success response
    return res.json({
      success: true,
      chartId: updatedChart.id,
      data: page3Data,
      message: "Page 3 extracted successfully",
    });
  } catch (error) {
    console.error("Page 3 extraction error:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

//Update Page 3 data after user verification
export async function updatePage3(req: Request, res: Response) {
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
        page3Data: data,
        page3Verified: true,
        updatedAt: new Date(),
      },
    });

    return res.json({
      success: true,
      message: "Page 3 updated successfully",
      data: updatedChart.page3Data,
    });
  } catch (error) {
    console.error("Page 3 update error:", error);

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
