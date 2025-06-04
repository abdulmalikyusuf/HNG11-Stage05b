import { env } from "@/env.mjs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_SECRET,
  secure: true,
});

export async function uploadToCloudinary(fileURI: string, subFolder: string) {
  return await cloudinary.uploader
    .upload(fileURI, {
      invalidate: true,
      folder: `devlinks - avatars/${subFolder}`,
    })
    .then((result) => result)
    .catch((error) => {
      console.log(error);
    });
}
export async function deleteFromCloudinary(publicId: string) {
  return await cloudinary.uploader
    .destroy(publicId)
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
    });
}
