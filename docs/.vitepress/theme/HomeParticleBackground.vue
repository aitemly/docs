<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let resizeObs: ResizeObserver | null = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const parent = canvas.parentElement
  if (!parent) return

  const count = reduced ? 0 : 72

  type P = { x: number; y: number; vx: number; vy: number; r: number; a: number }
  let particles: P[] = []

  function initParticles(w: number, h: number) {
    particles = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        a: Math.random() * 0.35 + 0.12,
      })
    }
  }

  function resize() {
    const rect = parent.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(rect.width * dpr)
    canvas.height = Math.floor(rect.height * dpr)
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    initParticles(rect.width, rect.height)
  }

  function step() {
    const rect = parent.getBoundingClientRect()
    const w = rect.width
    const h = rect.height

    ctx.clearRect(0, 0, w, h)

    if (reduced || count === 0) {
      return
    }

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0) p.x = w
      if (p.x > w) p.x = 0
      if (p.y < 0) p.y = h
      if (p.y > h) p.y = 0

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(102, 126, 234, ${p.a})`
      ctx.fill()
    }

    const maxDist = Math.min(w, h) * 0.06
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i]
        const b = particles[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const d = Math.hypot(dx, dy)
        if (d < maxDist && d > 0) {
          const t = (1 - d / maxDist) * 0.08
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(118, 75, 162, ${t})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }
    }
  }

  resize()
  resizeObs = new ResizeObserver(() => resize())
  resizeObs.observe(parent)

  if (!reduced && count > 0) {
    const loop = () => {
      step()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  resizeObs?.disconnect()
})
</script>

<template>
  <div class="vp-home-particles" aria-hidden="true">
    <canvas ref="canvasRef" class="vp-home-particles__canvas" />
  </div>
</template>

<style scoped>
.vp-home-particles {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.vp-home-particles__canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
