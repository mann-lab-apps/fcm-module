import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { getDashboardPage } from "../controller/viewsController.js";

export const viewsRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

viewsRouter.use(
  "/public",
  express.static(path.join(__dirname, "..", "public"))
);

viewsRouter.use("/dashboard", getDashboardPage);
