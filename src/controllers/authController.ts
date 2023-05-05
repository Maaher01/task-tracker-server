import { Request, Response } from "express";
import { User } from "../models/user";

import { comparePassword, hashPassword } from "../utils/password_util";
import { getUser, createUser, updateUserPassword } from "../utils/user_util";

export const signup = async (req: Request<{}, {}, User>, res: Response) => {
	const { firstname, lastname, email, password } = req.body;
	try {
		let user = await getUser(email);
		if (user) {
			return res.status(403).json({
				status: "Failed",
				error: "Email is already in use",
			});
		}
		const hashedPassword = await hashPassword(password);
		user = await createUser(firstname, lastname, email, hashedPassword);
		const UserResponse = {
			id: user?.id,
			firstname: user?.firstname,
			lastname: user?.lastname,
			email: user?.email,
			password: user?.password,
			createdat: user?.createdat,
			updatedat: user?.updatedat,
		};
		return res.status(200).json({
			status: "Success",
			data: { user: UserResponse },
		});
	} catch (err: any) {
		res.status(500).json({
			status: "failed",
			error: err.message,
		});
	}
};

export const login = async (req: Request<{}, {}, User>, res: Response) => {
	const { email, password } = req.body;
	try {
		const user = await getUser(email);
		if (!user) {
			return res.status(404).json({
				status: "failed",
				error: "User does not exist",
			});
		}
		const compareResult = await comparePassword(password, user.password);
		if (!compareResult) {
			return res.status(404).json({
				status: "failed",
				error: "Incorrect password",
			});
		}
		const userResponse = {
			id: user.id,
			firstname: user.firstname,
			lastname: user.lastname,
		};
		return res.status(200).json({
			status: "Success",
			data: { user: userResponse },
		});
	} catch (err: any) {
		res.status(500).json({
			status: "failed",
			error: err.message,
		});
	}
};

export const forgotPassword = async (req: Request, res: Response) => {
	const { email, newPassword } = req.body;
	try {
		let user = await getUser(email);
		if (!user) {
			return res.status(404).json({
				status: "failed",
				error: "No user found with this email",
			});
		}
		const hashedPassword = await hashPassword(newPassword);
		await updateUserPassword(user.email, hashedPassword);
		const userResponse = {
			id: user.id,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
		};
		return res.status(200).json({
			status: "Success",
			error: { user: userResponse },
		});
	} catch (error) {
		res.status(500).json({
			status: "failed",
			error: "Failed to change password please try again later",
		});
	}
};
