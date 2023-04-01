import { ref, toRaw } from "vue";
import { SSE } from "sse.js";
import { 会话的状态存储 } from "@/状态存储";
import { storeToRefs } from "pinia";
import { 侦听事件源url } from "@/接口";

const { 新增用户提问, 新增ai回复, 修改上一次对话id } = 会话的状态存储();
const { 缓存的ai回复, 当前会话 } = storeToRefs(会话的状态存储());

export const 使用_事件源 = () => {
  const 用户提问 = ref<string>("");

  const 处理发送对话 = () => {
    const 缓存用户提问 = 用户提问.value;
    if (缓存的ai回复.value.状态 !== "空闲") return;

    const 历史对话列表 = toRaw(当前会话.value?.对话列表) ?? [];

    新增用户提问(缓存用户提问);
    缓存的ai回复.value.状态 = "等待回复";
    用户提问.value = "";

    const 历史对话 = 历史对话列表.map(item => {
      return {
        role: item.角色 == "ai" ? "assistant" : "user",
        // OpenAI推荐使用空格替换换行符以获得最佳结果
        content: item.内容.replace(/\n/g, " ")
      };
    });

    const 事件源 = new SSE(侦听事件源url, {
      headers: { "Content-Type": "text/plain" },
      payload: JSON.stringify({
        用户提问: 缓存用户提问,
        问题背景: 当前会话.value?.问题背景 ?? "chatgpt",
        历史对话
      })
    });
    缓存的ai回复.value.状态 = "等待回复";

    // 监听自定义的"done" 事件
    事件源.addEventListener("完成", () => {
      console.log("所有事件已发送完毕");
      新增ai回复(缓存的ai回复.value.内容, 缓存的ai回复.value.参考资料);
      _关闭链接(事件源);
    });

    事件源.addEventListener("message", event => {
      const dataEvent = event as unknown as MessageEvent<any>;
      const data = JSON.parse(dataEvent.data);
      console.log("data", data);
      if (data.类型 == "参考资料") {
        缓存的ai回复.value.参考资料 = data.内容;
      } else {
        缓存的ai回复.value.内容 = 缓存的ai回复.value.内容 + data.内容;
        缓存的ai回复.value.状态 = "正在回复";
      }
    });

    事件源.addEventListener("close", () => {
      _关闭链接(事件源);
    });

    事件源.addEventListener("error", event => {
      console.error("发生错误:", event);
      _关闭链接(事件源);
    });

    事件源.stream();
  };

  const _关闭链接 = (事件源: SSE) => {
    缓存的ai回复.value.状态 = "空闲";
    缓存的ai回复.value.内容 = "";
    缓存的ai回复.value.参考资料 = [];
    事件源.close();
  };

  return { 用户提问, 处理发送对话 };
};
