import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(morgan("common"));
app.use(express.json());

app.get("*", (req: any, res: any) => {
  res.send("not found");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("server error!");
});

app.listen(8080, () => {
  console.log("Running...");
});
