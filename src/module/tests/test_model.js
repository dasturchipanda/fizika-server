import { pool } from "../../utils/mysql.js"; // oldingi pg.js o‘rniga mysql.js

const getAllQuestions = async () => {
  const [rows] = await pool.query("SELECT * FROM test_questions");
  return rows;
};

const createQuestion = async (subject_name, question, option_a, option_b, option_c, option_d, correct_option) => {
  const [result] = await pool.query(
    `INSERT INTO test_questions 
    (subject_name, question, option_a, option_b, option_c, option_d, correct_option) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [subject_name, question, option_a, option_b, option_c, option_d, correct_option]
  );
  const [newRow] = await pool.query("SELECT * FROM test_questions WHERE id = ?", [result.insertId]);
  return newRow[0];
};

const getQuestionById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM test_questions WHERE id = ?", [id]);
  return rows[0];
};

const updateQuestion = async (id, subject_name, question, option_a, option_b, option_c, option_d, correct_option) => {
  await pool.query(
    `UPDATE test_questions SET 
    subject_name = ?, question = ?, option_a = ?, option_b = ?, 
    option_c = ?, option_d = ?, correct_option = ? 
    WHERE id = ?`,
    [subject_name, question, option_a, option_b, option_c, option_d, correct_option, id]
  );
  const [updatedRow] = await pool.query("SELECT * FROM test_questions WHERE id = ?", [id]);
  return updatedRow[0];
};

const deleteQuestion = async (id) => {
  const [deletedRow] = await pool.query("SELECT * FROM test_questions WHERE id = ?", [id]);
  await pool.query("DELETE FROM test_questions WHERE id = ?", [id]);
  return deletedRow[0];
};

const getGroupedQuestionsFromDB = async () => {
  const [rows] = await pool.query("SELECT * FROM test_questions ORDER BY subject_name, id");

  const groupedData = {};

  rows.forEach((row) => {
    if (!groupedData[row.subject_name]) {
      groupedData[row.subject_name] = [];
    }

    groupedData[row.subject_name].push({
      id: row.id,
      question: row.question,
      option_a: row.option_a,
      option_b: row.option_b,
      option_c: row.option_c,
      option_d: row.option_d,
      correct_option: row.correct_option
    });
  });

  return Object.entries(groupedData).map(([subject_name, questions]) => ({
    subject_name,
    questions
  }));
};

export {
  getAllQuestions,
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getGroupedQuestionsFromDB
};
