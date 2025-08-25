import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { addUsage, getMyUsages, deleteUsage, stats } from "../controllers/water.controller.js";

const router = express.Router();

router.use(auth);

router.post("/", addUsage);            
router.get("/", getMyUsages);          
router.delete("/:id", deleteUsage);    
router.get("/stats", stats);           

export default router;


