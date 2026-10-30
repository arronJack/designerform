<script setup lang="ts">
// 设计领域真图画廊：8 个设计领域，非对称网格 + 悬停信息浮层。
import { designFields } from '../data/fields'
</script>

<template>
  <section id="fields" class="section fields">
    <div class="container">
      <div class="section__head reveal">
        <span class="eyebrow">设计领域 · Design Fields</span>
        <h2 class="section__title">不止电商。<br />只要是设计，都在这里。</h2>
        <p class="section__lead">
          珠宝、建筑、广告、网页、UI·VI、动漫插画、产品与品牌视觉——每个领域都有对应的
          提示词体系、尺寸规范与出图工作流，同一个引擎，覆盖全品类设计生产。
        </p>
      </div>

      <div class="fields__grid">
        <article
          v-for="(f, i) in designFields"
          :key="f.id"
          class="field-card reveal"
          :class="`field-card--${f.span}`"
          :style="{ transitionDelay: `${i * 60}ms` }"
        >
          <div class="field-card__media">
            <img
              :src="f.image"
              :alt="`${f.name} 作品示例`"
              loading="lazy"
              decoding="async"
            />
            <div class="field-card__overlay">
              <div class="field-card__tags">
                <span v-for="t in f.tags" :key="t" class="field-tag">{{ t }}</span>
              </div>
            </div>
          </div>
          <div class="field-card__body">
            <h3 class="field-card__name">
              {{ f.name }}
              <span class="field-card__en">{{ f.en }}</span>
            </h3>
            <p class="field-card__desc">{{ f.desc }}</p>
          </div>
        </article>
      </div>

      <p class="fields__note reveal">
        更多领域持续接入中：室内设计、服装设计、游戏场景、展览展示、工业包装、影视概念……
        你所在的行业，就是下一个模板包。
      </p>
    </div>
  </section>
</template>
