const db = require("../db/models");

class todoRepository {
	private model = db.todo;

	findAll = async (userId: number) => {
		const todos = await this.model.findAll({
			where: {
				user_id: userId,
			},
			attributes: ["id", "description"],
		});
		return todos;
	};

	insert = async (data: object) => {
		const todo = await this.model.create(data);
		return todo;
	};

	update = async (data: object, id: any, userId: any) => {
		const todo = await this.model.update(data, {
			where: { id, user_id: userId },
		});
		return todo;
	};

	findOne = async (id: any, userId: any) => {
		const todo = await this.model.findOne({
			where: { id, user_id: userId },
			attributes: ["id", "user_id", "description"],
		});

		return todo;
	};

	destroy = async (id: any, userId: any) => {
		const todo = await db.todo.destroy({
			where: { id, user_id: userId },
		});

		return todo;
	};
}

export default todoRepository;
