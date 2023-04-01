import express from "express";
import { 对话 } from "src/控制器/对话";
const router = express.Router();

router.post("/", 对话);

export default router;
