import { client } from "../config/db";
import { Task } from "../models/task";

export const getTaskById = async (id: string): Promise<Task | null> => {
	const { rows } = await client.query("SELECT * FROM tasks WHERE id=$1;", [id]);
	if (rows) {
		return rows[0];
	}
	return null;
};

export const getUserTasks = async (userid: number): Promise<Task | null> => {
	const { rows } = await client.query(
		"SELECT id, title, content, status, createdat, updatedat FROM tasks WHERE userid=$1;",
		[userid]
	);
	if (rows) {
		return rows;
	}
	return null;
};

export const createTask = async (
	title: string,
	content: string,
	status: string,
	userid: number
): Promise<Task | null> => {
	const { rows } = await client.query(
		"INSERT INTO tasks (title, content, status, userid) VALUES ($1, $2, $3, $4);",
		[title, content, status, userid]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

export const editTask = async (
	title: string,
	content: string,
	status: string,
	taskId: string
): Promise<Task | null> => {
	const { rows } = await client.query(
		"UPDATE tasks SET title=$1, content=$2, status=$3 WHERE id=$4 returning *;",
		[title, content, status, taskId]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

export const deleteTask = async (id: string): Promise<Task | null> => {
	const { rows } = await client.query(
		"DELETE FROM tasks WHERE id=$1 returning id;",
		[id]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};
