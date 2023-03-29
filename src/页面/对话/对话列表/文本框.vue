<template>
  <div class="min-w-[20px] rounded-md py-2 px-3 text-black">
    <div ref="textRef" class="break-words leading-relaxed">
      <div class="markdown-body" v-html="markdown内容"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import MarkdownIt from "markdown-it";
import mdKatex from "@traptitech/markdown-it-katex";
import mila from "markdown-it-link-attributes";
import hljs from "highlight.js";

type I组件属性 = {
  内容: string;
};
const 组件属性 = defineProps<I组件属性>();

const textRef = ref<HTMLElement>();

const mdi = new MarkdownIt({
  linkify: true,
  highlight(code, language) {
    const validLang = !!(language && hljs.getLanguage(language));
    if (validLang) {
      const lang = language ?? "";
      return highlightBlock(hljs.highlight(code, { language: lang }).value, lang);
    }
    return highlightBlock(hljs.highlightAuto(code).value, "");
  }
});

mdi.use(mila, { attrs: { target: "_blank", rel: "noopener" } });
mdi.use(mdKatex, { blockClass: "katexmath-block rounded-md p-[10px]", errorColor: " #cc0000" });

const markdown内容 = computed(() => {
  return mdi.render(组件属性.内容);
});

function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">复制</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`;
}

defineExpose({ textRef });
</script>

<style lang="scss">
/* @import "@/样式/样式表/markdown编辑器.css"; */
@import "./markdown.scss";
</style>
