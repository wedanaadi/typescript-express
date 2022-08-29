import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Authentication {
	public static passwordHash = (password: string): Promise<string> => {
		return bcrypt.hash(password, 10);
	};

	public static passwordCompare = async (
		text: string,
		encryptText: string
	): Promise<boolean> => {
		const result = await bcrypt.compare(text, encryptText);
		return result;
	};

	public static generateToken(
		id: number,
		username: string,
		loginTime: number
	): string {
		const secretKey: string = process.env.JWT_SECRET_KEY || "SECRET";
		const token = jwt.sign({ id, username, loginTime }, secretKey);
		return token;
	}
}

export default Authentication;
