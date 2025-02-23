import express from "express";
import AiController from "../Controllers/ai.controller.js";
const AIRouter = express.Router();

AIRouter.post("/get-content", AiController);

export default AIRouter;