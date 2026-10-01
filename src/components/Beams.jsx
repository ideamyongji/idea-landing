import { useEffect, useRef } from 'react'

// 21st.dev "Beams Background"(jahed)를 브랜드 컬러·plain CSS로 이식한 캔버스 광선
// RGB 채널 대신 violet / cyan / pink 세 레이어를 살짝 어긋나게 겹쳐 색수차 느낌을 냅니다.
const LAYERS = [
  { rgb: '139, 92, 246', shift: -1, phase: 0, w: 1.5, a: 0.5 },
  { rgb: '34, 211, 238', shift: 1, phase: 10, w: 1.5, a: 0.4 },
  { rgb: '236, 233, 255', shift: 0, phase: 5, w: 0.7, a: 0.22 },
]

const noise = (x, t) =>
  (Math.sin(x * 0.01 + t) + Math.sin(x * 0.03 + t * 2) * 0.5 + Math.sin(x * 0.1 + t * 4) * 0.25) / 1.75

export default function Beams({ density = 18, speed = 1, aberration = 3, opacity = 90 }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!wrap || !ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let w = 0
    let h = 0
    let t = 0
    let raf = 0
    let visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = wrap.offsetWidth
      h = wrap.offsetHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const beam = (x, time, color, widthMod) => {
      const bh = h * (0.55 + noise(x, time * 0.5) * 0.4)
      const bw = (w / density) * widthMod
      const g = ctx.createLinearGradient(x, h, x, h - bh)
      g.addColorStop(0, color)
      g.addColorStop(1, 'transparent')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.moveTo(x - bw / 2, h)
      ctx.lineTo(x + bw / 2, h)
      ctx.lineTo(x + bw, h - bh)
      ctx.lineTo(x - bw, h - bh)
      ctx.fill()
    }

    const frame = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'screen'
      const step = w / density
      const o = opacity / 100
      for (let i = 0; i <= density; i++) {
        const x = i * step
        LAYERS.forEach((l, li) => {
          const wave = 0.5 + 0.5 * Math.sin(i * (0.5 + li * 0.1) + t * (1 + li * 0.1) + l.phase)
          beam(x + l.shift * aberration, t + i * (0.1 + li * 0.01) + l.phase, `rgba(${l.rgb}, ${o * wave * l.a})`, l.w)
        })
      }
    }

    const loop = () => {
      t += 0.01 * speed
      frame()
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      if (reduce.matches || !visible || document.hidden) {
        frame() // 정적인 한 프레임만
        return
      }
      raf = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(() => {
      resize()
      start()
    })
    ro.observe(wrap)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      start()
    })
    io.observe(wrap)
    document.addEventListener('visibilitychange', start)
    reduce.addEventListener('change', start)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', start)
      reduce.removeEventListener('change', start)
    }
  }, [density, speed, aberration, opacity])

  return (
    <div ref={wrapRef} className="beams" aria-hidden="true">
      <canvas ref={canvasRef} className="beams__canvas" />
      <div className="beams__scan" />
    </div>
  )
}
