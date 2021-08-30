import express from "express";
import { getTodoList } from "../logic/todo";

const router = express.Router();

// todo 생성
router.post("/", async (req, res) => {
  res.status(200).json({ content: "" });
});

// todo 리스트 불러오기
router.get("/", async (req, res) => {
  const todoList = await getTodoList();

  res.status(200).json({ count: todoList.length, todoList: todoList });
});

// todo 내용 수정 및 체크
router.post("/:id", async (req, res) => {
  // 수정
  res.status(200).json({ msg: "", content: "" });

  // 체크
  res.status(200).json({ msg: "" });
});

router.delete("/:id", async (req, res) => {
  res.status(200).json({ msg: "" });
});

export default router;
