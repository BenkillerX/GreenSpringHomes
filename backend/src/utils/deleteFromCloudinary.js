import cloudinary from "../config/cloudinary.js";

export async function deleteFromCloudinary(publicId) {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
}