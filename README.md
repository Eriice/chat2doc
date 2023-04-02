# Chat2Doc

![Chat2Doc banner](https://github.com/Eriice/chat2doc/blob/main/public/banner.svg)

> 寻求帮助：此项目在上述路线图中，先使用 ChatGPT 3.5 接口翻译文档，再使用 OpenAI `text-embedding-ada-002` 模型进行文档向量化。但是实际发现中文提问和翻译文档匹配效果较差，有没有做这个方向的朋友给点建议。

使用 ChatGPT 回答问题时，匹配问题的文档，让 ChatGPT 参考现有的文档进行回复，并且给出参考链接。

此流程还可应用于客服回复、推荐系统、知识索引等。

- [x] 适配手机端
- [ ] 更多的编程文档
- [ ] 优化文档匹配效果
- [ ] 切换选项卡保留滚动距离

## 项目使用中文编写

文件、代码都均使用中文编写。尽量减少各位阅读源码、修改源码的障碍，

本项目尝试推动中文编程，使用中文化的文档路径，函数名，变量名。旨在降低阅读源码、项目沟通的成本，让尽可能多的人参与到项目的维护。

## 项目启动

### 前端

```
npm run start
```

### 后端（express）

> express 生产环境部署需要服务器

```
cd 服务
cp .env.example .env
# 将环境变量中的 key 更换成你自己的
npm run dev
```

## 后端（supabase）

> supabase 的优势在于：使用 supabase 边缘函数部署后端接口，复刻（fork）项目后，前端使用 vercel 部署，不用处理服务器问题。

```
supabase secrets set OPENAI_API_KEY=[OPENAI 的 api key]

supabase functions deploy chat --no-verify-jwt --project-ref [你的项目 project ref]
```

## 沟通交流

## Star 趋势

[![Star History Chart](https://api.star-history.com/svg?repos=Eriice/chat2doc&type=Date)](https://star-history.com/#Eriice/chat2doc&Date)

## 参考项目

[chatgpt-web](https://github.com/Chanzhaoyu/chatgpt-web#%E4%BB%8B%E7%BB%8D)

[Vite + Vue3 + Typescript + ESlint + Prettier + Tailwindcss](https://qiita.com/airRnot1106/items/db691b353a78543ba55e)
