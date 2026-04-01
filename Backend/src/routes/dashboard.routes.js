import express from "express";
import {
  getStates,
  getThisWeekUploads,
  getUploadsByType,
  getRecentUploads,
} from "../controllers/dashboard.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/get-states", verifyToken, getStates);
router.get("/get-weekly-uploads", verifyToken, getThisWeekUploads);
router.get("/get-uploads-by-type", verifyToken, getUploadsByType);
router.get("/get-recent-uploads", verifyToken, getRecentUploads);

export default router;