import { ref } from "vue";
import { 会话的状态存储 } from "@/状态存储";
import { I内容块, 对话_api } from "@/接口";
import { storeToRefs } from "pinia";

const { 新增用户提问, 新增ai回复, 修改上一次对话id } = 会话的状态存储();
const { 缓存的ai回复, 当前会话 } = storeToRefs(会话的状态存储());

export const 使用_流下载 = () => {
  const 用户提问 = ref<string>("");

  const 处理发送对话 = async () => {
    const 缓存用户提问 = 用户提问.value;
    if (缓存的ai回复.value.状态 !== "空闲") return;

    新增用户提问(缓存用户提问);

    缓存的ai回复.value.状态 = "等待回复";
    用户提问.value = "";

    await 对话_api({
      问题背景: 当前会话.value?.问题背景 ?? "chatgpt",
      上次对话id: 当前会话.value?.上一次对话id,
      用户提问: 缓存用户提问,
      处理器: ({ event }) => {
        // 截取已下载文本的最后一个json
        const xhr = event.target;
        const { responseText: 已下载的文本 } = xhr;
        const lastIndex = 已下载的文本.lastIndexOf("\n", 已下载的文本.length - 2);
        let chunk = 已下载的文本;
        if (lastIndex !== -1) chunk = 已下载的文本.substring(lastIndex);
        const 内容块 = JSON.parse(chunk) as I内容块;
        if (内容块.类型 == "参考资料") {
          console.log("内容块.数据", 内容块.数据);
          缓存的ai回复.value.状态 = "等待回复";
          缓存的ai回复.value.参考资料 = 内容块.数据;
        } else if (内容块.类型 == "回复") {
          缓存的ai回复.value.状态 = "正在回复";
          缓存的ai回复.value.内容 += 内容块.数据;
        } else if (内容块.类型 == "对话id") {
          缓存的ai回复.value.状态 = "空闲";
          新增ai回复(缓存的ai回复.value.内容, 缓存的ai回复.value.参考资料);
          缓存的ai回复.value.内容 = "";
          缓存的ai回复.value.状态 = "空闲";
          缓存的ai回复.value.参考资料 = [];
          修改上一次对话id(内容块.数据);
        }
      }
    });
  };

  return { 用户提问, 处理发送对话 };
};
