import express from "express";
import { CompanyController } from "../controllers/index.js";

const router = express.Router();

router.post("/add", CompanyController.add);
router.get("/:id", CompanyController.getCompanyDetail);
router.get("/", CompanyController.getCompanies);

export default router;
