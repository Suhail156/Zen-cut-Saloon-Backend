import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from "multer";
import fs from "fs";
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDirectory = path.resolve(__dirname, "upload");

const storage = multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage }); 

cloudinary.config({
    cloud_name: "dgrh68exa",
    api_key: "186231723472959",
    api_secret: "oV9umSP5U_Uh7QFXRcOfgYAV70M",
});

const imageUpload = (req, res, next) => {
    upload.single("image")(req, res, async (error) => {
        if (error) {
            return res.status(400).json({
                status: "error",
                message: error.message
            });
        }
        try {
            if (!req.file) {
                return res.status(400).json({
                    status: "error",
                    message: "No image file provided"
                });
            }
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "Profile-images"
            });
            req.body.image = result.secure_url;
            fs.unlink(req.file.path, (unlink_error) => {
                if (unlink_error) {
                    console.log("Error deleting local files after uploading to cloudinary");
                }
            });
            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: "error",
                message: "Error uploading file to Cloudinary"
            });
        }
    });
};

export default imageUpload;
