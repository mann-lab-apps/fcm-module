import express from "express";
import { sendFcmMessage } from "../controller/sendFcmMessage.js";
import { concertsRouter } from "./concertsRouter.js";
import { generalRouter } from "./generalRouter.js";
import { authRouter } from "./authRouter.js";

export const rootRouter = express.Router();

rootRouter.use("/concerts", concertsRouter);
rootRouter.use("/general", generalRouter);
rootRouter.use("/auth", authRouter);
rootRouter.post("/fcm/send", sendFcmMessage);
