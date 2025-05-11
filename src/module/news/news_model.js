import { pool } from "../../utils/pg.js";

// Hamma yangiliklarni olish
const getNews = async () => {
  const res = await pool.query('SELECT * FROM news ORDER BY news_id DESC');
  return res.rows;
};

// Yangi yangilik yaratish
const createArticle = async (news_image, news_title, news_description) => {
  const res = await pool.query(
    'INSERT INTO news (news_image, news_title, news_description) VALUES ($1, $2, $3) RETURNING *',
    [news_image, news_title, news_description]
  );
  return res.rows[0];
};

// Yangilikni o‘chirish
const deleteNews = async (id) => {
  const res = await pool.query('DELETE FROM news WHERE news_id = $1 RETURNING *', [id]);
  return res.rows[0];
};

export { getNews, createArticle, deleteNews };
