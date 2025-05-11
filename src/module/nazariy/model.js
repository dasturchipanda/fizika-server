import { pool } from "../../utils/pg.js";

const getNazariy = async () => {
  const res = await pool.query(`SELECT * from nazariy`);
  return res.rows;
};


const createNazariy = async (nazariy_title, nazariy_file, nazariy_video, nazariy_test) => {
  const res = await pool.query(
    'INSERT INTO nazariy (nazariy_title, nazariy_file, nazariy_video, nazariy_test) VALUES ($1, $2, $3, $4) RETURNING *',
    [nazariy_title, nazariy_file, nazariy_video, nazariy_test]
  );
  return res.rows[0];
};

const deleteNazariy = async (id) => {
  const res = await pool.query('DELETE FROM nazariy WHERE nazariy_id = $1 RETURNING *', [id]);
  return res.rows[0];
};

export { getNazariy, createNazariy, deleteNazariy };
