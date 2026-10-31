<script setup lang="ts">
// 设计领域作品详情页（全屏浮层）：领域大图 + 作品廊 + 能力亮点 + 行动召唤。
import { computed } from 'vue'
import type { DesignField } from '../data/fields'

const props = defineProps<{ field: DesignField }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const gallery = computed(() => props.field.gallery?.length ? props.field.gallery : [props.field.image])
</script>

<template>
  <Teleport to="body">
    <div class="field-detail" @click.self="emit('close')">
      <div class="field-detail__panel" role="dialog" aria-modal="true">
        <button class="field-detail__close" aria-label="关闭" @click="emit('close')">✕</button>

        <div class="container">
          <header class="field-detail__head">
            <span class="eyebrow">作品详情 · {{ field.en }}</span>
            <h2 class="field-detail__title">{{ field.name }}</h2>
            <p class="field-detail__lead">{{ field.desc }}</p>
            <div class="field-card__tags">
              <span v-for="t in field.tags" :key="t" class="field-tag">{{ t }}</span>
            </div>
          </header>

          <div class="field-detail__hero">
            <img :src="gallery[0]" :alt="`${field.name} 主视觉`" decoding="async" />
          </div>

          <div v-if="gallery.length > 1" class="field-detail__grid">
            <figure v-for="(g, i) in gallery.slice(1)" :key="i" class="field-detail__shot">
              <img :src="g" :alt="`${field.name} 作品 ${i + 2}`" loading="lazy" decoding="async" />
            </figure>
          </div>

          <div v-if="field.highlights?.length" class="field-detail__highlights">
            <h3>这个领域能做什么</h3>
            <ul>
              <li v-for="h in field.highlights" :key="h">{{ h }}</li>
            </ul>
          </div>

          <div class="field-detail__cta">
            <a class="btn btn--primary" href="#studio" @click="emit('close')">
              用这个领域出图 <span class="btn__arrow">→</span>
            </a>
            <button class="btn btn--ghost" @click="emit('close')">返回全部领域</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
