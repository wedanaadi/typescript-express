import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import iController from "./interfaceController";
const db = require("../db/models");

class todoController implements iController {
	index = async (req: Request, res: Response): Promise<Response> => {
		const { id } = req.app.locals.credential;
		const todos = await db.todo.findAll({
			where: {
				user_id: id,
			},
			attributes: ["id", "description"],
		});
		return res.status(200).json({
			msg: "success",
			data: todos,
		});
	};
	create = async (req: Request, res: Response): Promise<Response> => {
		const { id } = req.app.locals.credential;
		const { description } = req.body;
		const todo = await db.todo.create({
			user_id: id,
			description,
		});
		return res.status(201).json({
			msg: "created",
			data: todo,
		});
	};
	update = async (req: Request, res: Response): Promise<Response> => {
		const { id } = req.params;
		const { id: user_id } = req.app.locals.credential;
		const { description } = req.body;

		await db.todo.update(
			{ description },
			{
				where: { id, user_id },
			}
		);

		const todo = await db.todo.findOne({
			where: { id, user_id },
			attributes: ["id", "user_id", "description"],
		});

		return res.status(200).json({
			msg: "success find",
			data: todo,
		});
	};
	delete = async (req: Request, res: Response): Promise<Response> => {
		const { id } = req.params;
		const { id: user_id } = req.app.locals.credential;

		await db.todo.destroy({
			where: { id, user_id },
		});

		return res.status(200).json({ msg: "deleted" });
	};
	show = async (req: Request, res: Response): Promise<Response> => {
		const { id } = req.params;
		const { id: user_id } = req.app.locals.credential;

		const todo = await db.todo.findOne({
			where: { id, user_id },
			attributes: ["id", "user_id", "description"],
		});

		return res.status(200).json({
			msg: "success find",
			data: todo,
		});
	};
}

export default new todoController();
