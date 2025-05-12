import { pool } from "../../utils/mysql.js";

// Faqat oddiy foydalanuvchilarni olish
const getUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users WHERE user_role = 'user'");
  return rows;
};

// Userni ID orqali topish
const getUserbyId = async (user_id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [user_id]);
  return rows;
};

// Ro‘yxatdan o‘tkazish
const Register = async (user_email, user_password, user_firstname, user_lastname, user_ageyear) => {
  const [result] = await pool.query(
    "INSERT INTO users (user_email, user_password, user_firstname, user_lastname, user_ageyear) VALUES (?, ?, ?, ?, ?)",
    [user_email, user_password, user_firstname, user_lastname, user_ageyear]
  );
  return {
    user_id: result.insertId,
    user_email,
    user_password,
    user_firstname,
    user_lastname,
    user_ageyear
  };
};

// Email orqali user qidirish
const userMatch = async (user_email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE user_email = ?", [user_email]);
  return rows;
};

export { getUsers, Register, userMatch, getUserbyId };
