// // 官方库不支持流
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

import { 是否非空字符串 } from "./is.ts";

import { Openai预设 } from "./helper.ts";

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
