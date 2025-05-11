import express from 'express';
import upload from '../../middlewares/multer.js';
import { getAllNews, createNewArticle, deleteArticle } from './news_cont.js';

const newsRoutes = express.Router();

// CRUD routes
newsRoutes.get('/news', getAllNews);
newsRoutes.post('/news', upload.single('news_image'), createNewArticle);
newsRoutes.delete('/news/:id', deleteArticle);

export default newsRoutes;
