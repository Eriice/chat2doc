import express from "express";
import chatRouter from "./路由器/对话";

const app = express();

app.all("*", (_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "authorization, Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(express.json());

app.use("/chat", chatRouter);
app.get("/", (req, res) => {
  res.write("Hello World!");
});

app.listen(9528, () => globalThis.console.log("Server is running on port 9528"));
