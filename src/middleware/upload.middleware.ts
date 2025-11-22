import multer from "multer";
import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const exit = path.extname(file.originalname);
    const basename = path.basename(file.originalname, exit);
    cb(null, `${basename}-${uniqueSuffix}${exit}`);
  },
});

//File filter- only accept images and PDFs
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMime = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];

  if (allowedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, WebP, and PDF files are allowed."
      )
    );
  }
};

// Configure multer
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || "10485760"), // Default 10MB
  },
});

//Single file upload middleware
export const uploadSingle = upload.single("image");

//Error handling middleware for multer
export const handleUploadError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        error: "File too large",
        message: "Maximum file is 10MB",
      });
    }

    return res.status(400).json({
      success: false,
      error: "Upload error",
      messge: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      error: "Upload error",
      message: err.message,
    });
  }

  next();
};
