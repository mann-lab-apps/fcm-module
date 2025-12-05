import express from "express";
import { sendFcmMessage } from "../controller/sendFcmMessage";

export const rootRouter = express.Router();

rootRouter.post("/fcm/send", sendFcmMessage);
