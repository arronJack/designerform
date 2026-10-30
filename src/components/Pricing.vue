<script setup lang="ts">
// 套餐与 CTA。三档，中间档为推荐。
interface Plan {
  name: string
  price: string
  unit: string
  desc: string
  features: string[]
  featured?: boolean
}
const plans: Plan[] = [
  {
    name: '体验版',
    price: '¥0',
    unit: '/ 月',
    desc: '个人与试用，先跑起来',
    features: ['基础模板库', '单文档编辑', '每日 3 次出图', '社区支持'],
  },
  {
    name: '团队版',
    price: '¥199',
    unit: '/ 人 / 月',
    desc: '中小团队的设计产能中枢',
    featured: true,
    features: [
      '全行业模板库',
      '批量出图与多尺寸',
      '品牌套件一键建库',
      '合规闸门 + 成本闸门',
      '优先工单支持',
    ],
  },
  {
    name: '企业版',
    price: '定制',
    unit: '',
    desc: '多品牌与私有化部署',
    features: ['私有部署 / 专属云', 'SSO 与细粒度权限', '开放 API 与 MCP', '专属成功经理', 'SLA 保障'],
  },
]
</script>

<template>
  <section class="section" id="pricing">
    <div class="container">
      <div class="section__head reveal">
        <div>
          <span class="eyebrow">套餐</span>
          <h2 class="section__title">按团队规模付费，不为闲置产能买单</h2>
        </div>
        <p class="section__lead">从免费试用到企业私有化，一条平滑的升级路径。</p>
      </div>

      <div class="pricing-grid">
        <article
          v-for="p in plans"
          :key="p.name"
          class="plan reveal"
          :class="{ 'plan--featured': p.featured }"
        >
          <div class="plan__name">{{ p.name }}</div>
          <div class="plan__price">{{ p.price }} <small>{{ p.unit }}</small></div>
          <p class="plan__lead" style="color: var(--color-text-2); font-size: var(--fs-sm)">
            {{ p.desc }}
          </p>
          <ul class="plan__list">
            <li v-for="f in p.features" :key="f">{{ f }}</li>
          </ul>
          <a
            class="btn"
            :class="p.featured ? 'btn--primary' : 'btn--ghost'"
            :href="p.featured ? '#demo' : '#demo'"
            style="width: 100%; justify-content: center"
          >
            {{ p.featured ? '免费试用' : '开始使用' }}
          </a>
        </article>
      </div>

      <div class="cta-band reveal">
        <h3 class="cta-band__title">把设计，变成可复用的产能</h3>
        <p class="cta-band__lead">
          接入 DesignerForm，让一份设计被无限复用、合规出图、规模生产。今天就能跑通第一条流水线。
        </p>
        <a class="btn btn--primary" href="#demo">
          免费试用 <span class="btn__arrow">→</span>
        </a>
      </div>
    </div>
  </section>
</template>
