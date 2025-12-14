import express from "express";
import { getConcert, getConcerts } from "../controller/concertsController.js";

export const concertsRouter = express.Router();

concertsRouter.get("/:id", getConcert);
concertsRouter.get("/", getConcerts);
