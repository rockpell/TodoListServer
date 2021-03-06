import * as db from "../db";

export const createTodo = async (content) => {
  const todo = db.createTodo(content);
  return todo;
};

export const getTodo = async (id) => {
  const todo = db.getTodo(id);
  return todo;
};

export const getTodoList = async () => {
  const todoList = db.getAllTodo();
  return todoList;
};

export const deleteTodo = async (id) => {
  return db.deleteTodo(id);
};

export const editTodo = async (id, content, isCheck) => {
  return db.editTodo(id, content, isCheck);
};
