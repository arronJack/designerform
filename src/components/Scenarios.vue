<script setup lang="ts">
// 五大创作场景：产品设计 / 创意风格 / 社媒内容 / 品牌视觉 / 营销素材。
import { scenarios } from '../data/fields'
</script>

<template>
  <section id="scenarios" class="section scenarios">
    <div class="container">
      <div class="section__head reveal">
        <span class="eyebrow">创作场景 · Use Cases</span>
        <h2 class="section__title">五类创作场景，一套工作流。</h2>
        <p class="section__lead">
          无论你做产品、做创意、做社媒、做品牌还是做投放，入口都是同一套「结构化文档 + 出图」
          流水线——只是模板包与合规规则不同。
        </p>
      </div>

      <div class="scenario__list">
        <article
          v-for="(s, i) in scenarios"
          :key="s.id"
          class="scenario reveal"
          :style="{ transitionDelay: `${i * 70}ms` }"
        >
          <span class="scenario__no">{{ s.no }}</span>
          <div class="scenario__main">
            <h3 class="scenario__name">{{ s.name }}</h3>
            <p class="scenario__desc">{{ s.desc }}</p>
            <ul class="scenario__points">
              <li v-for="p in s.points" :key="p">{{ p }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
