import { Request } from "express";
import "multer";

// Extended Request with Multer file
export interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Request body for extraction endpoints
export interface ExtractRequestBody {
  chartId?: string;
  patientId?: string;
}

// Request body for update endpoints
export interface UpdateRequestBody {
  data: any;
}
