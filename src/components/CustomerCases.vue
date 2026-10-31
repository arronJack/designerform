<script setup lang="ts">
// 客户 / 品牌落地案例：背景 → 方案 → 效果指标（故事型）。
// 2026-10-31：每个案例补真实配图（有视频则优先播放，图作 poster）。
import { customerCases } from '@/data/cases'
</script>

<template>
  <section class="section" id="cases">
    <div class="container">
      <div class="section__head reveal">
        <div>
          <span class="eyebrow">客户案例</span>
          <h2 class="section__title">他们用 DesignerForm 把设计产能翻了几倍</h2>
        </div>
        <p class="section__lead">
          从美妆电商到本地生活，团队把重复出图交给平台，人只做判断与创意。
        </p>
      </div>

      <div class="case-grid">
        <article v-for="c in customerCases" :key="c.id" class="case reveal">
          <div v-if="c.video || c.image" class="case__media">
            <video
              v-if="c.video"
              :src="c.video"
              :poster="c.image"
              autoplay
              muted
              loop
              playsinline
            ></video>
            <img v-else :src="c.image" :alt="`${c.name} · ${c.industry} 案例配图`" loading="lazy" decoding="async" />
          </div>
          <div class="case__brand">
            <span class="case__logo" aria-hidden="true">{{ c.initial }}</span>
            <div>
              <div class="case__name">{{ c.name }}</div>
              <div class="case__industry">{{ c.industry }}</div>
            </div>
          </div>
          <p class="case__quote">“{{ c.quote }}”</p>
          <p class="case__challenge">{{ c.challenge }}</p>
          <div class="case__metrics">
            <div v-for="m in c.metrics" :key="m.l" class="case__metric">
              <div class="n">{{ m.n }}</div>
              <div class="l">{{ m.l }}</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
