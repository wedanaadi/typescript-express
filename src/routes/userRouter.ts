import { auth } from "./../middleware/authMiddleware";
import userController from "../controller/userController";
import baseRouter from "./baseRouter";

class userRouter extends baseRouter {
	public routes(): void {
		this.router.get("/", auth, userController.index);
		this.router.post("/", auth, userController.create);
		this.router.get("/:id", auth, userController.show);
		this.router.put("/:id", auth, userController.update);
		this.router.delete("/:id", auth, userController.delete);
	}
}

export default new userRouter().router;
