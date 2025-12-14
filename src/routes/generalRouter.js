import express from "express";
import { getTables } from "../controller/generalController.js";

export const generalRouter = express.Router();

generalRouter.get("/tables", getTables);
