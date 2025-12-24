import bcrypt from "bcrypt";
import { db } from "../db/sqlite.js";

export const registerUser = async (request, response) => {
  const { email, password, name } = request.body;

  if (!email || !password || !name) {
    return response.status(400).json({ message: "필수 값 누락" });
  }

  try {
    const searchUserStmt = await db.prepare(
      "SELECT id FROM users WHERE email = ?"
    );
    const existingUser = searchUserStmt.get(email);
    console.log("existingUser", existingUser);

    if (existingUser) {
      return response
        .status(409)
        .json({ message: "이미 회원가입 된 이메일입니다." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const stmt = await db.prepare(
      `
      INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)
      `
    );
    const result = stmt.run(email, passwordHash, name);
    return response.status(201).json({
      id: result.lastId,
      email,
      name,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "서버 오류", error });
  }
};
