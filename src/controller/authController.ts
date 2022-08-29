import { Request, Response } from "express";
import passwordHash from "../utils/passwordHash";
const db = require("../db/models");

class authController {
	register = async (req: Request, res: Response): Promise<Response> => {
		let { username, password } = req.body;
		const hashPassword: string = await passwordHash.hash(password);
		const createdUser = await db.user.create({
			username,
			password: hashPassword,
		});
		return res.send(createdUser);
	};
	login(req: Request, res: Response): Response {
		return res.send("login");
	}
	logout(req: Request, res: Response): Response {
		return res.send("logout");
	}
}

export default new authController();
