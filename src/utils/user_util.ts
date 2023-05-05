import { client } from "../config/db";
import { UserResponse } from "../models/user";

export const getUser = async (email: string): Promise<UserResponse | null> => {
	const { rows } = await client.query("SELECT * FROM users WHERE email=$1;", [
		email,
	]);
	if (rows) {
		return rows[0];
	}
	return null;
};

export const createUser = async (
	firstname: string,
	lastname: string,
	email: string,
	password: string
): Promise<UserResponse | null> => {
	const { rows } = await client.query(
		"INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *;",
		[firstname, lastname, email, password]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};

export const updateUserPassword = async (
	email: string,
	newPassword: string
): Promise<UserResponse | null> => {
	const { rows } = await client.query(
		"UPDATE users SET password=$1 WHERE email=$2 RETURNING *;",
		[newPassword, email]
	);
	if (rows) {
		return rows[0];
	}
	return null;
};
