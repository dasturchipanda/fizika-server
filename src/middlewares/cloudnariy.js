import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: 'dmme9swtw',
  api_key: '262637181666639',
  api_secret: '-d3ng78mxjhXW72AdOu--t3K2IY'
});

// CloudinaryStorage access_mode ni bevosita qabul qilmaydi, shuning uchun upload'dan keyin o'zgartiramiz
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'amaliy',
    resource_type: 'raw',
    format: 'pdf',
    public_id: file.originalname.replace(/\.[^/.]+$/, ""),
  }),
});

export { cloudinary, storage };
