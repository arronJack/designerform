<script setup lang="ts">
// 可交互 Demo：选模板 → 改文案/配色 → 右侧实时预览刷新。
// 这是站点的「可交互 Demo」案例，也是首屏记忆点的落地验证。
import { ref, reactive, computed, watch } from 'vue'
import { editorTemplates, type EditorTemplate } from '@/data/templates'

const currentId = ref(editorTemplates[0].id)
const accent = ref(editorTemplates[0].defaultAccent)
const doc = reactive<Record<string, string>>({ ...editorTemplates[0].defaults })

const current = computed<EditorTemplate>(
  () => editorTemplates.find((t) => t.id === currentId.value) ?? editorTemplates[0],
)

function selectTemplate(id: string) {
  const t = editorTemplates.find((x) => x.id === id)
  if (!t) return
  currentId.value = id
  accent.value = t.defaultAccent
  // 重置表单为该模板默认值
  Object.keys(doc).forEach((k) => delete doc[k])
  Object.assign(doc, t.defaults)
}

// 切模板时若 doc 已被外部改动，确保字段完整
watch(currentId, (id) => {
  const t = editorTemplates.find((x) => x.id === id)
  if (t) Object.assign(doc, t.defaults)
})

const markChar = (s: string) => (s || '?').trim().charAt(0)
</script>

<template>
  <section class="section" id="demo">
    <div class="container">
      <div class="section__head reveal">
        <div>
          <span class="eyebrow">在线演示</span>
          <h2 class="section__title">真的能上手：改一句话，设计立刻重排</h2>
        </div>
        <p class="section__lead">
          下面不是截图。选一个模板，改主标题、卖点或配色，右侧预览实时刷新——这就是 DesignerForm 的日常。
        </p>
      </div>

      <div class="editor reveal">
        <div class="editor__panel">
          <div class="editor__field">
            <span class="editor__label">选择模板</span>
            <div class="filters" style="margin-bottom: 0">
              <button
                v-for="t in editorTemplates"
                :key="t.id"
                class="chip"
                :class="{ 'is-active': currentId === t.id }"
                @click="selectTemplate(t.id)"
              >
                {{ t.name }}
              </button>
            </div>
          </div>

          <div class="editor__field" v-for="f in current.fields" :key="f.key">
            <label class="editor__label" :for="`f-${f.key}`">{{ f.label }}</label>
            <textarea
              v-if="f.type === 'textarea'"
              :id="`f-${f.key}`"
              class="editor__textarea"
              v-model="doc[f.key]"
              :placeholder="f.placeholder"
            ></textarea>
            <input
              v-else
              :id="`f-${f.key}`"
              class="editor__input"
              v-model="doc[f.key]"
              :placeholder="f.placeholder"
            />
          </div>

          <div class="editor__field">
            <span class="editor__label">主题色</span>
            <div class="editor__swatches">
              <button
                v-for="c in current.accentOptions"
                :key="c"
                class="swatch"
                :class="{ 'is-active': accent === c }"
                :style="{ background: c }"
                :aria-label="`主题色 ${c}`"
                @click="accent = c"
              ></button>
            </div>
          </div>
        </div>

        <div class="editor__stage">
          <div class="preview" :style="{ '--tc': accent }">
            <!-- ecom -->
            <div v-if="current.kind === 'ecom'" class="thumb thumb--ecom">
              <div class="thumb__img"></div>
              <div class="thumb__col">
                <span class="thumb__kicker">{{ doc.kicker }}</span>
                <span class="thumb__h">{{ doc.title }}</span>
                <span class="thumb__sub">{{ doc.sub }}</span>
                <span class="thumb__price">{{ doc.price }}</span>
              </div>
            </div>
            <!-- social -->
            <div v-else-if="current.kind === 'social'" class="thumb thumb--social">
              <div class="thumb__img"></div>
              <span class="thumb__kicker">{{ doc.kicker }}</span>
              <span class="thumb__h">{{ doc.title }}</span>
              <span class="thumb__sub">{{ doc.sub }}</span>
              <div class="thumb__block"></div>
            </div>
            <!-- logo -->
            <div v-else class="thumb thumb--logo">
              <div class="thumb__mark">{{ markChar(doc.word) }}</div>
              <div class="thumb__word">{{ doc.word }}</div>
              <div class="thumb__tag">{{ doc.tag }}</div>
            </div>
          </div>
          <p class="editor__hint">编辑左侧，预览实时刷新 · 改文案不重排</p>
        </div>
      </div>
    </div>
  </section>
</template>
