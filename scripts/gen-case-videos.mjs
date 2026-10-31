// 为 2 个重点客户案例生成真实短片（火山方舟 Ark · Seedance 1.0 pro fast），落盘 public/cases/*.mp4
// 用法：node scripts/gen-case-videos.mjs
// 说明：Ark 视频是异步任务（POST /tasks → GET /tasks/{id} → content.video_url）。
//       密钥从 AIDesignPlatform/.env 的 ARK_API_KEY 读取。
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
const outDir = join(root, 'public', 'cases')
mkdirSync(outDir, { recursive: true })

let KEY = process.env.ARK_API_KEY
if (!KEY) {
  const envPath = 'E:/AI/AIDesignPlatform/.env'
  if (existsSync(envPath)) {
    const m = readFileSync(envPath, 'utf8').match(/^ARK_API_KEY=(ark-[^\r\n]+)/m)
    if (m) KEY = m[1].trim()
  }
}
if (!KEY) {
  console.error('缺少 ARK_API_KEY')
  process.exit(1)
}

const BASE = 'https://ark.cn-beijing.volces.com/api/v3/contents/generations/tasks'
const MODEL = 'doubao-seedance-1-0-pro-fast-251015'

const jobs = [
  {
    id: 'case-beauty',
    prompt:
      '新消费美妆品牌视觉短片，粉色高级感，精华瓶产品缓慢旋转，光影流转，镜头缓慢推近，商业广告质感，干净背景',
  },
  {
    id: 'case-hotel',
    prompt:
      '精品酒店集团节日氛围短片，墨绿与暖金色调，客房暖光渐亮，窗外城市夜景，镜头缓慢横移，高端酒旅质感',
  },
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function submit(prompt) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({ model: MODEL, content: [{ type: 'text', text: prompt }] }),
  })
  const json = await res.json()
  if (!res.ok || !json.id) throw new Error(`提交失败 HTTP ${res.status} ${JSON.stringify(json).slice(0, 160)}`)
  return json.id
}

async function poll(id, timeoutMs = 300000) {
  const started = Date.now()
  for (;;) {
    await sleep(10000)
    const res = await fetch(`${BASE}/${id}`, { headers: { Authorization: `Bearer ${KEY}` } })
    const json = await res.json()
    const st = json.status
    if (st === 'succeeded') {
      const url = json.content?.video_url
      if (!url) throw new Error('成功但无 video_url')
      return url
    }
    if (st === 'failed' || st === 'cancelled' || st === 'expired') {
      throw new Error(`任务失败 status=${st}`)
    }
    if (Date.now() - started > timeoutMs) throw new Error(`超时（最后一次 ${st}）`)
  }
}

let ok = 0
for (const j of jobs) {
  const out = join(outDir, `${j.id}.mp4`)
  if (existsSync(out) && readFileSync(out).length > 100000) {
    console.log(`• ${j.id}.mp4 已存在，跳过`)
    ok++
    continue
  }
  try {
    const id = await submit(j.prompt)
    console.log(`→ ${j.id}: 已提交 ${id}`)
    const url = await poll(id)
    const r = await fetch(url)
    if (!r.ok) throw new Error(`下载失败 HTTP ${r.status}`)
    const buf = Buffer.from(await r.arrayBuffer())
    if (buf.length < 50000) throw new Error(`视频过小 ${buf.length}B`)
    writeFileSync(out, buf)
    console.log(`✓ ${j.id}.mp4 (${(buf.length / 1048576).toFixed(1)} MB)`)
    ok++
  } catch (e) {
    console.error(`✗ ${j.id}: ${e?.message || e}`)
  }
}
console.log(`\n完成 ${ok}/${jobs.length} 条视频，落盘 ${outDir}`)
if (ok < jobs.length) process.exit(1)
