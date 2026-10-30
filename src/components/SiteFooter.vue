<script setup lang="ts">
// 页脚：品牌简介 + 三栏导航。
const cols = [
  {
    title: '产品',
    links: ['核心能力', '模板库', '在线演示', '套餐定价', '更新日志'],
  },
  {
    title: '资源',
    links: ['帮助中心', '设计规范', 'API 文档', 'MCP 连接器', '状态页'],
  },
  {
    title: '公司',
    links: ['关于我们', '客户案例', '招贤纳士', '联系销售', '隐私政策'],
  },
]
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__col">
          <a class="brand" href="#top" style="margin-bottom: var(--space-3); display: inline-flex">
            <span class="brand__mark">D</span>
            <span>DesignerForm</span>
          </a>
          <p class="footer__about">
            面向电商与品牌团队的专业设计平台。把一份设计稿建模成可编辑节点树，改文案自动重排、品牌套件一键建库、合规与成本闸门内置，规模化的设计产能，从今天开始。
          </p>
        </div>
        <div v-for="c in cols" :key="c.title" class="footer__col">
          <h4>{{ c.title }}</h4>
          <a v-for="l in c.links" :key="l" href="#top">{{ l }}</a>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© 2026 DesignerForm · 专业设计平台</span>
        <span>改文案，不重排 · 一份设计，无限复用</span>
      </div>
    </div>
  </footer>
</template>
