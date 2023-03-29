import { nanoid } from "nanoid";

export const 获取默认会话 = (): N会话.I会话 => {
  const id = nanoid();
  return {
    id,
    问题背景: null,
    标题: "准备对话...",
    对话列表: [],
    创建时间: new Date().toISOString()
  };
};

export type I用户提问 = {
  内容: string;
  角色: "用户";
};

export type Iai回复 = {
  内容: string;
  参考资料?: N会话.I参考资料[];
  角色: "ai";
};

export type Iai回复缓存 = {
  内容: string;
  状态: "空闲" | "等待回复" | "正在回复";
  参考资料: N会话.I参考资料[];
};
