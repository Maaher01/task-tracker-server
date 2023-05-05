import { Request, Response } from "express";
import { Task } from "../models/task";

import {
	getTaskById,
	getUserTasks,
	createTask,
	editTask,
	deleteTask,
} from "../utils/task_util";

export const displayUserTasks = async (req: Request, res: Response) => {
	const { userid } = req.body;
	try {
		const userTasks = (await getUserTasks(userid)) as Task;
		if (!userTasks) {
			return res.status(404).json({
				status: "failed",
				message: "User does not exist",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: userTasks,
		});
	} catch {
		return res.status(500).json({
			status: "failed",
			error: "Unexpected error occured.",
		});
	}
};

export const taskEdit = async (req: Request, res: Response) => {
	const { title, content, status } = req.body;
	const { id } = req.params;
	try {
		const response = (await editTask(title, content, status, id)) as Task;
		if (!response) {
			return res.status(404).json({
				status: "failed",
				error: "Task not found",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: { ...response },
		});
	} catch (error: any) {
		res.status(500).json({
			status: "failed",
			error: error.message,
		});
	}
};

export const addTask = async (req: Request, res: Response) => {
	const { title, content, status, userid } = req.body;
	try {
		const task = (await createTask(title, content, status, userid)) as Task;
		return res.status(200).json({
			status: "Success",
			data: { ...task },
		});
	} catch (error: any) {
		res.status(500).json({
			ststus: "failed",
			error: error.message,
		});
	}
};

export const taskDelete = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		(await getTaskById(id)) as Task;
		const response = (await deleteTask(id)) as Task;
		if (!response) {
			return res.status(404).json({
				status: "failed",
				error: "Task does not exist",
			});
		}
		return res.status(200).json({
			status: "Success",
			data: { id: response.id },
		});
	} catch (error: any) {
		res.status(500).json({
			status: "failed",
			error: error.message,
		});
	}
};
