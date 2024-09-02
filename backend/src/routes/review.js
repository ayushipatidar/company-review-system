import express from "express";
import { ReviewController } from "../controllers/index.js";

const router = express.Router();

router.post("/:id", ReviewController.add);

export default router;
