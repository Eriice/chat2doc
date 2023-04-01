import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.5.0";
import { 是否非空字符串 } from "./is.ts";
import { supabase预设, 问题背景字典 } from "./helper.ts";

let supabase客户端: SupabaseClient;
(async () => {
  if (是否非空字符串(supabase预设.url) && 是否非空字符串(supabase预设.key)) {
    supabase客户端 = createClient(supabase预设.url ?? "", supabase预设.key ?? "");
  } else {
    throw new Error("未配置 supabase");
  }
})();

// 根据问题背景判断使用哪个rpc函数
export const 向量搜索 = async (问题背景: string, 嵌入向量: number[]) => {
  return await supabase客户端.rpc(问题背景字典[问题背景].rpc搜索函数名, {
    query_embedding: 嵌入向量,
    similarity_threshold: 0.4, // 选择
    match_count: 1 // 选择匹配数
  });
};
