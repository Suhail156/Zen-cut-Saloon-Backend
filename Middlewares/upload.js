import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 // 10MB file size limit
    }
}).single('image');

const uploadImage = (req, res, next) => {
    upload(req, res, async (error) => {
        if (error) {
            console.error("Multer Error:", error);
            return res.status(400).json({
                status: "error",
                message: "Error uploading image: " + error.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                status: "error",
                message: "No image file provided"
            });
        }

        try {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: 'auto' },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                uploadStream.end(req.file.buffer);
            });

            req.cloudinaryImageUrl = result.secure_url;
            console.log("Cloudinary Image URL:", req.cloudinaryImageUrl); 
            next();
        } catch (error) {
            console.error("Cloudinary Error:", error);
            return res.status(500).json({
                status: "error",
                message: "Error uploading image to Cloudinary"
            });
        }
    });
};

export default uploadImage;
