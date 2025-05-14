// utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: 'dmme9swtw',
  api_key: '262637181666639',
  api_secret: '-d3ng78mxjhXW72AdOu--t3K2IY' // bu yerga haqiqiy secret qo‘ying
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'amaliy', // Cloudinary papka nomi
    resource_type: 'auto',
    allowed_formats: ['jpeg', 'pdf', 'doc', 'docx', 'ppt', 'pptx', 'jpg', 'png'], // kerakli formatlar
  },
});

export { cloudinary, storage };
