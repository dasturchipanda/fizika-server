import express from "express";
import {
  getQuestions,
  getOneQuestion,
  addQuestion,
  editQuestion,
  removeQuestion,
  getAllGroupedQuestions
} from "./test_cont.js";

const testRouter = express.Router();

// CRUD routes
testRouter.get("/tests", getQuestions);
testRouter.get("/grouptests", getAllGroupedQuestions);
testRouter.get("/test/:id", getOneQuestion);
testRouter.post("/tests", addQuestion);
testRouter.put("/tests/:id", editQuestion);
testRouter.delete("/tests/:id", removeQuestion);

export default testRouter;
