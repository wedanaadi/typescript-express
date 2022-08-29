import authController from "../controller/authController";
import validate from "../middleware/authValidator";
import baseRouter from "./baseRouter";
import { auth } from "./../middleware/authMiddleware";

class authRouter extends baseRouter {
	public routes(): void {
		this.router.post("/register", validate, authController.register);
		this.router.post("/login", authController.login);
		this.router.post("/logout", authController.logout);
		this.router.get("/profile", auth, authController.profile);
	}
}

export default new authRouter().router;
