import { Express, Router } from "express";
import { serveData } from "../controllers/serveData";

const router = Router();

router.get("/crypto-data", serveData);

export default router;
