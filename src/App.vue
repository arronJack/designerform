<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import SiteNav from './components/SiteNav.vue'
import HeroCanvas from './components/HeroCanvas.vue'
import LogoMarquee from './components/LogoMarquee.vue'
import Capabilities from './components/Capabilities.vue'
import Scenarios from './components/Scenarios.vue'
import DesignFields from './components/DesignFields.vue'
import TemplateGallery from './components/TemplateGallery.vue'
import CustomerCases from './components/CustomerCases.vue'
import StudioCanvas from './components/StudioCanvas.vue'
import LiveEditor from './components/LiveEditor.vue'
import Pricing from './components/Pricing.vue'
import SiteFooter from './components/SiteFooter.vue'
import FieldDetail from './components/FieldDetail.vue'
import type { DesignField } from './data/fields'
import { useReveal } from './composables/useReveal'

useReveal()

// 演示站声明条：默认显示，可关闭（localStorage 记忆）。对齐对外口径：早期演示、暂不商业化。
const demoClosed = ref(false)
onMounted(() => {
  try { demoClosed.value = localStorage.getItem('df_demo_bar_closed') === '1' } catch {}
})
watch(demoClosed, (v) => {
  try { localStorage.setItem('df_demo_bar_closed', v ? '1' : '0') } catch {}
})

const showTop = ref(false)
function onScroll() {
  showTop.value = window.scrollY > 600
}
function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const activeField = ref<DesignField | null>(null)
watch(activeField, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})
</script>

<template>
  <div v-if="!demoClosed" class="demo-bar" role="note">
    <span class="demo-bar__dot" aria-hidden="true"></span>
    <p class="demo-bar__text">
      演示站 · 本页面为<strong>早期演示版本</strong>：功能与定价仅作形态示意，暂未正式上线、不提供任何付费服务。
    </p>
    <button class="demo-bar__close" type="button" aria-label="关闭演示站提示" @click="demoClosed = true">
      ×
    </button>
  </div>

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
              DesignerForm 让设计团队把一份稿子建模成可编辑节点树——改文案自动重排、品牌套件一键建库、合规与成本闸门内置。产品、珠宝、建筑、广告、网页、UI·VI、动漫插画、品牌视觉，以及室内设计、服装设计、游戏场景，全设计领域一套产能流水线。
            </p>
            <div class="hero__actions">
              <a class="btn btn--primary" href="#studio">
                进入工作台 <span class="btn__arrow">→</span>
              </a>
              <a class="btn btn--ghost" href="#fields">看设计领域</a>
            </div>
            <div class="hero__stats">
              <div class="stat">
                <div class="stat__num">20+</div>
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
    <Scenarios />
    <DesignFields @select="activeField = $event" />
    <TemplateGallery />
    <CustomerCases />
    <StudioCanvas />
    <LiveEditor />
    <Pricing />
  </main>

  <SiteFooter />

  <FieldDetail v-if="activeField" :field="activeField" @close="activeField = null" />

  <button
    class="to-top"
    :class="{ show: showTop }"
    aria-label="回到顶部"
    @click="toTop"
  >
    ↑
  </button>
</template>
