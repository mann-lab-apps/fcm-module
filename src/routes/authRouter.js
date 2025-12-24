import express from "express";
import { registerUser } from "../controller/authController.js";

export const authRouter = express.Router();

authRouter.post("/join", registerUser);
