import { Request, Response } from "express";
import iController from "./interfaceController";

let dummy: any[] = [
	{ id: 1, name: "adi" },
	{ id: 2, name: "Budi" },
	{ id: 3, name: "Cadi" },
];

class userController implements iController {
	index(req: Request, res: Response): Response {
		return res.status(200).json({
			data: dummy,
			msg: "success",
		});
	}
	create(req: Request, res: Response): Response {
		const { id, name } = req.body;
		dummy.push({ id, name });
		return res.send(dummy);
	}
	update(req: Request, res: Response): Response {
		const { id } = req.params;
		const { name } = req.body;

		let data = dummy.find((item) => item.id === parseInt(id));
		data.name = name;
		return res.send(data);
	}
	delete(req: Request, res: Response): Response {
		const { id } = req.params;
		let person = dummy.filter((item) => item.id !== parseInt(id));
		dummy = person;
		return res.send(person);
	}
	show(req: Request, res: Response): Response {
		const { id } = req.params;
		let data = dummy.find((item) => item.id === parseInt(id));
		return res.send(data);
	}
}

export default new userController();
