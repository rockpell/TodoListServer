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
