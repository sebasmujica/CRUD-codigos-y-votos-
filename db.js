const Database = require("better-sqlite3");


const db = new Database("data.db");
db.pragma("foreing_keys = ON");

db.exec(`
    CREATE TABLE IF NOT EXISTS temas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tema TEXT NOT NULL,
    votos INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS enlaces(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tema_id TEXT NOT NULL,
    titulo TEXT NOT NULL,
    url TEXT NOT NULL,
    votos INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (tema_id) REFERENCES temas(id) ON DELETE CASCADE
    );
    `)

module.exports = db;