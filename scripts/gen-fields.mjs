// 一次性生成新设计领域的真实作品图（硅基流动 Kolors），落盘到 public/gallery/
// 用法：node scripts/gen-fields.mjs
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const outDir = join(root, 'public', 'gallery')
mkdirSync(outDir, { recursive: true })

// 密钥从 AIDesignPlatform/.env 读取（本机已配置）
const envPath = 'E:/AI/AIDesignPlatform/.env'
let KEY = process.env.SILICONFLOW_KEY
if (!KEY && existsSync(envPath)) {
  const txt = await import('node:fs').then((m) => m.readFileSync(envPath, 'utf8'))
  const m = txt.match(/IMAGE_GEN_API_KEY=([^\r\n]+)/)
  if (m) KEY = m[1].trim()
}
if (!KEY) {
  console.error('缺少 IMAGE_GEN_API_KEY，无法生成')
  process.exit(1)
}

const ENDPOINT = 'https://api.siliconflow.cn/v1/images/generations'
const MODEL = 'Kwai-Kolors/Kolors'

const jobs = [
  { name: 'interior', prompt: 'Modern luxury living room interior design, floor-to-ceiling windows, warm wood and cream tones, soft natural light, minimalist furniture, architectural photography, high detail, photorealistic' },
  { name: 'interior-2', prompt: 'Scandinavian bedroom interior, calm beige palette, soft linen bedding, monstera plant, morning light, interior design render, photorealistic, cozy' },
  { name: 'fashion', prompt: 'Haute couture fashion editorial, elegant flowing evening gown, studio lighting, refined silk fabric texture, Vogue style, high fashion photography, full body' },
  { name: 'fashion-2', prompt: 'Streetwear fashion lookbook, oversized silhouette jacket, urban concrete backdrop, bold color blocking, sneaker culture, editorial photography' },
  { name: 'game', prompt: 'Fantasy game environment concept art, ancient floating temple in misty mountains, epic cinematic golden lighting, detailed matte painting, AAA game art' },
  { name: 'game-2', prompt: 'Game character concept art, armored heroine with intricate costume design, fantasy RPG style, dramatic rim light, digital painting, highly detailed' },
]

async function genOne(job) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({
      model: MODEL,
      prompt: job.prompt,
      image_size: '1024x1024',
      batch_size: 1,
      num_inference_steps: 20,
      guidance_scale: 7.5,
    }),
  })
  const json = await res.json()
  if (!res.ok) {
    console.error(`✗ ${job.name}: HTTP ${res.status}`, JSON.stringify(json).slice(0, 200))
    return false
  }
  const imgs = json.images ?? json.data
  if (!Array.isArray(imgs) || !imgs[0]?.url) {
    console.error(`✗ ${job.name}: 无图片地址`, JSON.stringify(json).slice(0, 200))
    return false
  }
  const url = imgs[0].url
  const imgRes = await fetch(url)
  const buf = Buffer.from(await imgRes.arrayBuffer())
  const out = join(outDir, `${job.name}.jpg`)
  writeFileSync(out, buf)
  console.log(`✓ ${job.name}.jpg (${buf.length} bytes)`)
  return true
}

for (const j of jobs) {
  try {
    await genOne(j)
  } catch (e) {
    console.error(`✗ ${j.name}:`, e.message)
  }
}
console.log('done')
