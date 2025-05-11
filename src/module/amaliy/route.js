import express from 'express';
import upload from '../../middlewares/multer.js';
import { createNewAmaliy, getAllAmaliy, deleteAmailya } from './amaliy.js';

const amaliyRoutes = express.Router();

// CRUD routes
amaliyRoutes.get('/amaliy', getAllAmaliy );
amaliyRoutes.post('/amaliy', upload.single('amaliy_file'), createNewAmaliy);
amaliyRoutes.delete('/amaliy/:id', deleteAmailya);

export default amaliyRoutes;