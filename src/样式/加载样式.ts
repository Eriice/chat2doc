import "katex/dist/katex.min.css";
import "./样式表/tailwind.css";
import "./样式表/highlight.scss";
import "./样式表/github-markdown.scss";
import "./样式表/全局样式.css";

// https://www.naiveui.com/zh-CN/light/docs/style-conflict
// 插入 meta 解决样式冲突
const 加载样式 = () => {
  const meta = document.createElement("meta");
  meta.name = "naive-ui-style";
  document.head.appendChild(meta);
};

export default 加载样式;
