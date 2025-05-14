// middlewares/multer.js
import multer from 'multer';
import { storage } from './cloudnariy.js';

const upload = multer({ storage });

export default upload;
