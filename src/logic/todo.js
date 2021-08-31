import * as db from "../db";

export const createTodo = async (content) => {
  db.createTodo(content);
};

export const getTodoList = async () => {
  const todoList = db.getAllTodo();
  return todoList;
};
