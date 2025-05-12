import { pool } from "../../utils/mysql.js";

// Hamma yangiliklarni olish (so‘nggi yangilik birinchi bo‘lib)
const getNews = async () => {
  const [rows] = await pool.query("SELECT * FROM news ORDER BY news_id DESC");
  return rows;
};

// Yangi yangilik yaratish
const createArticle = async (news_image, news_title, news_description) => {
  const [result] = await pool.query(
    "INSERT INTO news (news_image, news_title, news_description) VALUES (?, ?, ?)",
    [news_image, news_title, news_description]
  );

  return {
    news_id: result.insertId,
    news_image,
    news_title,
    news_description
  };
};

// Yangilikni o‘chirish
const deleteNews = async (id) => {
  const [result] = await pool.query("DELETE FROM news WHERE news_id = ?", [id]);
  return result.affectedRows > 0; // true - o‘chirildi, false - topilmadi
};

export { getNews, createArticle, deleteNews };
