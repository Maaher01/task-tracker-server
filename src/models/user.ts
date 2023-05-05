export interface User {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

export interface UserResponse extends User {
	id: number;
	createdat: string;
	updatedat: string;
}
