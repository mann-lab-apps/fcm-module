import { writeConcert } from "./controller/concertsController";
import { db } from "./db/sqlite";
import { app } from "./server";

const onRunning = async () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS concerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP 
    )
  `);

  writeConcert("CONCERT", "3000");
};

app.listen(8000, onRunning);
