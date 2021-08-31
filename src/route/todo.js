import express from "express";
import * as todoLogic from "../logic/todo";

const router = express.Router();

// todo 생성
// req content: string
// res msg: string
router.post("/", async (req, res) => {
  try {
    const { content } = req.body;

    await todoLogic.createTodo(content);
    res.status(200).json({ msg: "생성 성공" });
  } catch (err) {
    res.status(500).json({ msg: "생성 실패" });
  }
});

// todo 리스트 불러오기
router.get("/", async (req, res) => {
  const todoList = await todoLogic.getTodoList();

  res.status(200).json({ count: todoList.length, todoList: todoList });
});

// todo 내용 수정
// req content: string
// res msg: string, content: string

// todo 체크
// req isCheck: boolean
// res ms: string
router.post("/:id", async (req, res) => {
  // 수정
  res.status(200).json({ msg: "", content: "" });

  // 체크
  res.status(200).json({ msg: "" });
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const isDelete = await todoLogic.deleteTodo(id);

    if (!isDelete) throw { msg: "존재하지 않는 id" };

    res.status(200).json({ msg: "삭제 성공" });
  } catch (err) {
    res.status(500).json({ msg: err?.msg });
  }
});

export default router;
