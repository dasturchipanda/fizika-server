import express from 'express';
import upload from '../../middlewares/multer.js';
import { createNewNazariy, deleteNazariya, getAllNazariy } from './nazariy.js';

const nazariyRoutes = express.Router();

// CRUD routes
nazariyRoutes.get('/nazariy', getAllNazariy );
nazariyRoutes.post('/nazariy', upload.single('nazariy_file'), createNewNazariy);
nazariyRoutes.delete('/nazariy/:id', deleteNazariya);

export default nazariyRoutes;