// 生成「案例」全部真实配图（20 个设计模板 + 10 个客户案例），落盘到 public/cases/
// 用法：node scripts/gen-cases.mjs
// 说明：走硅基流动 Qwen-Image（中文文字渲染准确）。密钥优先 env SILICONFLOW_KEY，
//       否则从 AIDesignPlatform/.env 里找 sk- 开头的 IMAGE_GEN_API_KEY（含被注释的备用行）。
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const outDir = join(root, 'public', 'cases')
mkdirSync(outDir, { recursive: true })

// —— 取密钥 ——
let KEY = process.env.SILICONFLOW_KEY
if (!KEY) {
  const envPath = 'E:/AI/AIDesignPlatform/.env'
  if (existsSync(envPath)) {
    const txt = readFileSync(envPath, 'utf8')
    // 匹配任意位置的 IMAGE_GEN_API_KEY=sk-...（未注释或注释掉的备用行都算）
    const m = txt.match(/IMAGE_GEN_API_KEY=(sk-[A-Za-z0-9]+)/)
    if (m) KEY = m[1]
  }
}
if (!KEY) {
  console.error('缺少硅基流动密钥（SILICONFLOW_KEY 或 .env 中的 sk- 备份行）')
  process.exit(1)
}

const ENDPOINT = 'https://api.siliconflow.cn/v1/images/generations'
const MODEL = 'Qwen/Qwen-Image'
const SIZE = '1024x1024'

// —— 30 个案例配图 prompt（与 cases.ts 的 id 一一对应）——
const jobs = [
  // 20 个设计模板
  { id: 'tpl-ecom-spring', prompt: '春季新品护肤礼盒电商详情页视觉，浅杏色与嫩绿配色，产品置于柔和花影中，清新高级，商业摄影质感，竖版构图' },
  { id: 'tpl-poster-618', prompt: '618 大促主视觉海报，正红渐变背景，金色立体大字与价格利益点色块，商业促销氛围，强烈视觉冲击力，竖版' },
  { id: 'tpl-logo-lux', prompt: '轻奢品牌标识设计，极简几何字母标记，黑金配色，圆形徽章与字标组合，高级质感，置于纯净米白背景' },
  { id: 'tpl-social-xhs', prompt: '小红书种草图封面，竖版，奶油色调，手写体标题与产品特写，生活方式氛围，清新少女感，社交平台封面' },
  { id: 'tpl-pack-tea', prompt: '国潮茶叶礼盒包装设计，青绿与烫金配色，山水纹理，盒型立体展示，中式雅致，产品包装摄影' },
  { id: 'tpl-menu-cafe', prompt: '精品咖啡馆菜单设计，牛皮纸与深棕配色，手冲与意式分区排版，价格对齐，精致咖啡馆氛围，平面设计稿' },
  { id: 'tpl-card-biz', prompt: '极简商务名片设计，米白底色，细线分割，烫金姓名与职位，双面展示，高级质感，平铺摄影' },
  { id: 'tpl-banner-live', prompt: '直播间贴片横幅设计，亮橙与红色调，利益点标签与主播贴片，动态促销氛围，扁平视觉，横版' },
  { id: 'tpl-ecom-beauty', prompt: '美妆成分功效详情页视觉，粉紫渐变，精华瓶产品特写与成分图标注，科技感与高级感并存，竖版电商设计' },
  { id: 'tpl-poster-hire', prompt: '校园招聘海报设计，蓝白清爽配色，岗位信息层级清晰，几何插画点缀，年轻专业，竖版海报' },
  { id: 'tpl-social-food', prompt: '探店打卡社媒图，暖黄色调，餐厅美食特写与门店氛围，手写钩子文字，本地生活风格，竖版封面' },
  { id: 'tpl-pack-beer', prompt: '精酿啤酒标签设计，琥珀与深绿配色，复古徽章风格，系列酒标展示，个性潮流，包装平面' },
  { id: 'tpl-logo-tech', prompt: '科技公司字标设计，青蓝渐变，几何无衬线字体，辅助图形系统，现代极简，深色背景展示' },
  { id: 'tpl-ecom-home', prompt: '家居生活详情页视觉，原木与米咖色调，客厅场景与材质细节，尺寸参数标注，温暖治愈，竖版电商设计' },
  { id: 'tpl-poster-pet', prompt: '宠物友好门店开业海报，暖橙色调，萌宠插画与优惠信息，社区友好氛围，活泼亲切，竖版海报' },
  { id: 'tpl-social-pet', prompt: '萌宠好物种草封面，竖版，粉色调，宠物用品特写与三段式测评结构，可爱治愈，社交平台封面' },
  { id: 'tpl-pack-snack', prompt: '国潮零食包装设计，橙红与明黄，插画主视觉，系列口味色系，年轻潮流，包装立体展示' },
  { id: 'tpl-menu-bbq', prompt: '深夜烧烤菜单设计，深色背景与暖红灯光，烤串与酒水分区，套餐组合排版，烟火气氛围，平面菜单' },
  { id: 'tpl-card-member', prompt: '会员权益金卡设计，黑金配色，等级权益分区，磨砂质感与烫金工艺，VIP 高级感，卡片平铺' },
  { id: 'tpl-banner-hotel', prompt: '精品酒店周年庆官网横幅，墨绿与香槟金，建筑剪影与庆典氛围，优雅高级，宽幅横版' },
  // 10 个客户案例
  { id: 'case-beauty', prompt: '新消费美妆品牌视觉物料，粉调高级感，产品矩阵与品牌视觉，天猫旗舰店氛围，商业摄影' },
  { id: 'case-fnb', prompt: '区域连锁餐饮门店物料，暖色调美食与促销海报，菜单与横幅组合，烟火气，品牌统一视觉' },
  { id: 'case-3c', prompt: '3C 数码旗舰店产品视觉，深色科技背景，耳机与数码产品特写，冷光质感，京东自营风格' },
  { id: 'case-baby', prompt: '母婴品牌视觉物料，柔和粉蓝配色，婴儿用品与温馨场景，私域社群海报氛围，温柔治愈' },
  { id: 'case-edu', prompt: '知识付费在线课程海报，明亮蓝橙配色，讲师形象与课程信息层级，信息流投放风格，专业可信' },
  { id: 'case-life', prompt: '本地生活服务商商户物料，清新绿橙配色，门店与优惠信息，模板化海报组合，亲民活力' },
  { id: 'case-home', prompt: '家居生活方式品牌视觉，原木奶油色调，全屋场景与产品细节，温馨自然，全渠道零售氛围' },
  { id: 'case-pet', prompt: '宠物用品品牌内容视觉，明快色调，猫狗与用品互动，抖音种草切片风格，活泼可爱' },
  { id: 'case-hotel', prompt: '精品酒店集团视觉，墨绿与暖金，客房与建筑氛围，节日庆典布置，高端酒旅质感' },
  { id: 'case-agency', prompt: '电商设计服务商作品墙视觉，多品类设计稿拼贴，专业高效，工作室氛围，商务简洁' },
]

async function genOne(job) {
  const out = join(outDir, `${job.id}.jpg`)
  if (existsSync(out) && readFileSync(out).length > 20000) {
    console.log(`• ${job.id}.jpg 已存在，跳过`)
    return true
  }
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
      body: JSON.stringify({ model: MODEL, prompt: job.prompt, image_size: SIZE, batch_size: 1 }),
    })
    const json = await res.json()
    if (!res.ok) {
      console.error(`✗ ${job.id}: HTTP ${res.status} ${JSON.stringify(json).slice(0, 160)}`)
      return false
    }
    const imgs = json.images ?? json.data
    if (!Array.isArray(imgs) || !imgs[0]?.url) {
      console.error(`✗ ${job.id}: 无图片地址 ${JSON.stringify(json).slice(0, 160)}`)
      return false
    }
    const imgRes = await fetch(imgs[0].url)
    if (!imgRes.ok) {
      console.error(`✗ ${job.id}: 下载失败 HTTP ${imgRes.status}`)
      return false
    }
    const buf = Buffer.from(await imgRes.arrayBuffer())
    if (buf.length < 5000) {
      console.error(`✗ ${job.id}: 图片过小 ${buf.length}B`)
      return false
    }
    writeFileSync(out, buf)
    console.log(`✓ ${job.id}.jpg (${buf.length} bytes)`)
    return true
  } catch (e) {
    console.error(`✗ ${job.id}: ${e?.message || e}`)
    return false
  }
}

// 并发 3，控制速率
const CONC = 3
let idx = 0
const results = []
async function worker() {
  while (idx < jobs.length) {
    const job = jobs[idx++]
    results.push(await genOne(job))
  }
}
await Promise.all(Array.from({ length: CONC }, worker))
const ok = results.filter(Boolean).length
console.log(`\n生成：${ok}/${jobs.length} 张成功`)

// Qwen-Image 回包是 PNG；统一就地转成真 JPEG（体积更小、扩展名与内容一致）。
// 用系统 Python + Pillow 完成（本机已装）；缺失则保留 PNG 字节并提示。
if (ok > 0) {
  try {
    execSync(
      `python3 -c "import os;from PIL import Image;d=r'${outDir}';\n` +
        `[Image.open(os.path.join(d,f)).convert('RGB').save(os.path.join(d,f),'JPEG',quality=88,optimize=True,progressive=True) for f in os.listdir(d) if f.endswith('.jpg')]"`,
      { stdio: 'inherit' },
    )
    console.log('已转为真 JPEG')
  } catch {
    console.warn('⚠️ 未找到 Pillow，图片仍是 PNG 字节（扩展名 .jpg，浏览器一般可显示）')
  }
}
console.log(`落盘 ${outDir}`)
if (ok < jobs.length) process.exit(1)
