// DesignerForm · 内容数据
// 模板样例（多行业）+ 客户/品牌落地案例。纯数据，组件层据此渲染。

export type ThumbKind =
  | 'poster'
  | 'ecom'
  | 'logo'
  | 'social'
  | 'packaging'
  | 'menu'
  | 'card'
  | 'banner'

export interface DesignTemplate {
  id: string
  name: string
  category: string // 用于筛选的 key
  categoryLabel: string
  kind: ThumbKind // 缩略图版式
  accent: string // 主题色
  tags: string[]
  desc: string
}

export const templateCategories: { key: string; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'ecom', label: '电商详情' },
  { key: 'poster', label: '海报' },
  { key: 'social', label: '社媒' },
  { key: 'logo', label: '品牌标识' },
  { key: 'packaging', label: '包装' },
  { key: 'menu', label: '菜单' },
  { key: 'card', label: '名片' },
  { key: 'banner', label: '横幅' },
]

export const templates: DesignTemplate[] = [
  {
    id: 'tpl-ecom-spring',
    name: '春季新品详情页',
    category: 'ecom',
    categoryLabel: '电商详情',
    kind: 'ecom',
    accent: '#ff6b2c',
    tags: ['转化率优先', '多SKU', '卖点骨架'],
    desc: '参数位自动代入，改文案不重排，主图与卖点层级一次性到位。',
  },
  {
    id: 'tpl-poster-618',
    name: '大促主视觉海报',
    category: 'poster',
    categoryLabel: '海报',
    kind: 'poster',
    accent: '#e23b5a',
    tags: ['618', '满减', '强对比'],
    desc: '大字标题 + 利益点色块，套版即出，多尺寸一键延展。',
  },
  {
    id: 'tpl-logo-lux',
    name: '轻奢品牌标识',
    category: 'logo',
    categoryLabel: '品牌标识',
    kind: 'logo',
    accent: '#1c1c1c',
    tags: ['极简', '可注册', '黑白'],
    desc: '字标 + 圆形徽标组合，附标准色与留白规范，交付即上架。',
  },
  {
    id: 'tpl-social-xhs',
    name: '小红书种草图',
    category: 'social',
    categoryLabel: '社媒',
    kind: 'social',
    accent: '#ff2e63',
    tags: ['笔记', '爆款封面', '竖版'],
    desc: '封面主图 + 三段式文案结构，适配信息流点击模型。',
  },
  {
    id: 'tpl-pack-tea',
    name: '茶叶礼盒包装',
    category: 'packaging',
    categoryLabel: '包装',
    kind: 'packaging',
    accent: '#2f6b4f',
    tags: ['国潮', '礼赠', '工艺感'],
    desc: '盒型结构 + 主视觉面，含材质与烫印提示，印刷前可预览。',
  },
  {
    id: 'tpl-menu-cafe',
    name: '咖啡馆菜单',
    category: 'menu',
    categoryLabel: '菜单',
    kind: 'menu',
    accent: '#7a4a2b',
    tags: ['堂食', '手冲', '分区'],
    desc: '饮品/轻食分区排版，价格与标注自动对齐，改价不破版。',
  },
  {
    id: 'tpl-card-biz',
    name: '商务名片',
    category: 'card',
    categoryLabel: '名片',
    kind: 'card',
    accent: '#2b4cff',
    tags: ['极简', '留白', '双面'],
    desc: '正面识别 + 背面信息，标准尺寸导出，扫码即存。',
  },
  {
    id: 'tpl-banner-live',
    name: '直播间贴片横幅',
    category: 'banner',
    categoryLabel: '横幅',
    kind: 'banner',
    accent: '#ff3d00',
    tags: ['直播', '贴片', '利益点'],
    desc: '主播贴片 + 利益点条，横版竖版同构，秒级换播。',
  },
  {
    id: 'tpl-ecom-beauty',
    name: '美妆成分详情页',
    category: 'ecom',
    categoryLabel: '电商详情',
    kind: 'ecom',
    accent: '#d63384',
    tags: ['成分', '功效', '合规'],
    desc: '成分表与功效卖点分离，合规词自动校验，避免下架风险。',
  },
  {
    id: 'tpl-poster-hire',
    name: '校招招聘海报',
    category: 'poster',
    categoryLabel: '海报',
    kind: 'poster',
    accent: '#3a86ff',
    tags: ['校招', '简洁', '信息层级'],
    desc: '岗位 + 亮点 + 投递方式三段，社团渠道直接复用。',
  },
  {
    id: 'tpl-social-food',
    name: '探店打卡社媒图',
    category: 'social',
    categoryLabel: '社媒',
    kind: 'social',
    accent: '#f4a300',
    tags: ['探店', '打卡', '暖色'],
    desc: '门店实拍 + 一句话钩子，本地生活投放模板化。',
  },
  {
    id: 'tpl-pack-beer',
    name: '精酿啤酒标',
    category: 'packaging',
    categoryLabel: '包装',
    kind: 'packaging',
    accent: '#c9a227',
    tags: ['精酿', '个性', '系列'],
    desc: '系列化酒标，风味色与编号体系一致，整组一键换色。',
  },
  {
    id: 'tpl-logo-tech',
    name: '科技公司字标',
    category: 'logo',
    categoryLabel: '品牌标识',
    kind: 'logo',
    accent: '#00b3a4',
    tags: ['科技', '渐变', '现代'],
    desc: '几何字标 + 辅助图形，深浅底两版同源，命名体系可延展产品线。',
  },
  {
    id: 'tpl-ecom-home',
    name: '家居生活详情页',
    category: 'ecom',
    categoryLabel: '电商详情',
    kind: 'ecom',
    accent: '#8a6f4d',
    tags: ['场景图', '材质', '尺寸表'],
    desc: '场景化卖点分区，尺寸/材质参数位自动代入， 家居类目规范内置。',
  },
  {
    id: 'tpl-poster-pet',
    name: '宠物友好门店海报',
    category: 'poster',
    categoryLabel: '海报',
    kind: 'poster',
    accent: '#ff8c42',
    tags: ['开业', '宠物', '社区'],
    desc: '开业主视觉 + 优惠钩子，社区投放与门店易拉宝同源延展。',
  },
  {
    id: 'tpl-social-pet',
    name: '萌宠好物种草图',
    category: 'social',
    categoryLabel: '社媒',
    kind: 'social',
    accent: '#ff7096',
    tags: ['萌宠', '测评', '竖版'],
    desc: '测评三段式封面，好物清单结构化，宠物垂类账号批量产出。',
  },
  {
    id: 'tpl-pack-snack',
    name: '国潮零食包装',
    category: 'packaging',
    categoryLabel: '包装',
    kind: 'packaging',
    accent: '#e8842c',
    tags: ['国潮', '插画', '系列'],
    desc: '插画主视觉 + SKU 色系管理，口味系列一键换色不破版。',
  },
  {
    id: 'tpl-menu-bbq',
    name: '深夜烧烤菜单',
    category: 'menu',
    categoryLabel: '菜单',
    kind: 'menu',
    accent: '#a33327',
    tags: ['烧烤', '夜宵', '拼桌'],
    desc: '烤串/酒水分区，套餐组合区独立排版，时令菜品行级增删。',
  },
  {
    id: 'tpl-card-member',
    name: '会员权益卡',
    category: 'card',
    categoryLabel: '名片',
    kind: 'card',
    accent: '#b8860b',
    tags: ['会员', '权益', '金卡'],
    desc: '等级权益分区呈现，正面权益背面规则，VIP 体系一次配齐。',
  },
  {
    id: 'tpl-banner-hotel',
    name: '酒店周年庆横幅',
    category: 'banner',
    categoryLabel: '横幅',
    kind: 'banner',
    accent: '#0e7c7b',
    tags: ['酒旅', '周年庆', '官网'],
    desc: '官网 Banner + 预订弹窗贴图同构，多城门店换城标不改版式。',
  },
]

export interface CustomerCase {
  id: string
  name: string
  industry: string
  initial: string
  quote: string
  challenge: string
  metrics: { n: string; l: string }[]
}

export const customerCases: CustomerCase[] = [
  {
    id: 'case-beauty',
    name: '某新消费美妆品牌',
    industry: '美妆电商 · 天猫旗舰店',
    initial: 'M',
    quote: '上新节奏从「设计排期两周」变成「当天出稿、当天上架」。',
    challenge:
      '大促期间详情页与短视频物料需求暴涨，外包设计排期长、风格不统一，复用率低。接入 DesignerForm 后，运营按品类模板自助改文案出图，设计团队只做品牌与质量把关。',
    metrics: [
      { n: '-72%', l: '设计交付周期' },
      { n: '+340%', l: '详情页月产出' },
      { n: '-58%', l: '单稿设计成本' },
    ],
  },
  {
    id: 'case-fnb',
    name: '区域连锁餐饮',
    industry: '餐饮 · 32 家门店',
    initial: 'F',
    quote: '新菜上市，门店物料 T+0 同步，再也不用等总部寄海报。',
    challenge:
      '菜单、促销、节日物料长期依赖总部设计，区域门店被动等待。用 DesignerForm 的菜单与横幅模板，区域运营改价改图即时出稿，品牌规范内置不跑偏。',
    metrics: [
      { n: 'T+0', l: '门店物料更新' },
      { n: '-65%', l: '门店印刷物料' },
      { n: '3×', l: '上新速度' },
    ],
  },
  {
    id: 'case-3c',
    name: '3C 数码旗舰店',
    industry: '3C 数码 · 京东自营',
    initial: '3',
    quote: '合规词自动校验，大促主图不再因极限词被驳回。',
    challenge:
      '3C 类目对参数与功效表述要求严苛，人工审图易漏。DesignerForm 内置类目合规细则，生成即过审，主图产出翻倍。',
    metrics: [
      { n: '-91%', l: '合规驳回率' },
      { n: '+260%', l: '主图月产出' },
      { n: '0', l: '极限词事故' },
    ],
  },
  {
    id: 'case-baby',
    name: '母婴品牌',
    industry: '母婴 · 私域 + 电商',
    initial: 'B',
    quote: '一场活动，1 小时出齐电商页、社群图、朋友圈海报。',
    challenge:
      '活动频次高、渠道多，设计外包成本压力大。用模板库统一视觉语言，市场同学自助产出，设计师聚焦核心创意。',
    metrics: [
      { n: '1h', l: '活动全渠道出稿' },
      { n: '-70%', l: '设计外包支出' },
      { n: '+5', l: '月活动频次' },
    ],
  },
  {
    id: 'case-edu',
    name: '知识付费机构',
    industry: '教育 · 在线课程',
    initial: 'E',
    quote: '海报日更 30+，投放团队终于不为素材发愁。',
    challenge:
      '信息流投放对素材消耗量极大，单一设计无法支撑。DesignerForm 让投放同学按转化结构自助生成变体，A/B 素材供给稳定。',
    metrics: [
      { n: '30+', l: '海报日更' },
      { n: '-34%', l: '单线索成本' },
      { n: '+48%', l: '素材点击率' },
    ],
  },
  {
    id: 'case-life',
    name: '本地生活服务商',
    industry: '生活服务 · 商户赋能',
    initial: 'L',
    quote: '给商户的模板能复用 90%，交付 SLA 直接砍掉八成。',
    challenge:
      '服务上千中小商户，每家都要定制物料。DesignerForm 把通用模板 + 商户变量抽离，交付从「定制」变「填表」。',
    metrics: [
      { n: '90%', l: '模板复用率' },
      { n: '-80%', l: '交付 SLA' },
      { n: '+2.4×', l: '商户覆盖' },
    ],
  },
  {
    id: 'case-home',
    name: '家居生活方式品牌',
    industry: '家居 · 全渠道零售',
    initial: 'H',
    quote: '一个 SKU 的详情页模块，复用到全店 200 个商品上。',
    challenge:
      '家居 SKU 多、场景图杂，详情页风格随设计师波动大。用 DesignerForm 建立场景化模块库后，新品详情页按模块拼装，风格与品牌规范全程受控。',
    metrics: [
      { n: '200+', l: 'SKU 模块复用' },
      { n: '-63%', l: '新品上架周期' },
      { n: '+41%', l: '详情页转化' },
    ],
  },
  {
    id: 'case-pet',
    name: '宠物用品品牌',
    industry: '宠物 · 抖音 + 天猫',
    initial: 'P',
    quote: '达人切片、种草图、详情页，一个 Brief 三端同发。',
    challenge:
      '宠物赛道内容消耗极快，达人合作切片与自营素材常常脱节。DesignerForm 把 Brief 结构化后一次产出三端素材，账号矩阵日更不断供。',
    metrics: [
      { n: '3 端', l: '一次 Brief 同发' },
      { n: '日更', l: '矩阵账号供给' },
      { n: '+87%', l: '内容产能' },
    ],
  },
  {
    id: 'case-hotel',
    name: '精品酒店集团',
    industry: '酒旅 · 6 城 11 店',
    initial: 'V',
    quote: '11 家店的节日物料，总部下午发版，当晚全城上线。',
    challenge:
      '跨城门店物料版本混乱，节日campaign常常滞后。DesignerForm 以城市变量 + 统一版式管理全集团物料，一次发版全店同步。',
    metrics: [
      { n: '11 店', l: '一次发版同步' },
      { n: 'T+0', l: '节日 campaign' },
      { n: '-77%', l: '设计工单' },
    ],
  },
  {
    id: 'case-agency',
    name: '电商设计服务商',
    industry: '服务商 · 代运营 40+ 店铺',
    initial: 'A',
    quote: '同样的团队，接单量翻倍——不用再招一个设计组。',
    challenge:
      '代运营客户越签越多，设计产能成为接单天花板。DesignerForm 让初级设计按模板出 80% 的常规稿，资深设计只做定制品，人效直接决定利润。',
    metrics: [
      { n: '2×', l: '团队接单量' },
      { n: '80%', l: '常规稿模板化' },
      { n: '+55%', l: '人效毛利' },
    ],
  },
]
