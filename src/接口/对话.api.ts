import axios, { AxiosProgressEvent } from "axios";

interface 响应 {
  id: string;
  回答: string;
  参考资料: {
    id: string;
    中文内容: string;
    标题: string;
    相似性: number;
    锚定链接: string;
  }[];
}

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export type I内容块 =
  | {
      类型: "参考资料";
      数据: N会话.I参考资料[];
    }
  | {
      类型: "回复" | "对话id";
      数据: string;
    };

export const 对话_api = async (请求参数: {
  用户提问: string;
  上次对话id?: string;
  问题背景: N会话.I问题背景;
  处理器?: (处理事件: AxiosProgressEvent) => void;
}) => {
  const { 用户提问, 上次对话id, 问题背景, 处理器 } = 请求参数;
  const 响应 = axios
    .post<响应>(
      "/api/chat",
      { 用户提问, 上次对话id, 问题背景 },
      {
        onDownloadProgress: 处理器
      }
    )
    .then(响应体 => {
      return 响应体.data;
    })
    .catch(error => {
      console.error(error);
    });
  return 响应;
};

export const 侦听事件源url = `https://thcgyowjhxyudcanneoi.functions.supabase.co/chat`;
