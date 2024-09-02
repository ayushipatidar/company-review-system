import express from "express";

import CompanyRouter from "./company.js";
import ReviewRouter from "./review.js";

const router = express.Router();

router.use("/company", CompanyRouter);
router.use("/review", ReviewRouter);

export default router;
