import express from "express";
import { getStreams, createStream } from "../controllers/streamController.js";

const router = express.Router();

router.get("/", getStreams);
router.post("/", createStream);

export default router;