// 品牌素材配色提取：把上传图片的像素量化成主色板。
// 纯函数（接收 RGBA 像素数组），不依赖 DOM，便于单测。

export interface Rgb {
  r: number
  g: number
  b: number
}

export function toHex({ r, g, b }: Rgb): string {
  const h = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')
  return `#${h(r)}${h(g)}${h(b)}`
}

export function luminance({ r, g, b }: Rgb): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function saturation({ r, g, b }: Rgb): number {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  if (max === 0) return 0
  return (max - min) / max
}

interface Bucket {
  r: number
  g: number
  b: number
  n: number
}

/**
 * 从 RGBA 像素数组提取主色板。
 * 策略：32 级量化分桶 → 过滤近黑/近白/极低饱和（背景与噪点）→ 按出现次数排序 → 去重（相近色合并）。
 */
export function extractPalette(pixels: ArrayLike<number>, max = 5, step = 32): string[] {
  const buckets = new Map<number, Bucket>()
  const len = pixels.length - (pixels.length % 4)
  for (let i = 0; i < len; i += 4) {
    const a = pixels[i + 3] ?? 255
    if (a < 128) continue // 透明像素不计
    const r = pixels[i] ?? 0
    const g = pixels[i + 1] ?? 0
    const b = pixels[i + 2] ?? 0
    const px: Rgb = { r, g, b }
    const lum = luminance(px)
    if (lum < 26 || lum > 236) continue // 近黑/近白（多为背景）
    if (saturation(px) < 0.08) continue // 无彩色灰阶
    const key = (Math.round(r / step) << 16) | (Math.round(g / step) << 8) | Math.round(b / step)
    const hit = buckets.get(key)
    if (hit) {
      hit.r += r
      hit.g += g
      hit.b += b
      hit.n += 1
    } else {
      buckets.set(key, { r, g, b, n: 1 })
    }
  }

  const ranked = [...buckets.values()]
    .map((x) => ({ r: x.r / x.n, g: x.g / x.n, b: x.b / x.n, n: x.n }))
    .sort((a, b) => b.n - a.n)

  const picked: Rgb[] = []
  for (const c of ranked) {
    const tooClose = picked.some(
      (p) => Math.abs(p.r - c.r) + Math.abs(p.g - c.g) + Math.abs(p.b - c.b) < 48,
    )
    if (!tooClose) picked.push({ r: c.r, g: c.g, b: c.b })
    if (picked.length >= max) break
  }

  // 兜底：图像过暗/过灰时给一个中性色板，避免返回空
  if (picked.length === 0) return ['#ff6b2c', '#1f1c16', '#c8bfb0']
  return picked.map(toHex)
}

/** 判断浅色/深色底，用于决定叠字颜色 */
export function isLight(hex: string): boolean {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex)
  if (!m) return false
  const v = parseInt(m[1]!, 16)
  const r = (v >> 16) & 255
  const g = (v >> 8) & 255
  const b = v & 255
  return luminance({ r, g, b }) > 150
}
