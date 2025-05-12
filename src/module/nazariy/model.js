import { pool } from "../../utils/mysql.js";

// Barcha nazariy darslarni olish
const getNazariy = async () => {
  const [rows] = await pool.query("SELECT * FROM nazariy");
  return rows;
};

// Yangi nazariy dars qo‘shish
const createNazariy = async (nazariy_title, nazariy_file, nazariy_video, nazariy_test) => {
  const [result] = await pool.query(
    "INSERT INTO nazariy (nazariy_title, nazariy_file, nazariy_video, nazariy_test) VALUES (?, ?, ?, ?)",
    [nazariy_title, nazariy_file, nazariy_video, nazariy_test]
  );

  return {
    nazariy_id: result.insertId,
    nazariy_title,
    nazariy_file,
    nazariy_video,
    nazariy_test
  };
};

// Nazariy darsni o‘chirish
const deleteNazariy = async (id) => {
  const [result] = await pool.query("DELETE FROM nazariy WHERE nazariy_id = ?", [id]);
  return result.affectedRows > 0;
};

export { getNazariy, createNazariy, deleteNazariy };
