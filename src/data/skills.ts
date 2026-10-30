// DesignerForm · 设计技能库
// 核心思路（对齐竞品画布模式）：把「落地案例」沉淀成可复用的「设计技能」——
// 每个技能 = 一套版式 + 提示词骨架 + 配色方案 + 来源案例。选技能即可开画。

export interface DesignSkill {
  id: string
  name: string
  /** 来源案例（技能是从案例沉淀来的） */
  from: string
  /** 封面（真实作品图） */
  cover: string
  category: '产品' | '珠宝' | '建筑' | '广告' | '网页' | 'UI·VI' | '动漫' | '品牌' | '电商' | '社媒'
  tags: string[]
  /** 选中后自动填进对话框的提示词骨架 */
  prompt: string
  /** 该技能的默认配色（可被品牌素材覆盖） */
  palette: string[]
  /** 出图比例 */
  ratio: '1:1' | '3:4' | '4:3' | '16:9' | '9:16'
}

export const designSkills: DesignSkill[] = [
  {
    id: 'sk-jewelry-macro',
    name: '珠宝大片 · 镶嵌特写',
    from: '某高级珠宝品牌 · 上新主视觉',
    cover: 'gallery/jewelry.jpg',
    category: '珠宝',
    tags: ['微距', '影棚光', '黑绒背景'],
    prompt: '做一张珠宝主视觉：祖母绿钻戒，黑绒背景，单点柔光，微距质感，高级感留白',
    palette: ['#2f6b4f', '#c9a227', '#0e0d0c'],
    ratio: '4:3',
  },
  {
    id: 'sk-product-render',
    name: '产品渲染 · 工业造型',
    from: '3C 数码旗舰店 · 主图体系',
    cover: 'gallery/product.jpg',
    category: '产品',
    tags: ['材质渲染', '轮廓光', '科技感'],
    prompt: '做一张产品渲染图：哑光黑 + 拉丝钛金属咖啡机，深色背景，轮廓光，工业设计质感',
    palette: ['#272219', '#c8bfb0', '#ff6b2c'],
    ratio: '4:3',
  },
  {
    id: 'sk-arch-dusk',
    name: '建筑效果图 · 黄昏氛围',
    from: '精品酒店集团 · 6 城 11 店物料',
    cover: 'gallery/architecture.jpg',
    category: '建筑',
    tags: ['archviz', '夜景', '水景反射'],
    prompt: '做一张建筑效果图：极简混凝土与玻璃别墅，黄昏，室内暖光，前景水景倒影，电影感构图',
    palette: ['#2b3a42', '#e0a45e', '#0e0d0c'],
    ratio: '16:9',
  },
  {
    id: 'sk-ad-impact',
    name: '广告主视觉 · 高冲击合成',
    from: '运动品牌 · 大促 Campaign',
    cover: 'gallery/advertising.jpg',
    category: '广告',
    tags: ['悬浮', '泼溅', '强对比'],
    prompt: '做一张广告主视觉：运动鞋悬浮空中，橙色颜料泼溅爆发，深色背景，强动感',
    palette: ['#ff6b2c', '#0e0d0c', '#f4efe6'],
    ratio: '4:3',
  },
  {
    id: 'sk-web-hero',
    name: '官网首屏 · 暗色成组',
    from: '电商设计服务商 · 官网改版',
    cover: 'gallery/web.jpg',
    category: '网页',
    tags: ['首屏', '多端', '暗色主题'],
    prompt: '做一个官网首屏：暗色主题，暖橙点缀，笔记本与手机双端展示，编辑式排版',
    palette: ['#17150f', '#ff6b2c', '#c8bfb0'],
    ratio: '16:9',
  },
  {
    id: 'sk-vi-apply',
    name: 'VI 应用 · 名片与物料',
    from: '轻奢品牌标识 · 交付即上架',
    cover: 'gallery/ui-vi.jpg',
    category: 'UI·VI',
    tags: ['品牌规范', '压印', '应用物料'],
    prompt: '做一套 VI 应用：压印名片、色卡、信封，暖橙与炭黑配色，暗色桌面俯拍',
    palette: ['#b8860b', '#1c1c1c', '#f4efe6'],
    ratio: '4:3',
  },
  {
    id: 'sk-anime-char',
    name: '动漫角色 · 氛围插画',
    from: '内容 IP 孵化 · 角色设定',
    cover: 'gallery/anime.jpg',
    category: '动漫',
    tags: ['角色设定', '樱花', '逆光'],
    prompt: '画一个动漫角色：长发少女立于樱花树下，黄昏逆光，暖色调，日式动画质感',
    palette: ['#ff7096', '#f4a300', '#2b1b2e'],
    ratio: '9:16',
  },
  {
    id: 'sk-brand-key',
    name: '品牌主视觉 · 丝绸质感',
    from: '新消费美妆品牌 · 详情页体系',
    cover: 'gallery/brand.jpg',
    category: '品牌',
    tags: ['主视觉', '情绪板', '金色粒子'],
    prompt: '做一张品牌主视觉：琥珀色丝绸波浪，金色粒子漂浮，暗色高级背景，电影感',
    palette: ['#ff8a4c', '#c9a227', '#0e0d0c'],
    ratio: '4:3',
  },
  {
    id: 'sk-ecom-detail',
    name: '电商详情页 · 成分卖点',
    from: '美妆成分详情页 · 合规过审',
    cover: 'gallery/jewelry.jpg',
    category: '电商',
    tags: ['卖点骨架', '合规校验', '模块化'],
    prompt: '做一版美妆详情页：成分表与功效卖点分离，主图 + 三段卖点 + 参数位，合规表述',
    palette: ['#d63384', '#f4efe6', '#1c1c1c'],
    ratio: '3:4',
  },
  {
    id: 'sk-social-cover',
    name: '社媒封面 · 竖版爆款',
    from: '小红书种草图 · 信息流点击模型',
    cover: 'gallery/advertising.jpg',
    category: '社媒',
    tags: ['封面钩子', '竖版', '三段式'],
    prompt: '做一张小红书封面：竖版，主图 + 一句钩子标题 + 三点利益，暖色高对比',
    palette: ['#ff2e63', '#ffd166', '#0e0d0c'],
    ratio: '3:4',
  },
  {
    id: 'sk-pack-series',
    name: '包装视觉 · 国潮系列',
    from: '茶叶礼盒 · 印刷前预览',
    cover: 'gallery/ui-vi.jpg',
    category: '品牌',
    tags: ['盒型', '烫印', '系列色'],
    prompt: '做一套包装：国潮礼盒，主视觉面 + 盒型结构，烫金细节，系列配色统一',
    palette: ['#2f6b4f', '#c9a227', '#0e0d0c'],
    ratio: '1:1',
  },
  {
    id: 'sk-poster-promo',
    name: '海报主视觉 · 大促利益点',
    from: '618 大促主视觉 · 多尺寸延展',
    cover: 'gallery/product.jpg',
    category: '广告',
    tags: ['大促', '满减', '多尺寸'],
    prompt: '做一张大促海报：大字标题 + 利益点色块，强对比，可延展到方图/竖图/横图',
    palette: ['#e23b5a', '#ffd166', '#1c1c1c'],
    ratio: '3:4',
  },
]

export const skillCategories = ['全部', '产品', '珠宝', '建筑', '广告', '网页', 'UI·VI', '动漫', '品牌', '电商', '社媒'] as const
