import axios from "axios";

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

export const 对话_api = async (问题: string) => {
  const 响应 = axios
    .post<响应>("https://thcgyowjhxyudcanneoi.functions.supabase.co/hello-world", { 问题 }, config)
    .then(响应体 => {
      return 响应体.data;
    })
    .catch(error => {
      console.error(error);
    });
  return 响应;
};

// export const 侦听事件源 = (回调函数: (token: string) => void) => {

// };
export const 侦听事件源url = `https://thcgyowjhxyudcanneoi.functions.supabase.co/hello-world`;
