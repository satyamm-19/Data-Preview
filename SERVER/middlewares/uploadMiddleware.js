import multer, { memoryStorage } from 'multer';
import { extname } from 'path';

// Set up storage for multer
const storage = memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + extname(file.originalname)); // Ensure unique filenames
  }
});
import { existsSync, mkdirSync } from 'fs';
// In uploadMiddleware.js:

if (!existsSync('uploads/')) {
    mkdirSync('uploads/');
}
const upload = multer({ storage });

export default upload;
