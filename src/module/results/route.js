import express from 'express';
import {
  createNewResult,
  getResultOne,
  getResultsList,
  deleteResultById,
  getLeader,
} from './result.js';

const resultRouter = express.Router();

resultRouter.get('/results', getResultsList);
resultRouter.get('/result/:id', getResultOne);
resultRouter.post('/results', createNewResult);
resultRouter.get('/liders', getLeader);
resultRouter.delete('/result/:id', deleteResultById );

export default resultRouter;
