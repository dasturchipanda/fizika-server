import { pool } from "../../utils/mysql.js"; // pg.js emas, mysql.js bo‘lishi kerak

// Barcha ma’lumotlarni olish
const getAmaliy = async () => {
  const [rows] = await pool.query("SELECT * FROM amaliy");
  return rows;
};

// Yangi amaliy yozuv qo‘shish
const createAmaliy = async (amaliy_title, amaliy_file) => {
  const [result] = await pool.query(
    "INSERT INTO amaliy (amaliy_title, amaliy_file) VALUES (?, ?)",
    [amaliy_title, amaliy_file]
  );
  return {
    amaliy_id: result.insertId,
    amaliy_title,
    amaliy_file
  };
};

// Amaliy yozuvni o‘chirish
const deleteAmaily = async (id) => {
  const [result] = await pool.query("DELETE FROM amaliy WHERE amaliy_id = ?", [id]);
  return result.affectedRows > 0; // true agar o‘chirildi, false agar topilmadi
};

export { getAmaliy, createAmaliy, deleteAmaily };
