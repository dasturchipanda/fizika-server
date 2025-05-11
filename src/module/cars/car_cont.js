import { getCars, getCarById, createCar, updateCar, deleteCar } from './car_model.js';
import fs from 'fs';
import path from 'path';

// Get all cars
const getAllCars = async (req, res) => {
  try {
    const cars = await getCars();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

// Get car by ID
const getCar = async (req, res) => {
  try {
    const car = await getCarById(req.params.id);
    if (!car) return res.status(404).json({ error: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new car
const createNewCar = async (req, res) => {
  try {
    const { car_name, car_brend } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'car_image requared' });
    }
    const car_image = '/uploads/'+req.file.filename;
    const newCar = await createCar(car_name, car_image, car_brend);
    console.log(newCar)
    res.status(201).json(newCar);
  } catch (error) {
    const filePath = path.resolve('uploads',req.file.filename);
    fs.unlink(filePath, err => err ? console.error('Failed to delete file:', err) : console.log('File successfully deleted'));
    res.status(500).json( { error: error.message});
  }
};

// Update car
const updateCarDetails = async (req, res) => {
  try {
    const { car_name, car_brend } = req.body;
    
    const currentCar = await getCarById(req.params.id);
    const car_image = req.file ? `/uploads/${req.file.filename}` : currentCar.car_image;
    
    if (!currentCar) return res.status(404).json({ error: 'Car not found' });
    
    const checkPossible = {
      car_name: car_name || currentCar.car_name,
      car_image: car_image || currentCar.car_image,
      car_brend: car_brend || currentCar.car_brend,
    };


    const updatedCar = updateCar(req.params.id, checkPossible.car_name, checkPossible.car_image, checkPossible.car_brend)
    
    res.json({status: 200, message: "car succsessfully updated"});
  } catch (error) {
    res.status(500).json({ error: 'Server error' , message: error });
  }
};

// Delete car
const deleteCarById = async (req, res) => {
  try {
    const deletedCar = await deleteCar(req.params.id);
    if (!deletedCar) return res.status(404).json({ error: 'Car not found' });
    res.json({car_id: req.params.id, message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export {getAllCars, getCar, createNewCar, updateCarDetails, deleteCarById };
