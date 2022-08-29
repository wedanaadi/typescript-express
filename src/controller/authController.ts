import { Request, Response } from "express";
import auth from "../utils/authentication";
const db = require("../db/models");

class authController {
	register = async (req: Request, res: Response): Promise<Response> => {
		let { username, password } = req.body;
		const hashPassword: string = await auth.passwordHash(password);
		const createdUser = await db.user.create({
			username,
			password: hashPassword,
		});
		return res.send(createdUser);
	};
	login = async (req: Request, res: Response): Promise<Response> => {
		let { username, password } = req.body;
		// find by username
		const user = await db.user.findOne({
			where: { username: username },
		});
		if (!user) {
			return res.send("username not found");
		}
		// check match password with hashh
		const match = await auth.passwordCompare(password, user.password);
		//  generate token
		if (!match) {
			return res.send("password wrong");
		}
		const token = auth.generateToken(user.id, username, Date.now());
		return res.status(200).json({ token });
	};
	logout(req: Request, res: Response): Response {
		return res.send("logout");
	}
	profile(req: Request, res: Response): Response {
		return res.send(req.app.locals.credential);
	}
}

export default new authController();
