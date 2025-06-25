import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadFile(file: Buffer, folder: string, publicId?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadOptions: any = {
      folder,
      resource_type: "auto",
    }

    if (publicId) {
      uploadOptions.public_id = publicId
    }

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) {
          reject(error)
          return
        }
        resolve(result!.secure_url)
      })
      .end(file)
  })
}

export async function deleteFile(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result.result === "ok"
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error)
    return false
  }
}

export function getPublicIdFromUrl(url: string): string {
  const parts = url.split("/")
  const filename = parts[parts.length - 1]
  const publicId = filename.split(".")[0]
  return publicId
}
