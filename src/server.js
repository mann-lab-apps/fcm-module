import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import { rootRouter } from "./routes/rootRouter";

export const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
configDotenv();

app.use("/api", rootRouter);
