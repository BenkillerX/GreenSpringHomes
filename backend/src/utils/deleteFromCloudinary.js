import cloudinary from "../config/cloudinary.js";

export async function deleteFromCloudinary( publicId, resourceType ) {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}