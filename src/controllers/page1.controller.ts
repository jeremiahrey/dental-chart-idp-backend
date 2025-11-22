import { Request, Response } from "express";
import { extractPageData, loadPrompt } from "../services/gemini.service";
import prisma from "../config/database";
import path from "path";
import { MulterRequest } from "../types/express.types";
import { Page1Data } from "../types/dentalChart.types";
import { ResponseSchema } from "@google/generative-ai";

//Extract data from page 1 (Patient Info and Med History)
export async function extractPage1(req: MulterRequest, res: Response) {
  try {
    //Validate file upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    // Load Page 1 prompt
    const promptPath = path.join(
      __dirname,
      "../../docs/prompts/page1-prompt.md"
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

    const page1Data = result.data as Page1Data;

    // Extract patient info from AI response
    const patientInfo = page1Data.patientInformation;

    // Create or find patient
    let patient;

    // try to find existing patient by email(if provided)
    if (patientInfo.emailAddress) {
      patient = await prisma.patient.findUnique({
        where: { email: patientInfo.emailAddress },
      });
    }

    if (!patient) {
      patient = await prisma.patient.create({
        data: {
          firstName: patientInfo.firstName || "Unknown",
          lastName: patientInfo.lastName || "Unknown",
          birthDate: patientInfo.birthdate
            ? new Date(patientInfo.birthdate)
            : null,
          email: patientInfo.emailAddress || null,
          phone: patientInfo.cellMobileNo || null,
        },
      });
    }

    // Create new dental chart linked to patient
    const dentalChart = await prisma.dentalChart.create({
      data: {
        patientId: patient.id,
        page1Data: result.data,
        page1ImageUrl: req.file.path,
        page1Completed: true,
      },
    });

    //return success response
    return res.json({
      success: true,
      chartId: dentalChart.id,
      patientId: patient.id,
      data: result.data,
      message: "Page 1 extracted successfully",
    });
  } catch (error) {
    console.error("Page 1 extraction error:", error);
    return res.json({
      success: false,
      error: "Server Error",
      message: error instanceof Error ? error.message : "Unknown Error",
    });
  }
}

// Update Page 1 data after user verufication
export async function updatePage1(req: Request, res: Response) {
  try {
    const { chartId } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        success: false,
        error: "No data provided",
      });
    }

    //Update chart with verified data
    const updatedChart = await prisma.dentalChart.update({
      where: { id: chartId },
      data: {
        page1Data: data,
        page1Verified: true,
        updatedAt: new Date(),
      },
    });

    return res.json({
      sucess: true,
      message: "Page 1 updated successfully",
      data: updatedChart.page1Data,
    });
  } catch (error) {
    console.error("Page 1 update error:", error);

    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return res.status(404).json({
        success: false,
        error: "Chart not found",
      });
    }

    return res.json({
      sucess: false,
      error: "Update failed",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
