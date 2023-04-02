// 流式openai
import { getCompletionStream } from "https://deno.land/x/openai_chat_stream/mod.ts";
import { 是否非空字符串 } from "./is.ts";
import { ChatGPT预设, IChatGPT请求体, 问题背景字典 } from "./helper.ts";

export const ChatGPT流回复 = async (请求体: IChatGPT请求体) => {
  const { 用户提问, 历史对话, 问题背景 } = 请求体;
  if (是否非空字符串(ChatGPT预设.apiKey)) {
    const stream = getCompletionStream({
      apiKey: ChatGPT预设.apiKey,
      messages: [
        {
          role: "system",
          content: 问题背景字典[问题背景].系统提示语
        },
        ...历史对话,
        {
          role: "user",
          content: 用户提问
        }
      ]
    });
    return stream;
  } else {
    throw new Error("未配置 OPENAI_API_KEY");
  }
};
