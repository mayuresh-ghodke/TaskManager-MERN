// uploadMiddleware
import path from "path";
import fs from "fs";
import multer from "multer";

const uploadDir = path.join(process.cwd(), "uploads");

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, {recursive: true});
}

// diskStorage: to store files physically on server
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadDir);
    },
    // specify file name (Date.now() to avoid duplicate file overriding)
    filename: function(req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    },
});

// creating multer instance and passing storage configuration
const upload = multer({
    storage: storage,
});

export default upload;