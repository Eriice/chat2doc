interface I响应体<T = unknown> {
  业务码: "成功" | "失败";
  业务信息?: string;
  数据?: T;
}

// 优化响应格式
export const 处理响应体 = <T = unknown>(响应体: I响应体<T>) => {
  if (响应体.业务码 == "成功") {
    return Promise.resolve({
      业务码: 响应体.业务码,
      业务信息: 响应体.业务信息 ?? null,
      数据: 响应体.数据 ?? null
    });
  } else {
    return Promise.reject({
      业务码: 响应体.业务码,
      业务信息: 响应体.业务信息 ?? "失败",
      数据: 响应体.数据 ?? null
    });
  }
};
