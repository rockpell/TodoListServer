import { getAllTodo } from "../db";

export const getTodoList = async () => {
  const todoList = getAllTodo();
  return todoList;
};
