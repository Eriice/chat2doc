import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from "chatgpt";
import { 处理响应体 } from "src/工具函数/响应";
import { 是否非空字符串 } from "src/工具函数/类型判断";
import { ChatGPT预设, IChatGPT请求体, 错误码字典 } from "./帮助函数";

// 初始化客户端
let ChatGPT客户端: ChatGPTAPI | ChatGPTUnofficialProxyAPI;
(async () => {
  global.console.log("OPENAI_API_KEY", process.env.OPENAI_API_KEY);

  if (是否非空字符串(ChatGPT预设.apiKey)) {
    const ChatGPT配置 = {
      apiKey: ChatGPT预设.apiKey,
      completionParams: { model: ChatGPT预设.gpt模型 },
      debug: true
    };
    ChatGPT客户端 = new ChatGPTAPI({ ...ChatGPT配置 });
  } else {
    throw new Error("未配置 OPENAI_API_KEY");
  }
})();

export const ChatGPT流回复 = async (请求体: IChatGPT请求体) => {
  const { 用户提问, 上次对话id, process, 系统提示语 } = 请求体;
  try {
    // 配置请求参数
    const 请求参数 = {
      timeoutMs: ChatGPT预设.超时毫秒,
      systemMessage: 系统提示语,
      parentMessageId: 上次对话id
    };

    // 流式响应会分块返回数据
    const 响应 = await ChatGPT客户端.sendMessage(用户提问, {
      ...请求参数,
      onProgress: token => {
        process?.(token);
      }
    });

    // 和调用demo提供的分块函数不同，此处在流式处理后还可以返回响应体，响应数据是全量token
    return 处理响应体({ 业务码: "成功", 数据: 响应 });
  } catch (error: any) {
    const 响应码 = error.statusCode;
    global.console.log(error);
    if (Reflect.has(错误码字典, 响应码)) {
      return 处理响应体({ 业务码: "失败", 业务信息: 错误码字典[响应码] });
    }
    return 处理响应体({ 业务码: "失败", 业务信息: error.message ?? 错误码字典.未知错误 });
  }
};
