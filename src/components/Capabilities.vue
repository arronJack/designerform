<script setup lang="ts">
// 核心能力：8 项，用 12 列非对称网格（非三卡套路），内容密度与跨度各异。
interface Cap {
  idx: string
  glyph: string
  title: string
  desc: string
}
const caps: Cap[] = [
  {
    idx: '01',
    glyph: '↻',
    title: '改文案，不重排',
    desc: '结构化文档引擎把设计稿建模成可编辑节点树，改主标题、卖点、价格，整页自动重排，版式不崩。',
  },
  {
    idx: '02',
    glyph: '▦',
    title: '多行业模板库',
    desc: '电商详情、海报、社媒、包装、菜单、名片、横幅——开箱即用，按品牌规范一键套版。',
  },
  {
    idx: '03',
    glyph: '◈',
    title: '品牌套件一键建库',
    desc: '主色、辅助色、字体、圆角、留白一次录入，全模板共享，换季换活动只改一处。',
  },
  {
    idx: '04',
    glyph: '⚖',
    title: '合规闸门内置',
    desc: '极限词、功效断言、类目细则在生成即校验，电商大促主图不再因表述被驳回下架。',
  },
  {
    idx: '05',
    glyph: '⧉',
    title: '批量出图',
    desc: '一份母版 + N 组变量，秒级产出多尺寸、多语言、多 SKU 物料，规模化的设计产能。',
  },
  {
    idx: '06',
    glyph: '◎',
    title: '实时预览',
    desc: '编辑即所见，多端（桌面 / H5 / 印刷）同步校验，落稿前就看到真实效果。',
  },
  {
    idx: '07',
    glyph: '⬡',
    title: '成本闸门',
    desc: '出图即计成本、计配额，超阈值如实拦截，不做伪造成功的假乐观。',
  },
  {
    idx: '08',
    glyph: '⟐',
    title: '开放接入',
    desc: 'MCP 连接器对外暴露生成 / 文案 / 合规能力，任意客户端都能调起 DesignerForm。',
  },
]
</script>

<template>
  <section class="section" id="cap">
    <div class="container">
      <div class="section__head reveal">
        <div>
          <span class="eyebrow">核心能力</span>
          <h2 class="section__title">把设计变成可复用、可批量的生产线</h2>
        </div>
        <p class="section__lead">
          不是又一个画图工具，而是一套让一份设计被无限复用、合规出图、规模生产的系统。
        </p>
      </div>

      <div class="cap-grid">
        <article
          v-for="c in caps"
          :key="c.idx"
          class="cap reveal"
          :style="{ '--cap-accent': 'var(--color-accent)' }"
        >
          <span class="cap__glyph" aria-hidden="true">{{ c.glyph }}</span>
          <span class="cap__idx">{{ c.idx }}</span>
          <h3 class="cap__title">{{ c.title }}</h3>
          <p class="cap__desc">{{ c.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
