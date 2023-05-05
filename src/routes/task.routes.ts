import { Router } from "express";
import {
	displayUserTasks,
	taskEdit,
	addTask,
	taskDelete,
} from "../controllers/taskController";

const router = Router();

router.post("/", displayUserTasks);
router.post("/add", addTask);
router.delete("/:id", taskDelete);
router.put("/:id", taskEdit);

export default router;
