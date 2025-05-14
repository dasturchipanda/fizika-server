import { pool } from "../../utils/mysql.js";

const getAmaliy = async () => {
  const [rows] = await pool.query("SELECT * FROM amaliy");
  return rows;
};

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

const deleteAmaliy = async (id) => {
  const [result] = await pool.query("DELETE FROM amaliy WHERE amaliy_id = ?", [id]);
  return result.affectedRows > 0;
};

export { getAmaliy, createAmaliy, deleteAmaliy };
