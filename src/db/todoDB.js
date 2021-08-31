import openDb from "./core";

let todoId = 1;

export const createTodo = async (
  content,
  isCheck = false,
  createdAt = new Date().toDateString()
) => {
  const db = await openDb();

  await db.run(
    "INSERT INTO todo VALUES (?, ?, ?, ?)",
    todoId++,
    content,
    isCheck,
    createdAt
  );
};

export const getAllTodo = async () => {
  const db = await openDb();

  const todos = await db.all("SELECT * FROM todo");

  return todos;
};

export const deleteTodo = async (id) => {
  const db = await openDb();

  const todo = await db.get("SELECT id from todo WHERE id = ?", id);

  if (todo) {
    await db.run("DELETE FROM todo where id = ?", id);
    return true;
  } else {
    return false;
  }
};
