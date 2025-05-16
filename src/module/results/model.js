import { pool } from '../../utils/mysql.js';

// CREATE
export const insertResult = async (userId, subject, score, total) => {
  const sql = `INSERT INTO results (user_id, subject_name, score, total) VALUES (?, ?, ?, ?)`;
  await pool.query(sql, [userId, subject, score, total]);
};

export const getLeaderboard = async () => {
  const [rows] = await pool.query(`
    SELECT r.id, r.subject_name, r.score, r.total, r.user_id,
          u.user_firstname, u.user_lastname
    FROM results r
    JOIN users u ON r.user_id = u.user_id
  `);
  return rows;
};



// READ (all results of a user)
export const getResults = async (userId) => {
  const sql = `SELECT * FROM results ORDER BY created_at DESC`;
  const [rows] = await pool.query(sql, [userId]);
  return rows;
};


// READ (all results of a user)
export const getResultsByUser = async (userId) => {
  const sql = `SELECT * FROM results WHERE user_id = ? ORDER BY created_at DESC`;
  const [rows] = await pool.query(sql, [userId]);
  return rows;
};

// DELETE
export const deleteResult = async (id, userId) => {
  const sql = `DELETE FROM results WHERE id = ? AND user_id = ?`;
  const [result] = await pool.query(sql, [id, userId]);
  return result;
};
