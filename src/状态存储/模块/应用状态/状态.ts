export type I主题 = "light" | "dark" | "auto";

export type I语言 = "zh-CN" | "zh-TW" | "en-US";

export interface I应用状态 {
  主题: I主题;
  语言: I语言;
}
