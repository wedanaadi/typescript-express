import authController from "../controller/authController";
import validate from "../middleware/authValidator";
import baseRouter from "./baseRouter";

class authRouter extends baseRouter {
	public routes(): void {
		this.router.post("/register", validate, authController.register);
		this.router.post("/login", authController.login);
		this.router.post("/logout", authController.logout);
	}
}

export default new authRouter().router;
