<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SiteNav from './components/SiteNav.vue'
import HeroCanvas from './components/HeroCanvas.vue'
import LogoMarquee from './components/LogoMarquee.vue'
import Capabilities from './components/Capabilities.vue'
import TemplateGallery from './components/TemplateGallery.vue'
import CustomerCases from './components/CustomerCases.vue'
import LiveEditor from './components/LiveEditor.vue'
import Pricing from './components/Pricing.vue'
import SiteFooter from './components/SiteFooter.vue'
import { useReveal } from './composables/useReveal'

useReveal()

const showTop = ref(false)
function onScroll() {
  showTop.value = window.scrollY > 600
}
function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <SiteNav />

  <main id="top">
    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <div class="hero__grid">
          <div class="hero__copy">
            <span class="hero__badge">
              <span class="hero__dot"></span> 专业设计平台 · 结构化 AI 出图
            </span>
            <h1 class="hero__title">一份设计，<br /><span class="accent">无限复用</span>。</h1>
            <p class="hero__lead">
              DesignerForm 让电商与品牌团队把一份设计稿建模成可编辑节点树——改文案自动重排、品牌套件一键建库、合规与成本闸门内置。规模化的设计产能，从今天开始。
            </p>
            <div class="hero__actions">
              <a class="btn btn--primary" href="#demo">
                免费试用 <span class="btn__arrow">→</span>
              </a>
              <a class="btn btn--ghost" href="#templates">浏览模板库</a>
            </div>
            <div class="hero__stats">
              <div class="stat">
                <div class="stat__num">12+</div>
                <div class="stat__label">行业模板</div>
              </div>
              <div class="stat">
                <div class="stat__num">340%</div>
                <div class="stat__label">详情页月产出</div>
              </div>
              <div class="stat">
                <div class="stat__num">91%</div>
                <div class="stat__label">合规驳回下降</div>
              </div>
            </div>
          </div>
          <HeroCanvas />
        </div>
      </div>
    </section>

    <LogoMarquee />
    <Capabilities />
    <TemplateGallery />
    <CustomerCases />
    <LiveEditor />
    <Pricing />
  </main>

  <SiteFooter />

  <button
    class="to-top"
    :class="{ show: showTop }"
    aria-label="回到顶部"
    @click="toTop"
  >
    ↑
  </button>
</template>
