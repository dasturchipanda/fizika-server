import { createAmaliy, getAmaliy,deleteAmaily } from './model.js';
import fs from 'fs';
import path from 'path';

// Get all cars
const getAllAmaliy = async (req, res) => {
  try {
    const amaliylar = await getAmaliy();
    res.json(amaliylar);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

// Create new car
const createNewAmaliy = async (req, res) => {
  try {
    const { amaliy_title } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'amaliy_file requared' });
    }
    const amaliy_file = '/uploads/'+req.file.filename;
    const newAmaliy = await createAmaliy( amaliy_title, amaliy_file);
    res.status(201).json(newAmaliy);
  } catch (error) {
    const filePath = path.resolve('uploads',req.file.filename);
    fs.unlink(filePath, err => err ? console.error('Failed to delete file:', err) : console.log('File successfully deleted'));
    res.status(500).json( { error: error.message});
  }
};


// Delete car
const deleteAmailya = async (req, res) => {
  try {
    const deletedAmaliy = await deleteAmaily(req.params.id);
    if (!deletedAmaliy) return res.status(404).json({ error: 'Amaliy not found' });
    res.json({amaliy_id: req.params.id, message: 'Amaliy deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export {getAllAmaliy, createNewAmaliy, deleteAmailya };
