import express from 'express';
import path from 'path';
import { errorHandler } from './middlewares/errorMiddleware.js';
import MainRouter from './module/routes.js'
import cors from 'cors';
import { pool } from './utils/mysql.js';

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Agar kerakli sozlamalar bo'lsa:
app.use(cors({
  origin: '*', // Frontend URL ni shu yerda ko'rsating
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 'uploads' papkasining absolut yo'lini belgilash
app.use('/uploads', express.static(path.resolve('uploads')));


app.use(MainRouter)

// Error handler middleware
app.use(errorHandler);

app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The requested URL http://localhost:9000${req.originalUrl} was not found on this server.`
  });
});


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});