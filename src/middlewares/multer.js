import multer from 'multer';
import path from 'path';

// Fayllarni saqlash uchun konfiguratsiya
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Fayllarni saqlash uchun papka
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Fayl nomini o'zgartirish
  }
});

// Multerni sozlash (fayl formatini tekshirmasdan)
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Maksimal fayl o'lchami: 10MB
});

export default upload;
