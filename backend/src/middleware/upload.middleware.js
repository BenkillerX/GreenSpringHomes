
import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedImages = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    const allowedVideos = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ];

    if (["image", "images"].includes(file.fieldname)) {
      if (allowedImages.includes(file.mimetype)) {
        return cb(null, true);
      }

      return cb(
        new Error("Only JPEG, PNG and WebP images are allowed.")
      );
    }

    if (file.fieldname === "video") {
      if (allowedVideos.includes(file.mimetype)) {
        return cb(null, true);
      }

      return cb(
        new Error("Only MP4, WebM and MOV videos are allowed.")
      );
    }

    return cb(new Error("Unexpected file field."));
  },
});
