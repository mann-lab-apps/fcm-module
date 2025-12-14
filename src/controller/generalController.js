import { db } from "../db/sqlite.js";

export const getTables = (request, response) => {
  const stmt = db.prepare(`
    SELECT name
    FROM sqlite_master
    WHERE type='table'
    ORDER BY name
    `);
  return response.status(200).send(stmt.all());
};
