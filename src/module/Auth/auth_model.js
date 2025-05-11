import { pool } from "../../utils/pg.js";

const getUsers = async () => {
  const res = await pool.query(`SELECT * FROM users WHERE user_role = 'user'`);
  return res.rows;
};

const getUserbyId = async (user_id) => {
  const res = await pool.query('SELECT * FROM users WHERE user_id = $1',
  [user_id]);
  return res.rows;
};

const Register = async (user_email, user_password, user_firstname, user_lastname,
  user_ageyear) => {
  const res = await pool.query(
    'INSERT INTO users (user_email, user_password, user_firstname, user_lastname, user_ageyear) VALUES ($1, $2, $3 , $4, $5) RETURNING *',
    [user_email, user_password, user_firstname, user_lastname,user_ageyear]
  );
  return res.rows[0];
};

const userMatch = async (user_email) => {
  const res = await pool.query('SELECT * FROM users WHERE user_email = $1',
  [user_email]);
  return res.rows;
};


export { getUsers, Register, userMatch, getUserbyId};
