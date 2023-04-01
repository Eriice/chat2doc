import { 状态存储枚举 } from "@/状态存储/状态存储枚举";
import { useStorage } from "@vueuse/core";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { I用户提问, Iai回复, 获取默认会话, Iai回复缓存 } from "./帮助函数";

const 会话列表的本地存储 = "会话列表";
const 当前会话id的本地存储 = "当前会话id";

export const 会话的状态存储 = defineStore(状态存储枚举.对话管理状态存储, () => {
  const 会话列表 = useStorage<N会话.I会话[]>(会话列表的本地存储, []);
  const 当前会话id = useStorage<string | null>(当前会话id的本地存储, null);
  const 缓存的ai回复 = ref<Iai回复缓存>({ 内容: "", 状态: "空闲", 参考资料: [] });

  const 当前会话 = computed(() => {
    const 当前对话管理 = 会话列表.value.find(item => item.id === 当前会话id.value) || null;
    return 当前对话管理;
  });

  /* 会话的增删改查开始 */
  const _根据id获取会话 = (id: string) => {
    return 会话列表.value.find(item => item.id === id) || null;
  };

  const 切换当前会话 = (id: string | null) => {
    当前会话id.value = id;
  };

  const 新增会话 = (会话标题: string, 问题背景: N会话.I问题背景) => {
    const 默认新增的会话 = 获取默认会话();
    默认新增的会话.标题 = 会话标题;
    默认新增的会话.问题背景 = 问题背景;
    会话列表.value.push(默认新增的会话);
    // 切换到新增的会话中
    切换当前会话(默认新增的会话.id);
    return 默认新增的会话.id;
  };

  const 删除会话 = (id: string) => {
    const 新的会话列表 = 会话列表.value.filter(item => item.id !== id);
    const 被删idx = 会话列表.value.findIndex(item => item.id === id);
    会话列表.value = 新的会话列表;
    let 待切换id = null;
    if (被删idx == 会话列表.value.length) {
      // 若被删除的会话是最后一个，则切换到前一个会话
      待切换id = 会话列表.value[被删idx - 1]?.id || null;
    } else {
      // 若被删除的会话不是最后一个，则切换到后一个会话
      待切换id = 会话列表.value[被删idx].id;
    }
    切换当前会话(待切换id);
  };

  const 修改上一次对话id = (id: string) => {
    当前会话.value!.上一次对话id = id;
  };

  const 清空会话 = () => {
    console.log("暂时不做");
  };
  /* 会话的增删改查结束 */

  /* 对话的增删改查开始 */
  const 新增用户提问 = (内容: string) => {
    _新增对话({
      内容,
      角色: "用户"
    });
  };

  const 新增ai回复 = (回复: string, 参考资料: N会话.I参考资料[]) => {
    return _新增对话({
      内容: 回复,
      角色: "ai",
      参考资料
    });
  };

  const _新增对话 = (对话内容: I用户提问 | Iai回复) => {
    // 若不存在会话，则新增一个会话
    let id = 当前会话id.value;
    if (id === null) {
      id = 新增会话("ChatGPT 3.5", "chatgpt");
    }
    // 若存在会话，则新增对话，并且返回对话id
    const 会话 = _根据id获取会话(id)!;

    const 对话: N会话.I对话 = {
      id: nanoid(),
      创建时间: new Date().toISOString(),
      ...对话内容
    };
    会话.对话列表.push(对话);

    // 返回的id主要是提供给ai回复使用，因为ai回复是流，在流返回时需要修改内容
    return 对话.id;
  };

  /* 对话的增删改查结束 */

  return {
    会话列表,
    当前会话id,
    当前会话,
    缓存的ai回复,
    切换当前会话,
    新增会话,
    修改上一次对话id,
    删除会话,
    清空会话,
    新增用户提问,
    新增ai回复
  };
});
