import express from "express";
const router = express.Router();

import {createTask, getTasks, updateTask, deleteTask} from "../controllers/taskController.js";

// authentication middleware import
import {protect} from "../middleware/authMiddleware.js";

// file upload middleware import
import upload from "../middleware/uploadMiddleware.js";


router.post("/create", protect, upload.single("file"), createTask);
router.get("/get", protect, getTasks);
router.put("/update/:id", protect, updateTask);
router.delete("/delete/:id", protect, deleteTask);

export default router;

