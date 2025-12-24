import "dotenv/config"; // ← 최상단, 절대 밑으로 내리지 말 것

import { db } from "./db/sqlite.js";
import { app } from "./server.js";
import { scrapSACConcerts } from "./controller/concertsController.js";

const onRunning = async () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS concerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP 
    )
  `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        name TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
    )
  `);
  // db.exec(`
  //   CREATE TABLE IF NOT EXISTS tests (
  //   id INTEGER PRIMARY KEY AUTOINCREMENT,
  //   title TEXT NOT NULL,
  //   content TEXT NOT NULL,
  //   created_at TEXT DEFAULT CURRENT_TIMESTAMP
  //   )
  // `);
  await scrapSACConcerts();
};

app.listen(8000, onRunning);
