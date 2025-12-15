import express from "express";
import {
  deleteConcert,
  getConcert,
  getConcerts,
  updateConcert,
  writeConcert,
} from "../controller/concertsController.js";

export const concertsRouter = express.Router();

concertsRouter.get("/:id", getConcert);
concertsRouter.get("/", getConcerts);
concertsRouter.post("/", writeConcert);
concertsRouter.put("/", updateConcert);
concertsRouter.patch("/", updateConcert);
concertsRouter.delete("/", deleteConcert);
