import { pool } from "../../utils/pg.js";

const getAmaliy = async () => {
  const res = await pool.query(`SELECT * from amaliy`);
  return res.rows;
};


const createAmaliy = async (amaliy_title, amaliy_file) => {
  const res = await pool.query(
    'INSERT INTO amaliy (amaliy_title, amaliy_file) VALUES ($1, $2) RETURNING *',
    [amaliy_title, amaliy_file]
  );
  return res.rows[0];
};

const deleteAmaily = async (id) => {
  const res = await pool.query('DELETE FROM amaily WHERE amaliy_id = $1 RETURNING *', [id]);
  return res.rows[0];
};

export { getAmaliy, createAmaliy, deleteAmaily };
