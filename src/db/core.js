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

  await db.exec(
    "CREATE TABLE IF NOT EXISTS todo (id INT, content TEXT, is_check BOOLEAN, created_at TEXT)"
  );

  await createTodo("aa", false, "2021-05-26T11:51:05.097Z");
})();

export default openDb;
