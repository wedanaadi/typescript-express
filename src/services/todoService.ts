import { Request } from "express";
import todoRepository from "../repositories/todoRepository";
const db = require("../db/models");

class todoService {
	credential: {
		id: number;
	};
	body: Request["body"];
	params: Request["params"];

	constructor(req: Request) {
		this.credential = req.app.locals.credential;
		this.body = req.body;
		this.params = req.params;
	}

	getAll = async () => {
		const repo = new todoRepository();
		const todos = repo.findAll(this.credential.id);
		return todos;
	};

	store = async () => {
		const { description } = this.body;
		const repo = new todoRepository();
		const todo = repo.insert({
			user_id: this.credential.id,
			description,
		});

		return todo;
	};

	findById = async () => {
		const { id } = this.params;
		const repo = new todoRepository();
		const todo = repo.findOne(id, this.credential.id);

		return todo;
	};

	update = async () => {
		const { id } = this.params;
		const { description } = this.body;

		const repo = new todoRepository();
		const todo = repo.update({ description }, id, this.credential.id);

		return todo;
	};

	delete = async () => {
		const { id } = this.params;

		const repo = new todoRepository();
		const todo = repo.destroy(id, this.credential.id);

		return todo;
	};
}

export default todoService;
