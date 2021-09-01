import openDB from "./core";

let todoId = 1;

export const createTodo = async (
  content,
  isCheck = false,
  createdAt = new Date().toISOString(),
  updatedAt = new Date().toISOString()
) => {
  const db = await openDB();

  await db.run(
    "INSERT INTO todo VALUES (?, ?, ?, ?, ?)",
    todoId++,
    content,
    isCheck,
    createdAt,
    updatedAt
  );
  return { id: todoId - 1, content, createdAt };
};

export const getTodo = async (id) => {
  const db = await openDB();
  const todo = await db.get("SELECT * from todo WHERE id = ?", id);

  return todo;
};

export const getAllTodo = async () => {
  const db = await openDB();

  const todos = await db.all("SELECT * FROM todo");

  return todos;
};

export const editTodo = async (id, content, isCheck) => {
  const db = await openDB();

  const todo = await getTodo(id);

  const updateQuery = "UPDATE todo ";
  const whereQuery = "WHERE id = ?";
  let setQuery = "SET updated_at = ?, ";

  if (content && isCheck) setQuery += "content = ?, is_check = ?";
  else if (content) setQuery += "content = ?";
  else if (isCheck) setQuery += "is_check = ?";

  if (todo) {
    const query = updateQuery + setQuery + whereQuery;
    const nowTime = new Date().toISOString();

    try {
      if (content && isCheck)
        await db.run(query, nowTime, content, isCheck, id);
      else if (content) await db.run(query, nowTime, content, id);
      else if (isCheck) await db.run(query, nowTime, isCheck, id);
    } catch (err) {
      console.error(err);
      return false;
    }

    return true;
  } else {
    return false;
  }
};

export const deleteTodo = async (id) => {
  const db = await openDB();

  const todo = await getTodo(id);

  if (todo) {
    try {
      await db.run("DELETE FROM todo where id = ?", id);
    } catch (err) {
      console.error(err);
      return null;
    }
    return todo;
  } else {
    return null;
  }
};
