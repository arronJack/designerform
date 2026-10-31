// DesignerForm · 设计领域与创作场景数据
// 领域 = 真实生成的作品图（public/gallery/*.jpg）；场景 = 对齐主流 AI 设计平台的五大用例。

export interface DesignField {
  id: string
  name: string
  en: string
  desc: string
  image: string // 相对 base 的路径
  tags: string[]
  span: 'wide' | 'tall' | 'normal' // 非对称网格跨度
  /** 详情页作品廊（缺省回退到 image） */
  gallery?: string[]
  /** 详情页能力亮点 */
  highlights?: string[]
}

export const designFields: DesignField[] = [
  {
    id: 'product',
    name: '产品设计',
    en: 'Product',
    desc: '工业造型与材质表现，从概念草图到电商级产品渲染，一套提示词体系反复出图。',
    image: 'gallery/product.jpg',
    tags: ['工业造型', '材质渲染', '场景图'],
    span: 'wide',
  },
  {
    id: 'jewelry',
    name: '珠宝设计',
    en: 'Jewelry',
    desc: '镶嵌结构与光影质感，主石/配石分组出图，系列款一键延展同风格。',
    image: 'gallery/jewelry.jpg',
    tags: ['高级珠宝', '镶嵌', '影棚光'],
    span: 'normal',
  },
  {
    id: 'architecture',
    name: '建筑设计',
    en: 'Architecture',
    desc: '方案效果图与氛围表达，日景夜景双版本，材质与光环境可分项控制。',
    image: 'gallery/architecture.jpg',
    tags: ['建筑效果图', '氛围', '室内外'],
    span: 'normal',
  },
  {
    id: 'advertising',
    name: '广告设计',
    en: 'Advertising',
    desc: '高冲击力主视觉，产品与动效元素混排，多尺寸投放素材一次出齐。',
    image: 'gallery/advertising.jpg',
    tags: ['主视觉', '创意合成', '投放'],
    span: 'wide',
  },
  {
    id: 'web',
    name: '网页设计',
    en: 'Web',
    desc: '整站视觉与页面版式，暗色/亮色双主题，落地页、官网、专题页同源延展。',
    image: 'gallery/web.jpg',
    tags: ['官网', '落地页', '多端'],
    span: 'normal',
  },
  {
    id: 'ui-vi',
    name: 'UI · VI 设计',
    en: 'UI / VI',
    desc: '界面规范与品牌视觉识别，组件库、色彩体系、应用物料一体交付。',
    image: 'gallery/ui-vi.jpg',
    tags: ['组件库', '品牌规范', '应用物料'],
    span: 'normal',
  },
  {
    id: 'anime',
    name: '动漫 · 插画',
    en: 'Anime',
    desc: '角色设定与场景插画，画风锁定后批量出图，分镜与封面直接可用。',
    image: 'gallery/anime.jpg',
    tags: ['角色设定', '插画', '分镜'],
    span: 'normal',
  },
  {
    id: 'brand',
    name: '品牌视觉',
    en: 'Brand',
    desc: '品牌主视觉与情绪板，质感、色调、材质统一管理，全渠道物料不跑偏。',
    image: 'gallery/brand.jpg',
    tags: ['主视觉', '情绪板', '质感'],
    span: 'wide',
  },
  {
    id: 'interior',
    name: '室内设计',
    en: 'Interior',
    desc: '住宅与商业空间的效果图与软装方案，日景夜景双版本，材质与光环境可分项控制。',
    image: 'gallery/interior.jpg',
    gallery: ['gallery/interior.jpg', 'gallery/interior-2.jpg'],
    tags: ['空间效果图', '软装搭配', '光影'],
    span: 'wide',
    highlights: ['客餐厅 / 卧室 / 商业空间一键出图', '日景夜景与季节光环境切换', '软装材质与配色同步延展'],
  },
  {
    id: 'fashion',
    name: '服装设计',
    en: 'Fashion',
    desc: '从灵感企划到成衣视觉，时装大片、Lookbook、潮牌联名一体产出，画风锁定后批量出图。',
    image: 'gallery/fashion.jpg',
    gallery: ['gallery/fashion.jpg', 'gallery/fashion-2.jpg'],
    tags: ['时装大片', 'Lookbook', '潮牌'],
    span: 'normal',
    highlights: ['高定时装大片与电商平铺图', '街拍 / 秀场 / Lookbook 风格延展', '系列款配色与图案统一管控'],
  },
  {
    id: 'game',
    name: '游戏场景',
    en: 'Game Art',
    desc: '游戏世界观下的场景与角色概念，写实与二次元两路画风，分镜、原画、宣传图成套供给。',
    image: 'gallery/game.jpg',
    gallery: ['gallery/game.jpg', 'gallery/game-2.jpg'],
    tags: ['场景原画', '角色设定', '概念图'],
    span: 'normal',
    highlights: ['场景 / 角色 / 道具概念图', '写实与二次元双画风锁定', '宣传图与加载页素材成套'],
  },
]

export interface Scenario {
  id: string
  no: string
  name: string
  desc: string
  points: string[]
}

/** 五大创作场景（对齐主流 AI 设计平台的用例分类） */
export const scenarios: Scenario[] = [
  {
    id: 'product-design',
    no: '01',
    name: '产品设计',
    desc: '工业产品从概念到成品的视觉表达：造型、材质、场景、包装一体化。',
    points: ['产品渲染图', '材质与配色方案', '包装与场景图'],
  },
  {
    id: 'creative-style',
    no: '02',
    name: '创意风格',
    desc: '锁定一种画风与调性，批量产出风格一致的系列作品，风格可复用可迁移。',
    points: ['风格锁定', '系列延展', '跨品类迁移'],
  },
  {
    id: 'social-content',
    no: '03',
    name: '社媒内容',
    desc: '面向小红书 / 抖音 / 公众号的内容素材，封面、图文、竖版视频封面批量供给。',
    points: ['爆款封面', '图文成套', '多平台尺寸'],
  },
  {
    id: 'brand-visual',
    no: '04',
    name: '品牌视觉',
    desc: '品牌主视觉与 VI 体系：标志、色彩、字体、应用物料成套输出并保持规范。',
    points: ['主视觉推导', 'VI 应用', '规范落地'],
  },
  {
    id: 'marketing',
    no: '05',
    name: '营销素材',
    desc: '大促、上新、活动投放素材：主图、海报、Banner、详情页一键成套出稿。',
    points: ['大促主视觉', '投放多尺寸', '合规校验'],
  },
]
