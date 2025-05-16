import jwt from "jsonwebtoken";
import { insertResult, getResultsByUser, deleteResult, getResults, getLeaderboard } from "./model.js";

// Hamma natijalarni olish (admin ko‘rishi uchun)
const getResultsList = async (req, res) => {
  try {
    const results = await getResults();
    res.json(results);
  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const getLeader = async (req, res) => {
  try {
    const lider = await getLeaderboard();
    res.json(lider);
  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// bitta userni natijalarni olish (user ko‘rishi uchun)
const getResultOne = async (req, res) => {
  try {
    const id =req.params.id;
    const results = await getResultsByUser(id);
    res.json(results);
  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// Yangi natija yaratish (user testdan keyin yuboradi)
const createNewResult = async (req, res) => {
  try {
    const { user_id, subject_name, score, total } = req.body;

    if (!subject_name || !user_id || score == null || total == null)
      return res.status(400).json({ message: "Ma'lumotlar to‘liq emas" });

    const newResult = await insertResult(user_id, subject_name, score, total);
    res.status(201).json(newResult);
  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Natijani o‘chirish
const deleteResultById = async (req, res) => {
  try {
    const deleted = await deleteResult(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Topilmadi" });
    res.json({ message: "O‘chirildi", id: req.params.id });
  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export { getResultsList, createNewResult, deleteResultById, getResultOne , getLeader};
