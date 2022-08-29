import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import { config as dotenv } from "dotenv";
import todoRouter from "./routes/todoRouter";

class App {
	public app: Application;

	constructor() {
		this.app = express();
		this.plugins();
		this.routes();
		dotenv();
	}

	protected plugins(): void {
		this.app.use(bodyParser.json());
		this.app.use(compression());
		this.app.use(helmet());
		this.app.use(cors());
	}

	protected routes(): void {
		this.app.route("/").get((req: Request, res: Response) => {
			res.send("home TS");
		});

		this.app.use("/api/v1/users", userRouter);
		this.app.use("/api/v1/auth", authRouter);
		this.app.use("/api/v1/todos", todoRouter);
	}
}

const port: number = 8000;
const app = new App().app;
app.listen(port, () => {
	console.log(`running in port ${port}`);
	console.log(`test env ${process.env.DB_HOST}`);
});
