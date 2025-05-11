import { pool } from "../../utils/pg.js";

const getAllQuestions = async () => {
  const res = await pool.query("SELECT * FROM test_questions");
  return res.rows;
};

const createQuestion = async (subject_name, question, option_a, option_b, option_c, option_d, correct_option) => {
  const res = await pool.query(
    `INSERT INTO test_questions 
    (subject_name, question, option_a, option_b, option_c, option_d, correct_option) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [subject_name, question, option_a, option_b, option_c, option_d, correct_option]
  );
  return res.rows[0];
};

const getQuestionById = async (id) => {
  const res = await pool.query("SELECT * FROM test_questions WHERE id = $1", [id]);
  return res.rows[0];
};

const updateQuestion = async (id, subject_name, question, option_a, option_b, option_c, option_d, correct_option) => {
  const res = await pool.query(
    `UPDATE test_questions SET 
    subject_name = $1, question = $2, option_a = $3, option_b = $4, 
    option_c = $5, option_d = $6, correct_option = $7 
    WHERE id = $8 RETURNING *`,
    [subject_name, question, option_a, option_b, option_c, option_d, correct_option, id]
  );
  return res.rows[0];
};

const deleteQuestion = async (id) => {
  const res = await pool.query("DELETE FROM test_questions WHERE id = $1 RETURNING *", [id]);
  return res.rows[0];
};


const getGroupedQuestionsFromDB = async () => {
  const result = await pool.query('SELECT * FROM test_questions ORDER BY subject_name, id');

  const groupedData = {};

  result.rows.forEach((row) => {
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

  const finalResult = Object.entries(groupedData).map(([subject_name, questions]) => ({
    subject_name,
    questions
  }));

  return finalResult;
};

export {
  getAllQuestions,
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getGroupedQuestionsFromDB 
};
