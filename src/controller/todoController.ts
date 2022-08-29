import { Request, Response } from "express";
import todoService from "../services/todoService";
import iController from "./interfaceController";
const db = require("../db/models");

class todoController implements iController {
	index = async (req: Request, res: Response): Promise<Response> => {
		const service = new todoService(req);
		const todos = await service.getAll();
		return res.status(200).json({
			msg: "success",
			data: todos,
		});
	};
	create = async (req: Request, res: Response): Promise<Response> => {
		const service = new todoService(req);
		const todo = await service.store();
		return res.status(201).json({
			msg: "created",
			data: todo,
		});
	};
	update = async (req: Request, res: Response): Promise<Response> => {
		const service = new todoService(req);
		await service.update();
		const todo = await service.findById();

		return res.status(200).json({
			msg: "success find",
			data: todo,
		});
	};
	delete = async (req: Request, res: Response): Promise<Response> => {
		const service = new todoService(req);
		const todo = await service.delete();

		return res.status(200).json({ msg: "deleted" });
	};
	show = async (req: Request, res: Response): Promise<Response> => {
		const service = new todoService(req);
		const todo = await service.findById();

		return res.status(200).json({
			msg: "success find",
			data: todo,
		});
	};
}

export default new todoController();
