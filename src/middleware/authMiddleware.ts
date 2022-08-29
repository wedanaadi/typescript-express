import { Response, Request, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
	let isLogin: boolean = false;
	if (isLogin) {
		next();
	} else {
		res.status(422).json({ msg: "unauthorized access" });
	}
};
