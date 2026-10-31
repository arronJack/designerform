// 生成首屏轮换广告的 4 张真实设计预览图，落盘 public/hero/
// 用法：node scripts/gen-hero.mjs
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const outDir = join(root, 'public', 'hero')
mkdirSync(outDir, { recursive: true })

let KEY = process.env.SILICONFLOW_KEY
if (!KEY) {
  const envPath = 'E:/AI/AIDesignPlatform/.env'
  if (existsSync(envPath)) {
    const m = readFileSync(envPath, 'utf8').match(/IMAGE_GEN_API_KEY=(sk-[A-Za-z0-9]+)/)
    if (m) KEY = m[1]
  }
}
if (!KEY) {
  console.error('缺少硅基流动密钥')
  process.exit(1)
}

const ENDPOINT = 'https://api.siliconflow.cn/v1/images/generations'
const MODEL = 'Qwen/Qwen-Image'

const jobs = [
  {
    id: 'hero-spring',
    prompt:
      '春季新品保湿精华产品视觉，浅橘与奶油色调，玻璃精华瓶置于柔和花瓣与光斑中，清新高级，商业美妆摄影，干净背景，竖版构图',
  },
  {
    id: 'hero-drink',
    prompt:
      '网红饮品种草海报视觉，粉色调，手摇奶茶与新鲜水果特写，竖版社交封面风格，清新甜美，ins 风，光影通透',
  },
  {
    id: 'hero-tea',
    prompt:
      '明前龙井茶叶礼盒包装设计，青绿与烫金配色，山水水墨纹理，盒型立体展示，国潮雅致，产品摄影，高级质感',
  },
  {
    id: 'hero-brand',
    prompt:
      '科技品牌视觉，深蓝渐变背景，极简几何字母标志与圆形徽章组合，辅助图形系统，现代高级，品牌标志展示，干净有力',
  },
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
      body: JSON.stringify({ model: MODEL, prompt: job.prompt, image_size: '1024x1280', batch_size: 1 }),
    })
    const json = await res.json()
    if (!res.ok) {
      console.error(`✗ ${job.id}: HTTP ${res.status} ${JSON.stringify(json).slice(0, 160)}`)
      return false
    }
    const imgs = json.images ?? json.data
    if (!Array.isArray(imgs) || !imgs[0]?.url) {
      console.error(`✗ ${job.id}: 无图片地址`)
      return false
    }
    const r = await fetch(imgs[0].url)
    if (!r.ok) throw new Error(`下载 HTTP ${r.status}`)
    const buf = Buffer.from(await r.arrayBuffer())
    if (buf.length < 5000) throw new Error(`图片过小 ${buf.length}`)
    writeFileSync(out, buf)
    console.log(`✓ ${job.id}.jpg (${buf.length} bytes)`)
    return true
  } catch (e) {
    console.error(`✗ ${job.id}: ${e?.message || e}`)
    return false
  }
}

const results = []
for (const j of jobs) results.push(await genOne(j))
const ok = results.filter(Boolean).length

// PNG → 真 JPEG
try {
  execSync(
    `python3 -c "import os;from PIL import Image;d=r'${outDir}';\n` +
      `[Image.open(os.path.join(d,f)).convert('RGB').save(os.path.join(d,f),'JPEG',quality=88,optimize=True,progressive=True) for f in os.listdir(d) if f.endswith('.jpg')]"`,
    { stdio: 'inherit' },
  )
  console.log('已转为真 JPEG')
} catch {
  console.warn('⚠️ 未找到 Pillow，图片仍为 PNG 字节')
}

console.log(`\n完成 ${ok}/${jobs.length} 张，落盘 ${outDir}`)
if (ok < jobs.length) process.exit(1)
