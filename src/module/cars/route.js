import express from 'express';
import {getAllCars, getCar, createNewCar, updateCarDetails, deleteCarById } from '../cars/car_cont.js';
import upload from '../../middlewares/multer.js';

const carRoutes = express.Router();

// CRUD routes
carRoutes.get('/cars', getAllCars);
carRoutes.get('/car/:id', getCar);
carRoutes.post('/add-car', upload.single('car_image'), createNewCar);
carRoutes.put('/edit-car/:id',upload.single('car_image'), updateCarDetails);
carRoutes.delete('/delete-car/:id', deleteCarById);

export default carRoutes;