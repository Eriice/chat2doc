# Chat2Doc

![Chat2Doc banner](https://github.com/Eriice/chat2doc/blob/main/public/banner.svg)

> 寻求帮助：此项目在上述路线图中，先使用 ChatGPT 3.5 接口翻译文档，再使用 OpenAI `text-embedding-ada-002` 模型进行文档向量化。但是实际发现中文提问和翻译文档匹配效果较差，有没有做这个方向的朋友给点建议。

## 🚀 项目介绍

![项目示例](https://github.com/Eriice/chat2doc/blob/main/public/preview.jpg)

[访问地址](http://chat.eriice.com/)

Chat2Doc 是一个旨在优化 ChatGPT 回答的项目。

项目流程是：当用户提问时，会匹配问题的最新文档，让 ChatGPT 参考文档进行回复，并且给出参考链接。

这个流程还可以应用于客服回复、推荐系统、知识索引等。

- [x] 网页端
- [x] 适配手机端
- [ ] 更多的编程文档
- [ ] 优化文档匹配效果
- [ ] 切换选项卡保留滚动距离

## 🔥 项目特点

为了降低阅读源码、修改源码的障碍，让所有人参与到项目中。

本项目采用了中文编写文件和代码，使用中文化的文档路径、函数名、变量名等，以促进中文编程的普及。

发现变量命名有问题？👉 克隆、修改、推送。

发现函数实现不优雅？👉 克隆、修改、推送。

## 项目启动

### 前端

```
npm run start
```

### 后端

项目的后端有两种模式。

1. express：开发简单，部署稍微麻烦，需要服务器。
2. supabase：开发稍微麻烦，使用 `deno` 进行包管理，部署简单，边缘函数无需管理服务器。

#### Express

```
cd 服务
# 复制一份环境变量
cp .env.example .env
# 将环境变量中的 key 更换成你自己的
npm run dev
```

#### Supabase

> supabase 的优势在于：使用 supabase 边缘函数部署后端接口，复刻（fork）项目后，前端使用 vercel 部署，不用处理服务器问题。

```
supabase secrets set OPENAI_API_KEY=[OPENAI 的 api key]

supabase functions deploy chat --no-verify-jwt --project-ref [你的项目 project ref]
```

## 沟通交流

分别是我的个人公众号和我加入的 AI 群聊。

会谈谈这个项目，谈谈中文编程，谈谈毒瘤的 DDD、微服务、中台。

欢迎沟通交流。

<div class="flex">
    <img width="200" height="200" src="https://github.com/Eriice/chat2doc/blob/main/public/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png" alt="个人公众号" />
    <img width="200" height="200" src="https://github.com/Eriice/chat2doc/blob/main/public/%E7%BE%A4%E8%81%8A%E4%BA%8C%E7%BB%B4%E7%A0%81.png" alt="我加入的大湾群群聊" />
</div>

## Star 趋势

[![Star History Chart](https://api.star-history.com/svg?repos=Eriice/chat2doc&type=Date)](https://star-history.com/#Eriice/chat2doc&Date)

## 参考项目

[chatgpt-web](https://github.com/Chanzhaoyu/chatgpt-web#%E4%BB%8B%E7%BB%8D)

[Vite + Vue3 + Typescript + ESlint + Prettier + Tailwindcss](https://qiita.com/airRnot1106/items/db691b353a78543ba55e)
