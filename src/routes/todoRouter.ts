import { auth } from "./../middleware/authMiddleware";
import todoController from "../controller/todoController";
import baseRouter from "./baseRouter";
import validate from "../middleware/todoValidator";

class todoRouter extends baseRouter {
	public routes(): void {
		this.router.get("/", auth, todoController.index);
		this.router.post("/", auth, validate, todoController.create);
		this.router.get("/:id", auth, todoController.show);
		this.router.put("/:id", auth, validate, todoController.update);
		this.router.delete("/:id", auth, todoController.delete);
	}
}

export default new todoRouter().router;
