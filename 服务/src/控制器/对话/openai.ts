import { Configuration, OpenAIApi } from "openai";
import { 是否非空字符串 } from "src/工具函数/类型判断";

import { Openai预设 } from "./帮助函数";

let openai: OpenAIApi;
(async () => {
  if (是否非空字符串(Openai预设.apiKey)) {
    openai = new OpenAIApi(
      new Configuration({
        apiKey: Openai预设.apiKey
      })
    );
  } else {
    throw new Error("未配置 OPENAI_API_KEY");
  }
})();

export const OpenAI向量化 = async (用户提问: string) => {
  return await openai.createEmbedding({
    model: Openai预设.嵌入向量模型,
    input: 用户提问
  });
};
