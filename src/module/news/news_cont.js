import path from 'path';
import fs from 'fs';
import { getNews, createArticle, deleteNews } from './news_model.js';

// Hamma yangiliklarni olish
const getAllNews = async (req, res) => {
  try {
    const news = await getNews();
    res.json(news);
  } catch (error) {
    console.error('❌ ERROR:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Yangi yangilik yaratish
const createNewArticle = async (req, res) => {
  try {
    const { news_title, news_description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Rasm kerak' });
    }

    const news_image = req.file?.path; // Cloudinary URL


    const newArticle = await createArticle(news_image, news_title, news_description);
    res.status(201).json(newArticle);
  } catch (error) {
    if (req.file) {
      const filePath = path.resolve('uploads', req.file.filename);
      fs.unlink(filePath, err => {
        if (err) console.error('❌ File delete error:', err);
      });
    }
    console.error('❌ ERROR:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Yangilikni o‘chirish
const deleteArticle = async (req, res) => {
  try {
    const deleted = await deleteNews(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Topilmadi' });
    res.json({ message: 'O‘chirildi', id: req.params.id });
  } catch (error) {
    console.error('❌ ERROR:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export { getAllNews, createNewArticle, deleteArticle };
