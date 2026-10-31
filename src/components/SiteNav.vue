<script setup lang="ts">
// 吸顶导航：品牌 + 锚点导航 + CTA。移动端链接收起，仅留品牌与 CTA（CSS 控制）。
const links = [
  { href: '#cap', label: '核心能力' },
  { href: '#fields', label: '设计领域' },
  { href: '#studio', label: '工作台' },
  { href: '#templates', label: '模板库' },
  { href: '#cases', label: '客户案例' },
  { href: '#pricing', label: '套餐' },
]
</script>

<template>
  <header class="nav">
    <div class="nav__inner">
      <a class="brand" href="#top" aria-label="DesignerForm 首页">
        <span class="brand__mark">D</span>
        <span>
          DesignerForm
          <span class="brand__sub">专业设计平台</span>
        </span>
      </a>
      <nav class="nav__links" aria-label="主导航">
        <a v-for="l in links" :key="l.href" class="nav__link" :href="l.href">{{ l.label }}</a>
      </nav>
      <div class="nav__cta">
        <a class="nav__link" href="#demo">在线体验</a>
        <a class="btn btn--primary" href="#pricing">
          查看套餐 <span class="btn__arrow">→</span>
        </a>
      </div>
    </div>
  </header>
</template>
