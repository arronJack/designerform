<script setup lang="ts">
// 创作工作台（对齐竞品画布模式）：
//   案例 → 技能库；上传参考图 → 画板；上传品牌素材 → 自动提色；聊天说需求 → 出图。
// 诚实边界：站点为纯静态站，出图为「本地合成演示」（不消耗额度）；
//          接入生图 API 后同一套界面直接产出真图。
import { ref, computed, nextTick } from 'vue'
import { designSkills, skillCategories, type DesignSkill } from '../data/skills'
import { extractPalette } from '../lib/palette'

interface Msg {
  id: number
  role: 'user' | 'bot'
  text: string
}
interface RefImg {
  id: number
  name: string
  url: string
}
interface BrandAsset {
  id: number
  name: string
  url: string
  palette: string[]
}
interface Artboard {
  id: number
  kind: 'ref' | 'brand' | 'result'
  title: string
  sub?: string
  image?: string
  color?: string
  skill?: string
  ratio?: string
  headline?: string
}

const tab = ref<'skills' | 'brand'>('skills')
const search = ref('')
const category = ref<string>('全部')
const selectedId = ref<string>(designSkills[0]!.id)
const brandColor = ref<string>('')
const input = ref('')
const busy = ref(false)
const status = ref('')
const messages = ref<Msg[]>([
  {
    id: 1,
    role: 'bot',
    text: '我是 DesignerForm 的创作助手。选左边一个技能、传一张参考图或品牌素材，然后告诉我你想做什么，我来出图。',
  },
])
const refs = ref<RefImg[]>([])
const brandAssets = ref<BrandAsset[]>([])
const artboards = ref<Artboard[]>([])
const seq = ref(100)
const chatBox = ref<HTMLElement | null>(null)

const selectedSkill = computed<DesignSkill>(
  () => designSkills.find((s) => s.id === selectedId.value) ?? designSkills[0]!,
)

const filteredSkills = computed(() =>
  designSkills.filter((s) => {
    const okCat = category.value === '全部' || s.category === category.value
    const q = search.value.trim().toLowerCase()
    const okQ =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.tags.join(' ').toLowerCase().includes(q) ||
      s.from.toLowerCase().includes(q)
    return okCat && okQ
  }),
)

const activeColor = computed(() => brandColor.value || selectedSkill.value.palette[0] || '#ff6b2c')

function pushMsg(role: Msg['role'], text: string) {
  messages.value.push({ id: ++seq.value, role, text })
  void nextTick(() => {
    if (chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight
  })
}

function pickSkill(s: DesignSkill) {
  selectedId.value = s.id
  input.value = s.prompt
  if (!brandColor.value) brandColor.value = s.palette[0] ?? '#ff6b2c'
  pushMsg('bot', `已选「${s.name}」——该技能沉淀自：${s.from}。需要我直接按这个技能出图吗？`)
}

function onRefFiles(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  for (const f of Array.from(files).slice(0, 6)) {
    const url = URL.createObjectURL(f)
    refs.value.push({ id: ++seq.value, name: f.name, url })
    artboards.value.push({
      id: ++seq.value,
      kind: 'ref',
      title: f.name,
      sub: '本地参考图 · 仅本次会话',
      image: url,
      ratio: '4:3',
    })
  }
  pushMsg('bot', `收到 ${files.length} 张参考图，已放到画板上。我会按参考图的构图与调性出图。`)
  ;(e.target as HTMLInputElement).value = ''
}

async function readPalette(url: string): Promise<string[]> {
  const img = new Image()
  img.src = url
  await img.decode().catch(() => undefined)
  const c = document.createElement('canvas')
  c.width = 72
  c.height = 72
  const ctx = c.getContext('2d')
  if (!ctx) return []
  ctx.drawImage(img, 0, 0, 72, 72)
  try {
    return extractPalette(ctx.getImageData(0, 0, 72, 72).data)
  } catch {
    return []
  }
}

async function onBrandFiles(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files) return
  for (const f of Array.from(files).slice(0, 3)) {
    const url = URL.createObjectURL(f)
    const palette = await readPalette(url)
    brandAssets.value.push({ id: ++seq.value, name: f.name, url, palette })
    if (palette[0]) brandColor.value = palette[0]
    artboards.value.push({
      id: ++seq.value,
      kind: 'brand',
      title: f.name,
      sub: `品牌素材 · 提取 ${palette.length} 色`,
      image: url,
      color: palette[0],
      ratio: '1:1',
    })
    pushMsg(
      'bot',
      palette.length
        ? `已从「${f.name}」提取主色板：${palette.slice(0, 3).join(' / ')}，后续出图会统一套用。`
        : `已加入品牌素材「${f.name}」，但这张图的颜色对比不足，未能提取有效色板。`,
    )
  }
  ;(e.target as HTMLInputElement).value = ''
}

function headlineOf(text: string): string {
  const t = text
    .replace(/^(请|帮我|麻烦)?\s*(做|画|生成|设计|出)\s*(一张|一个|一套|一版|版)?\s*/u, '')
    .replace(/[，。,.；;]\s*$/u, '')
  return t.slice(0, 18) || '未命名设计'
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function send() {
  const text = input.value.trim()
  if (!text || busy.value) return
  input.value = ''
  pushMsg('user', text)
  busy.value = true

  // 意图匹配：命中技能关键词则切换技能
  const hit = designSkills.find(
    (s) => text.includes(s.category) || s.tags.some((t) => text.toLowerCase().includes(t.toLowerCase())),
  )
  if (hit && hit.id !== selectedId.value) {
    selectedId.value = hit.id
    status.value = `匹配到技能：${hit.name}`
  } else {
    status.value = `使用技能：${selectedSkill.value.name}`
  }
  await sleep(420)

  status.value = brandColor.value ? '套用品牌主色' : '套用技能默认配色'
  await sleep(420)

  status.value = '合成画板并检查规范'
  await sleep(520)

  const sk = selectedSkill.value
  artboards.value.push({
    id: ++seq.value,
    kind: 'result',
    title: `${sk.name}`,
    sub: `技能「${sk.name}」 · ${sk.ratio} · 主色 ${activeColor.value}`,
    image: sk.cover,
    color: activeColor.value,
    skill: sk.name,
    ratio: sk.ratio,
    headline: headlineOf(text),
  })

  busy.value = false
  status.value = ''
  pushMsg(
    'bot',
    `已按「${sk.name}」出图：${headlineOf(text)}。主色 ${activeColor.value}${
      refs.value.length ? `，参考图 ${refs.value.length} 张` : ''
    }。（演示模式为本地合成，接入生图 API 后即为真实出图）`,
  )
}

function quick(p: string) {
  input.value = p
  void send()
}

function clearBoard() {
  artboards.value = []
  pushMsg('bot', '画板已清空，可以重新开始。')
}
</script>

<template>
  <section id="studio" class="section studio-demo">
    <div class="container">
      <div class="section__head reveal">
        <div>
          <span class="eyebrow">创作工作台 · Studio</span>
          <h2 class="section__title">案例变技能，聊天即出图。</h2>
        </div>
        <p class="section__lead">
          左边是沉淀自真实案例的<b>设计技能</b>，中间是<b>画板</b>，右边是<b>对话</b>。上传参考图与品牌素材后，
          说一句需求就能开画——和画布式 AI 设计工具同一种工作方式。
        </p>
      </div>

      <div class="studio reveal">
        <!-- 左：技能库 / 品牌素材 -->
        <aside class="studio__side">
          <div class="studio__tabs">
            <button
              class="studio__tab"
              :class="{ 'is-active': tab === 'skills' }"
              @click="tab = 'skills'"
            >
              设计技能 {{ designSkills.length }}
            </button>
            <button
              class="studio__tab"
              :class="{ 'is-active': tab === 'brand' }"
              @click="tab = 'brand'"
            >
              品牌素材 {{ brandAssets.length }}
            </button>
          </div>

          <template v-if="tab === 'skills'">
            <input v-model="search" class="studio__search" placeholder="搜索技能 / 标签 / 案例" />
            <div class="studio__cats">
              <button
                v-for="c in skillCategories"
                :key="c"
                class="chip chip--sm"
                :class="{ 'is-active': category === c }"
                @click="category = c"
              >
                {{ c }}
              </button>
            </div>
            <ul class="skill-list">
              <li v-for="s in filteredSkills" :key="s.id">
                <button
                  class="skill"
                  :class="{ 'is-active': selectedId === s.id }"
                  @click="pickSkill(s)"
                >
                  <img class="skill__cover" :src="s.cover" :alt="s.name" loading="lazy" />
                  <span class="skill__body">
                    <span class="skill__name">{{ s.name }}</span>
                    <span class="skill__from">来源：{{ s.from }}</span>
                    <span class="skill__tags">
                      <i v-for="t in s.tags.slice(0, 3)" :key="t">{{ t }}</i>
                    </span>
                  </span>
                </button>
              </li>
            </ul>
          </template>

          <template v-else>
            <label class="upload">
              <input type="file" accept="image/*" multiple hidden @change="onBrandFiles" />
              <span class="upload__title">上传品牌素材</span>
              <span class="upload__hint">Logo / 色卡 / 主视觉 —— 自动提取主色板</span>
            </label>

            <div v-if="brandAssets.length" class="brand-list">
              <div v-for="b in brandAssets" :key="b.id" class="brand">
                <img :src="b.url" :alt="b.name" />
                <div class="brand__meta">
                  <span class="brand__name">{{ b.name }}</span>
                  <div class="brand__palette">
                    <button
                      v-for="c in b.palette"
                      :key="c"
                      class="swatch swatch--sm"
                      :class="{ 'is-active': brandColor === c }"
                      :style="{ background: c }"
                      :title="c"
                      @click="brandColor = c"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
            <p v-else class="studio__hint">还没有品牌素材。上传一张 Logo 或主视觉，我就能沿用它的一套颜色。</p>
          </template>
        </aside>

        <!-- 中：画板 -->
        <div class="studio__canvas">
          <div class="studio__bar">
            <span class="studio__bar-title">画板 · {{ artboards.length }}</span>
            <span class="studio__badge">演示模式 · 本地合成</span>
            <button v-if="artboards.length" class="studio__clear" @click="clearBoard">清空</button>
          </div>

          <div v-if="!artboards.length" class="studio__empty">
            <div class="studio__empty-mark">D</div>
            <p>画板是空的。</p>
            <ol>
              <li>① 左边选一个<b>设计技能</b>（都沉淀自真实案例）</li>
              <li>② 上传<b>参考图</b>或<b>品牌素材</b></li>
              <li>③ 在右边说一句需求</li>
            </ol>
          </div>

          <div v-else class="board-grid">
            <figure
              v-for="a in artboards"
              :key="a.id"
              class="board"
              :class="`board--${a.kind}`"
              :style="{ '--tc': a.color || activeColor }"
            >
              <div class="board__media" :class="`board__media--${(a.ratio || '4:3').replace(':', '-')}`">
                <img v-if="a.image" :src="a.image" :alt="a.title" loading="lazy" />
                <div v-if="a.headline" class="board__overlay">
                  <span class="board__headline">{{ a.headline }}</span>
                </div>
              </div>
              <figcaption class="board__cap">
                <span class="board__title">{{ a.title }}</span>
                <span class="board__sub">{{ a.sub }}</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <!-- 右：对话 -->
        <div class="studio__chat">
          <div ref="chatBox" class="chat">
            <div v-for="m in messages" :key="m.id" class="msg" :class="`msg--${m.role}`">
              <span class="msg__avatar">{{ m.role === 'bot' ? 'D' : '你' }}</span>
              <p class="msg__text">{{ m.text }}</p>
            </div>
            <div v-if="busy" class="msg msg--bot">
              <span class="msg__avatar">D</span>
              <p class="msg__text msg__text--busy">{{ status }}<i class="dots">…</i></p>
            </div>
          </div>

          <div class="chat__quick">
            <button class="chip chip--sm" @click="quick('做一张珠宝主视觉，祖母绿钻戒，黑绒背景，微距质感')">
              珠宝主视觉
            </button>
            <button class="chip chip--sm" @click="quick('画一个动漫角色，樱花树下，黄昏逆光')">
              动漫角色
            </button>
            <button class="chip chip--sm" @click="quick('做一张大促海报，大字标题 + 利益点色块')">
              大促海报
            </button>
          </div>

          <div class="chat__input">
            <textarea
              v-model="input"
              rows="2"
              placeholder="说一句需求，例如：做一张珠宝主视觉，黑绒背景，高级感留白"
              @keydown.enter.exact.prevent="send"
            ></textarea>
            <button class="btn btn--primary chat__send" :disabled="busy || !input.trim()" @click="send">
              出图
            </button>
          </div>

          <p class="chat__note">
            当前为演示合成（不消耗额度）。接入生图 API 后，同一界面直接产出真实图像，并自动套用你上传的品牌色板。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
