import sqlite3 from "sqlite3";
import path from "path";

const db = new sqlite3.Database(path.join(process.cwd(), "todos.db"), (err) => {
  if (err) {
    console.log("SQLite is Working(Did Not Opening Database)" + err.message);
  } else {
    db.run(
      "CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, completed BOOLEAN)",
      (err) => {
        if (err) {
          console.error("Error creating table " + err.message);
        }
      }
    );
    console.log("Database is Running");
  }
});

export default db;
