import Express, { Application } from "express";
import cors from "cors";
import "dotenv/config";

import authRouter from "./routes/auth.routes";
import taskRouter from "./routes/task.routes";
import { connectToDatabase } from "./config/db";

const app: Application = Express();

const PORT = 3000;

//Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:4200" }));
app.use(Express.json());

//Routes
app.use("/api/user", authRouter);
app.use("/api/task", taskRouter);

app.listen(PORT, async () => {
	await connectToDatabase();
	console.info(`Sever has started at http://localhost:${PORT}`);
});
