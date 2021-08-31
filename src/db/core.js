import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { createTodo } from "./todoDB";

export async function openDb() {
  return open({
    filename: "/tmp/database.db",
    driver: sqlite3.Database,
  });
}

(async () => {
  const db = await openDb();

  db.exec(
    "CREATE TABLE IF NOT EXISTS todo (id INT, content TEXT, is_check BOOLEAN, created_at TEXT, updated_at TEXT)"
  );

  await createTodo("aa");
})();

export default openDb;
