import { ChatGPT流回复 } from "./chatgpt";
import { OpenAI向量化 } from "./openai";
import { 向量搜索 } from "./supabase";
import { I向量匹配响应, 问题背景 as I问题背景, 问题背景字典 } from "./帮助函数";
import { ChatMessage } from "chatgpt";

type I请求体 = {
  用户提问: string;
  上次对话id?: string;
  问题背景: I问题背景;
};

export const 对话 = async (req, res) => {
  res.setHeader("Content-type", "application/octet-stream");
  try {
    const { 用户提问, 上次对话id, 问题背景 = "chatgpt" } = req.body as I请求体;
    console.log("用户提问", 用户提问, 上次对话id, 问题背景);

    const 参考资料列表 = await 向量匹配(用户提问, 问题背景);
    res.write(
      `${JSON.stringify({
        类型: "参考资料",
        数据: 参考资料列表
      })}\n`
    );

    const 响应 = await ChatGPT流回复({
      用户提问,
      上次对话id: 上次对话id,
      系统提示语: 问题背景字典[问题背景].系统提示语,
      process: (chat: ChatMessage) => {
        if (chat.delta) {
          const 对话块 = {
            类型: "回复",
            数据: chat.delta
          };
          res.write(`${JSON.stringify(对话块)}\n`);
        }
      }
    });
    if (响应.业务码 == "成功") {
      res.write(
        `${JSON.stringify({
          类型: "对话id",
          数据: 响应.数据.id
        })}\n`
      );
    }
  } catch (error) {
    console.log("err", error);
    res.write(JSON.stringify(error));
  } finally {
    res.end();
  }
};

const 向量匹配 = async (用户提问, 问题背景: I问题背景) => {
  console.time("向量匹配");
  if (问题背景 === "chatgpt") return [];

  if (Reflect.has(问题背景字典, 问题背景)) {
    // 1. 将用户提问向量化
    const {
      data: {
        data: [{ embedding: 嵌入向量 }]
      }
    } = await OpenAI向量化(用户提问);
    // 2. 通过嵌入向量(embedding)寻找匹配内容
    const { data: 参考资料列表, error: 错误 } = await 向量搜索(问题背景, 嵌入向量);
    console.time("向量匹配");
    return 参考资料列表 as I向量匹配响应[];
  }
  return [];
};
