import { db } from "../db/sqlite.js";

export const writeConcert = (request, response) => {
  const { title, price } = request?.body;
  const stmt = db.prepare("INSERT INTO concerts (title, price) VALUES (?, ?)");
  const result = stmt.run(title, price);
  return response
    .status(200)
    .send({ id: result.lastInsertRowid, title, price });
};

export const getConcert = (request, response) => {
  const { id } = request.body;
  const stmt = db.prepare("SELECT * FROM concerts WHERE id = ?");
  return response.status(200).send(stmt.get(id));
};

export const getConcerts = (request, response) => {
  const stmt = db.prepare("SELECT * FROM concerts");
  return response.status(200).send(stmt.all());
};

export const updateConcert = (request, response) => {
  const { id, title, price } = request.body;
  console.log("id, title, price", id, title, price);
  const stmt = db.prepare(
    "UPDATE concerts SET title = ?, price = ? WHERE id = ?"
  );
  stmt.run(title, price, id);
  return response.status(200).send({ success: true });
};

export const deleteConcert = (request, response) => {
  const { id } = request.query;
  const stmt = db.prepare("DELETE FROM concerts WHERE id = ?");
  stmt.run(id);
  return response.status(200).send({ success: true });
};
