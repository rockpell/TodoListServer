import express from "express";
import morgan from "morgan";
import cors from "cors";
import { openDb } from "./db";
import todoRouter from "./route/todo";

const app = express();

openDb();
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("common"));
app.use(express.json());

app.use("/todo", todoRouter);

app.get("*", (req, res) => {
  res.send("not found");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("server error!");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Running... port ${port}`);
});
