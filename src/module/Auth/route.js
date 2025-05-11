import { Router } from "express";
import { getAllusers, getOneUser, loginUser, registerWithCode, sendCodeToEmail} from "./auth_cont.js";


const userRoutes = Router();

userRoutes.get('/users', getAllusers);
userRoutes.get('/user/:id', getOneUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/send-code', sendCodeToEmail);
userRoutes.post('/register', registerWithCode);

export default userRoutes;
