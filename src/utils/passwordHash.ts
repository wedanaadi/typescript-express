import bcrypt from "bcrypt";

class passwordHash {
	public static hash = (password: string): Promise<string> => {
		return bcrypt.hash(password, 10);
	};
}

export default passwordHash;
