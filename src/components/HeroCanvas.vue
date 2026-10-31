<script setup lang="ts">
// 首屏签名记忆点：一块永不停止的「实时设计画布」。
// 循环展示几份设计稿被自动套版/出图的过程，证明产品力。
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface CanvasDesign {
  dark: boolean
  accent: string
  top: string
  kicker: string
  h: string
  sub: string
  tag: string
  /** 真实设计预览图（public/hero 下，相对路径） */
  image: string
}

const designs: CanvasDesign[] = [
  {
    dark: false,
    accent: '#ff6b2c',
    top: '电商详情 · 自动重排',
    kicker: '春季新品',
    h: '轻氧保湿精华',
    sub: '改文案，整页自动重排，主图与卖点一次到位。',
    tag: '实时预览',
    image: 'hero/hero-spring.jpg',
  },
  {
    dark: true,
    accent: '#ff2e63',
    top: '社媒海报 · 一键套版',
    kicker: '种草日记',
    h: '这杯也太好喝',
    sub: '竖版封面 + 三段文案结构，信息流点击优先。',
    tag: '多尺寸延展',
    image: 'hero/hero-drink.jpg',
  },
  {
    dark: false,
    accent: '#2f6b4f',
    top: '礼盒包装 · 印刷预览',
    kicker: '国潮礼赠',
    h: '明前龙井',
    sub: '盒型结构与主视觉面同步，烫印提示可见。',
    tag: '印刷级',
    image: 'hero/hero-tea.jpg',
  },
  {
    dark: true,
    accent: '#3a86ff',
    top: '品牌标识 · 规范交付',
    kicker: 'MO GOU',
    h: '墨构 Studio',
    sub: '字标 + 圆徽组合，标准色与留白一次给齐。',
    tag: '可注册',
    image: 'hero/hero-brand.jpg',
  },
]

const current = ref(0)
let timer: number | undefined

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return
  timer = window.setInterval(() => {
    current.value = (current.value + 1) % designs.length
  }, 2800)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})

const active = () => designs[current.value]
</script>

<template>
  <div class="hero__canvas" role="img" :aria-label="`实时设计画布：${active().top}`">
    <div
      class="canvas-frame canvas-frame--photo"
      :class="{ 'canvas-frame--dark': active().dark }"
      :style="{ '--canvas-accent': active().accent }"
    >
      <!-- 4 张真实设计稿常驻 DOM、按序交叉淡入（避免切换时白闪） -->
      <img
        v-for="(d, i) in designs"
        :key="d.h"
        class="canvas-photo"
        :class="{ 'is-active': i === current }"
        :src="d.image"
        :alt="`${d.h} · ${d.top} 设计预览`"
        decoding="async"
      />
      <div class="canvas-scrim" aria-hidden="true"></div>
      <div class="canvas-top">
        <span>{{ active().top }}</span>
        <span>●</span>
      </div>
      <div class="canvas-body">
        <span class="canvas-kicker">{{ active().kicker }}</span>
        <span class="canvas-h">{{ active().h }}</span>
        <span class="canvas-sub">{{ active().sub }}</span>
      </div>
      <span class="canvas-tag">{{ active().tag }}</span>
    </div>
    <div class="canvas-dots" aria-hidden="true">
      <span v-for="(d, i) in designs" :key="i" :class="{ on: i === current }"></span>
    </div>
  </div>
</template>
