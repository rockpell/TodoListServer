import express from "express";
import { getTodoList } from "../logic/todo";

const router = express.Router();

router.post("/", async (req, res) => {});

router.get("/", async (req, res) => {
  const todoList = getTodoList();

  res.status(200).json({ count: todoList.length, todoList: todoList });
});

export default router;
