import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("audio/") ||
    file.mimetype.startsWith("video/") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Only images, audio, video, and PDF files are allowed"),
      false,
    );
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter,
});
