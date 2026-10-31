<script setup lang="ts">
// 多行业模板库：行业筛选 + CSS 伪设计稿缩略图（无外部图片）。
import { ref, computed, reactive } from 'vue'
import { templates, templateCategories, type ThumbKind } from '@/data/cases'

const activeCat = ref('all')
const filtered = computed(() =>
  activeCat.value === 'all'
    ? templates
    : templates.filter((t) => t.category === activeCat.value),
)

const markChar = (name: string) => name.trim().charAt(0)

// 真实配图加载失败时回退到 CSS 缩略版式（保证任何网络/路径异常都不出现裂图）
const failed = reactive(new Set<string>())
const onImgError = (id: string) => failed.add(id)
</script>

<template>
  <section class="section" id="templates">
    <div class="container">
      <div class="section__head reveal">
        <div>
          <span class="eyebrow">模板库</span>
          <h2 class="section__title">覆盖全场景的设计模板，开箱即用</h2>
        </div>
        <p class="section__lead">
          不是空白画布，而是成品骨架。选一个，改文案、换配色，立刻出稿。
        </p>
      </div>

      <div class="filters reveal" role="tablist" aria-label="模板行业筛选">
        <button
          v-for="c in templateCategories"
          :key="c.key"
          class="chip"
          :class="{ 'is-active': activeCat === c.key }"
          role="tab"
          :aria-selected="activeCat === c.key"
          @click="activeCat = c.key"
        >
          {{ c.label }}
        </button>
      </div>

      <div class="tpl-grid">
        <article
          v-for="t in filtered"
          :key="t.id"
          class="tpl reveal"
          :style="{ '--tc': t.accent }"
        >
          <div class="tpl__thumb">
            <img
              v-if="t.image && !failed.has(t.id)"
              class="tpl__img"
              :src="t.image"
              :alt="`${t.name} · ${t.categoryLabel} 案例配图`"
              loading="lazy"
              decoding="async"
              @error="onImgError(t.id)"
            />
            <template v-else>
            <!-- poster -->
            <div v-if="t.kind === 'poster'" class="thumb thumb--poster">
              <span class="thumb__kicker">{{ t.categoryLabel }}</span>
              <span class="thumb__h">{{ t.name }}</span>
              <span class="thumb__sub">{{ t.desc }}</span>
              <div class="thumb__block"></div>
            </div>
            <!-- ecom -->
            <div v-else-if="t.kind === 'ecom'" class="thumb thumb--ecom">
              <div class="thumb__img"></div>
              <div class="thumb__col">
                <span class="thumb__kicker">{{ t.categoryLabel }}</span>
                <span class="thumb__h">{{ t.name }}</span>
                <span class="thumb__sub">{{ t.tags[0] }}</span>
                <span class="thumb__price">¥199</span>
              </div>
            </div>
            <!-- logo -->
            <div v-else-if="t.kind === 'logo'" class="thumb thumb--logo">
              <div class="thumb__mark">{{ markChar(t.name) }}</div>
              <div class="thumb__word">{{ t.name }}</div>
              <div class="thumb__tag">{{ t.categoryLabel }}</div>
            </div>
            <!-- social -->
            <div v-else-if="t.kind === 'social'" class="thumb thumb--social">
              <div class="thumb__img"></div>
              <span class="thumb__kicker">{{ t.categoryLabel }}</span>
              <span class="thumb__h">{{ t.name }}</span>
              <div class="thumb__block"></div>
            </div>
            <!-- packaging -->
            <div v-else-if="t.kind === 'packaging'" class="thumb thumb--packaging">
              <div class="thumb__box"></div>
              <span class="thumb__kicker" style="margin-top: 8px">{{ t.name }}</span>
            </div>
            <!-- menu -->
            <div v-else-if="t.kind === 'menu'" class="thumb thumb--menu">
              <div class="thumb__line accent"></div>
              <div class="thumb__line"></div>
              <div class="thumb__line"></div>
              <div class="thumb__line accent"></div>
              <div class="thumb__line"></div>
              <div class="thumb__line"></div>
            </div>
            <!-- card -->
            <div v-else-if="t.kind === 'card'" class="thumb thumb--card">
              <div class="thumb__stripe"></div>
              <div class="thumb__name">{{ t.name }}</div>
              <div class="thumb__role">{{ t.categoryLabel }}</div>
            </div>
            <!-- banner -->
            <div v-else-if="t.kind === 'banner'" class="thumb thumb--banner">
              <div class="thumb__panel"></div>
              <div class="thumb__col">
                <span class="thumb__kicker">{{ t.categoryLabel }}</span>
                <span class="thumb__h">{{ t.name }}</span>
                <span class="thumb__sub">{{ t.tags[0] }}</span>
              </div>
            </div>
            </template>
          </div>
          <div class="tpl__meta">
            <div class="tpl__name">{{ t.name }}</div>
            <span class="tpl__cat">{{ t.categoryLabel }}</span>
            <div class="tpl__tags">
              <span v-for="tag in t.tags" :key="tag" class="tpl__tag">{{ tag }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
