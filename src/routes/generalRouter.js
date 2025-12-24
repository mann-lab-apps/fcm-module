import express from "express";
import { getItems, getTables } from "../controller/generalController.js";

export const generalRouter = express.Router();

generalRouter.get("/tables", getTables);
generalRouter.get("/items", getItems);
