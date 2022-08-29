import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction): any => {
	if (!req.headers.authorization) {
		res.status(401).json({ msg: "unauthorized access" });
	}
	let secretKey: string = process.env.JWT_SECRET_KEY || "SECRET";
	const token = req.headers.authorization?.split(" ")[1] ?? "";

	try {
		const credential: string | object = jwt.verify(token, secretKey);

		if (credential) {
			req.app.locals.credential = credential;
			return next();
		}
	} catch (error) {
		return res.send(error);
	}
};
