import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

import { 向量搜索 } from "./src/supabase.ts";
import { OpenAI向量化 } from "./src/embedding.ts";
import { ChatGPT流回复 } from "./src/chatgpt.ts";
import { I问题背景, 问题背景字典, I向量匹配响应, I历史对话 } from "./src/helper.ts";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

type I请求体 = {
  用户提问: string;
  历史对话?: I历史对话[];
  问题背景?: I问题背景;
};

type I响应体 =
  | {
      类型: "参考资料";
      内容: I向量匹配响应[];
    }
  | {
      类型: "回复";
      内容: string;
    };

serve(async req => {
  // 处理 CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { 用户提问, 历史对话, 问题背景 = "chatgpt" } = (await req.json()) as I请求体;
  const 参考资料列表 = await 向量匹配(用户提问, 问题背景);
  const 流回复 = await ChatGPT流回复({ 用户提问, 历史对话, 问题背景 });

  const encoder = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      if (问题背景 !== "chatgpt") {
        const 响应体: I响应体 = {
          类型: "参考资料",
          内容: 参考资料列表
        };
        const sse数据 = `data: ${JSON.stringify(响应体)}\n\n`;
        const chunk = encoder.encode(sse数据);
        controller.enqueue(chunk);
      }

      for await (const token of 流回复) {
        const 响应体 = {
          类型: "回复",
          内容: token
        };
        const sse数据 = `data: ${JSON.stringify(响应体)}\n\n`;
        const chunk = encoder.encode(sse数据);
        controller.enqueue(chunk);
      }

      // 发送 "完成" 事件
      const doneEvent = `event: 完成\ndata: {}\n\n`;
      const doneChunk = encoder.encode(doneEvent);
      controller.enqueue(doneChunk);

      // 关闭流
      controller.close();
    }
  });

  return new Response(body, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/event-stream"
    }
  });
});

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
    console.timeEnd("向量匹配");
    return 参考资料列表 as I向量匹配响应[];
  }
  return [];
};
