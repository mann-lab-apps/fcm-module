import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { rootRouter } from "./routes/rootRouter.js";
import { viewsRouter } from "./routes/viewsRouter.js";

export const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.use("/api", rootRouter);
app.use("/views", viewsRouter);
