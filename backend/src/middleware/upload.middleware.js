import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB per file
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "images") {
      const allowedImages = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];

      if (allowedImages.includes(file.mimetype)) {
        return cb(null, true);
      }

      return cb(new Error("Only JPEG, PNG and WebP images are allowed."));
    }

    if (file.fieldname === "video") {
      const allowedVideos = [
        "video/mp4",
        "video/webm",
        "video/quicktime",
      ];

      if (allowedVideos.includes(file.mimetype)) {
        return cb(null, true);
      }

      return cb(new Error("Only MP4, WebM and MOV videos are allowed."));
    }

    return cb(new Error("Unexpected file field."));
  },
});
