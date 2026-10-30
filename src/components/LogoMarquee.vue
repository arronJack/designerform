<script setup lang="ts">
// 信任墙跑马灯：无限滚动的品牌名。内容复制一份实现无缝循环。
const brands = [
  '墨构 Studio',
  '云裳美妆',
  '山野茶研',
  '鲜物生活',
  '极客数码',
  '童萌母婴',
  '知光教育',
  '巷口咖啡',
  '鲸选 3C',
  '原力精酿',
]
</script>

<template>
  <div class="marquee" aria-label="使用 DesignerForm 的团队">
    <div class="marquee__row">
      <span v-for="(b, i) in [...brands, ...brands]" :key="i" class="marquee__item">{{ b }}</span>
    </div>
  </div>
</template>
