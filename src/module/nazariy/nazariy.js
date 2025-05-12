import { createNazariy, deleteNazariy, getNazariy } from "./model.js";
import path from "path";
import fs from "fs";

// Get all cars
const getAllNazariy = async (req, res) => {
  try {
    const nazariylar = await getNazariy();
    res.json(nazariylar);
  } catch (error) {
    console.error("❌ Xatolik:", error); // bu qatorni qo‘shing
    res.status(500).json({ error: "Server error" });
  }
};

// Create new car
const createNewNazariy = async (req, res) => {
  try {
    const { nazariy_title, nazariy_video, nazariy_test } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "nazariy_file requared" });
    }
    const nazariy_file = "/uploads/" + req.file.filename;
    const newNazariy = await createNazariy(
      nazariy_title,
      nazariy_file,
      nazariy_video,
      nazariy_test
    );
    res.status(201).json(newNazariy);
  } catch (error) {
    const filePath = path.resolve("uploads", req.file.filename);
    fs.unlink(filePath, (err) =>
      err
        ? console.error("Failed to delete file:", err)
        : console.log("File successfully deleted")
    );
    res.status(500).json({ error: error.message });
  }
};

// Delete car
const deleteNazariya = async (req, res) => {
  try {
    const deletedNazariy = await deleteNazariy(req.params.id);
    if (!deletedNazariy)
      return res.status(404).json({ error: "Nazariy not found" });
    res.json({
      nazariy_id: req.params.id,
      message: "Nazariy deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export { getAllNazariy, createNewNazariy, deleteNazariya };
