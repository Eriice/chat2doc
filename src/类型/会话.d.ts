// 会话就是一系列对话的聚合
declare namespace N会话 {
  interface I会话 {
    id: string;
    问题背景: I问题背景;
    标题: string;
    对话列表: I对话[];
    创建时间: string;
  }

  // 问题背景是预设的背景知识
  type I问题背景 = "vue" | "react" | "angular" | null;
  type I角色 = "用户" | "ai";

  // 每一个问题/回复就是一个对话，对话列表构成会话
  interface I对话 {
    id: string;
    角色: I角色;
    创建时间: string;
    内容: string;
    参考资料?: I参考资料[];
  }

  interface I参考资料 {
    id: string;
    标题: string;
    锚定链接: string;
    内容: string;
  }
}
