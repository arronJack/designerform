# DesignerForm · 专业设计平台官网

面向电商与品牌团队的专业 AI 设计平台门户（Vite + Vue3 + TypeScript）。

> 一份设计，无限复用 · 改文案，不重排 · 规模化的设计产能

> ⚠️ **演示站声明**：本项目为**早期演示版本**，页面功能与套餐定价仅作形态示意，**暂未正式上线、不提供任何付费服务、不接受任何付款**。对外推广材料一律按「演示站」口径表述，不得写为「已上线 / 可购买 / 已交付客户案例」。

## 设计定调（Design Direction）

- **目的**：向电商 / 品牌 / 运营团队推介 DesignerForm 这个专业设计平台。
- **调性**：暗色「编辑式轻奢」——暖近黑基底 + 单一锐利强调色（琥珀橙 `#ff6b2c`）+ 精致衬线中文大标题，区别于通用「白底紫渐变」AI 味模板。
- **字体**：展示字 `Bricolage Grotesque`（拉丁）+ `Noto Serif SC`（中文标题）；正文 `Noto Sans SC` + `Sora`。
- **记忆点**：首屏一块**永不停止的实时设计画布**（设计稿被自动套版/出图），以及下方**真能玩的可交互编辑器**（选模板 → 改文案/配色 → 右侧实时刷新）。
- **案例最全**：20 个多行业模板样例（可筛选）+ 10 个客户/品牌落地案例（背景→方案→效果）+ 1 个可交互 Demo。
- **全设计领域**：产品 / 珠宝 / 建筑 / 广告 / 网页 / UI·VI / 动漫插画 / 品牌视觉 / 室内 / 服装 / 游戏 十一大领域真图作品墙（`public/gallery/`，AI 实拍级出图）。
- **五大创作场景**：产品设计 · 创意风格 · 社媒内容 · 品牌视觉 · 营销素材（对齐主流 AI 设计平台用例分类）。

## 在线访问

> 演示站：以下地址均为早期演示版本，非正式上线产品。

- **GitHub Pages（主站）**：https://arronjack.github.io/designerform/
- **镜像（完整介绍页入口）**：https://arronjack.github.io/designerPlatform/ —— 与上方为同一构建，同步发布

## 运行

```bash
npm install
npm run dev        # 本地开发 http://localhost:5188
npm run build      # 生产构建到 dist/
npm run preview    # 预览构建产物
npm run deploy     # 一键部署 GitHub Pages（构建 dist-site → force push gh-pages 分支）
```

## 目录

```
src/
├─ main.ts
├─ App.vue                 # 组装全部区块
├─ styles/                # tokens / base / components 三层样式
├─ data/                  # cases.ts（模板+案例）、templates.ts（可交互模板定义）
├─ composables/           # useReveal（滚动入场）
└─ components/            # 导航 / Hero画布 / 信任墙 / 能力 / 模板画廊 / 客户案例 / 可交互编辑器 / 定价 / 页脚
```

## 交付自检

- [x] 展示字 + 正文字已确定（非 Inter/Roboto/系统默认）
- [x] 单一强调色纪律（琥珀橙只给关键动作）
- [x] 暗色基底 + 颗粒噪点 + 渐变辉光氛围层
- [x] 入场序列（IntersectionObserver 滚动揭示，间隔错峰）
- [x] `prefers-reduced-motion` 全量降级
- [x] 唯一 `h1`，语义地标完整（header/main/section/footer）
- [x] 可交互 Demo 真实可用（非截图）
- [x] 375 / 768 / 1440 三档无溢出
- [x] 反 AI 味清单：无居中三卡套路首屏、无「无缝赋能」式空话、非平均分配配色
