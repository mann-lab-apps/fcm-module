import { db } from "../db/sqlite";

export const writeConcert = (title, price) => {
  const stmt = db.prepare("INSERT INTO concerts (title, price) VALUES (?, ?)");
  const result = stmt.run(title, price);
  console.log("result", result);
  return { id: result.lastInsertRowid, title, price };
};

// // controller.js
// import db from "./db/sqlite.js";

// // CREATE
// export function createUser(name, age) {
//   const stmt = db.prepare("INSERT INTO users (name, age) VALUES (?, ?)");
//   const result = stmt.run(name, age);
//   return { id: result.lastInsertRowid, name, age };
// }

// // READ (one)
// export function getUser(id) {
//   const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
//   return stmt.get(id); // 없으면 undefined 반환
// }

// // READ (all)
// export function getAllUsers() {
//   const stmt = db.prepare("SELECT * FROM users");
//   return stmt.all();
// }

// // UPDATE
// export function updateUser(id, name, age) {
//   const stmt = db.prepare("UPDATE users SET name = ?, age = ? WHERE id = ?");
//   stmt.run(name, age, id);

//   return getUser(id); // 수정된 데이터 반환
// }

// // DELETE
// export function deleteUser(id) {
//   const stmt = db.prepare("DELETE FROM users WHERE id = ?");
//   stmt.run(id);

//   return { success: true };
// }
