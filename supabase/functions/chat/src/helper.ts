export type I历史对话 = {
  role: "user" | "assistant";
  content: string;
};
// 调用 chatgpt包 所需的参数
export interface IChatGPT请求体 {
  用户提问: string;
  历史对话?: I历史对话[];
  系统提示语?: string;
}
// chatgpt包 的错误码
export const 错误码字典: Record<string, string> = {
  401: "[OpenAI] 提供错误的API密钥 | Incorrect API key provided",
  403: "[OpenAI] 服务器拒绝访问，请稍后再试 | Server refused to access, please try again later",
  502: "[OpenAI] 错误的网关 |  Bad Gateway",
  503: "[OpenAI] 服务器繁忙，请稍后再试 | Server is busy, please try again later",
  504: "[OpenAI] 网关超时 | Gateway Time-out",
  500: "[OpenAI] 服务器繁忙，请稍后再试 | Internal Server Error",
  未知: "[OpenAI] 未知错误 | Unknown Error"
};

// openai客户端 所需的参数
export const Openai预设 = {
  apiKey: Deno.env.get("OPENAI_API_KEY"),
  嵌入向量模型: "text-embedding-ada-002"
};

// chatgpt客户端 所需的参数
export const ChatGPT预设 = {
  apiKey: Deno.env.get("OPENAI_API_KEY"),
  gpt模型: "gpt-3.5-turbo",
  超时毫秒: 30 * 1000
};

// supabase客户端 所需参数
export const supabase预设 = {
  url: Deno.env.get("SUPABASE_URL"),
  key: Deno.env.get("SUPABASE_ANON_KEY")
};

export type I问题背景 = "react" | "chatgpt";
// 根据不同的问题背景，配置不同的系统提示语，调用不同的rpc搜索函数
export const 问题背景字典: Record<I问题背景, { 系统提示语: string; rpc搜索函数名?: string }> = {
  react: {
    系统提示语: `你是一个react助手`,
    rpc搜索函数名: "react文档"
  },
  chatgpt: {
    系统提示语: `你好！我是你的ChatGPT机器人。我可以回答你的问题，提供建议和帮助你解决问题。请告诉我你的问题或需求，我会尽力提供最好的答案。请注意，我只是一台机器学习算法构建的程序，我的回答可能不完全准确或完整，但我会尽力为你提供有用的信息。`
  }
};

// supabase 边缘函数返回的匹配向量响应
export type I向量匹配响应 = {
  id: string;
  英文标题: string;
  中文内容: string;
  锚定链接: string;
  相似性: number;
};
