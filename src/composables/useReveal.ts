// 滚动入场：为所有 .reveal 元素挂载 IntersectionObserver，进入视口时加 .is-in。
import { onMounted, onBeforeUnmount } from 'vue'

export function useReveal(): void {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'))
      return
    }
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    items.forEach((el) => observer?.observe(el))
  })

  onBeforeUnmount(() => observer?.disconnect())
}
