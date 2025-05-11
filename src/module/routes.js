import { Router } from "express";
import userRoutes from "./Auth/route.js";
import newsRoutes from "./news/route.js";
import amaliyRoutes from "./amaliy/route.js";
import testRouter from "./tests/test_routes.js";
import nazariyRoutes from "./nazariy/route.js";

const MainRouter = Router();

export default MainRouter.use('/api', [userRoutes , newsRoutes, amaliyRoutes, testRouter, nazariyRoutes])