import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  status?: number;
  code?: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  // Validation Error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      error: "Validation Failed",
      details: err.message,
    });
  }

  // Prisma not found error
  if (err.code === "P2025") {
    return res.status(404).json({
      success: false,
      error: "Resource not found",
    });
  }

  // Prisma unqiue constraint error
  if (err.code === "P2002") {
    return res.status(409).json({
      success: false,
      error: "Resource already exists",
      details: "A record with this alredy exists.",
    });
  }

  // Prisma foreign key constraint error
  if (err.code === "P2003") {
    return res.status(400).json({
      success: false,
      error: "Invalid reference",
      details: "Referenced record does not exist.",
    });
  }

  //Default error response
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
