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

  await db.exec("DROP TABLE todo");

  await db.exec(
    "CREATE TABLE todo (id INT, content TEXT, is_check BOOLEAN, created_at TEXT)"
  );

  await createTodo("aa", false, "2021-05-26T11:51:05.097Z");
  await createTodo("bb", false, "2021-05-30T12:41:05.097Z");
  await createTodo("cc", false, "2021-06-10T13:31:05.097Z");
  await createTodo("dd", false, "2021-06-20T14:21:05.097Z");
  await createTodo("ee", false, "2021-07-10T15:11:05.097Z");
  await createTodo("ff", false, "2021-07-20T16:01:05.097Z");
})();

export default openDb;
