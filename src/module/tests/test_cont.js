import {
  getAllQuestions,
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getGroupedQuestionsFromDB,
} from "./test_model.js";

// Get all questions
const getQuestions = async (req, res) => {
  try {
    const questions = await getAllQuestions();
    res.json(questions);
  } catch (error) {
    console.error("❌ Xatolik:", error); // bu qatorni qo‘shing
    res.status(500).json({ error: "Server error" });
  }
};

const getAllGroupedQuestions = async (req, res) => {
  try {
    const data = await getGroupedQuestionsFromDB();
    res.json(data);
  } catch (error) {
    console.error("❌ Xatolik:", error); // bu qatorni qo‘shing
    res.status(500).json({ error: "Server error" });
  }
};

// Get one question
const getOneQuestion = async (req, res) => {
  try {
    const question = await getQuestionById(req.params.id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (error) {
    console.error("❌ Xatolik:", error); // bu qatorni qo‘shing
    res.status(500).json({ error: "Server error" });
  }
};

// Create a new question
const addQuestion = async (req, res) => {
  try {
    const {
      subject_name,
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_option,
    } = req.body;

    if (
      !subject_name ||
      !question ||
      !option_a ||
      !option_b ||
      !option_c ||
      !option_d ||
      !correct_option
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuestion = await createQuestion(
      subject_name,
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_option
    );
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("❌ Xatolik:", error); // bu qatorni qo‘shing
    res.status(500).json({ error: "Server error" });
  }
};

// Update a question
const editQuestion = async (req, res) => {
  try {
    const {
      subject_name,
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_option,
    } = req.body;

    if (
      !subject_name ||
      !question ||
      !option_a ||
      !option_b ||
      !option_c ||
      !option_d ||
      !correct_option
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updated = await updateQuestion(
      req.params.id,
      subject_name,
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_option
    );

    if (!updated)
      return res.status(404).json({ message: "Question not found" });

    res.json(updated);
  } catch (error) {
    console.error("❌ Xatolik:", error); // bu qatorni qo‘shing
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a question
const removeQuestion = async (req, res) => {
  try {
    const deleted = await deleteQuestion(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Question not found" });
    res.json({ message: "Question deleted", deleted });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export {
  getQuestions,
  getOneQuestion,
  addQuestion,
  editQuestion,
  removeQuestion,
  getAllGroupedQuestions,
};
