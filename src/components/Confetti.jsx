import { forwardRef, useImperativeHandle, useRef } from 'react'
const COLORS = ['#6b3fa0', '#a97be0', '#e9ddf7', '#c9a96a', '#fff']

const Confetti = forwardRef(function Confetti(_, ref) {
  const cv = useRef(null)
  const parts = useRef([])
  const loop = () => {
    const c = cv.current, x = c.getContext('2d')
    x.clearRect(0, 0, c.width, c.height)
    parts.current.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.35; p.r += 0.2
      x.fillStyle = p.c; x.save(); x.translate(p.x, p.y); x.rotate(p.r)
      x.fillRect(-p.s / 2, -p.s / 3, p.s, p.s / 1.6); x.restore()
    })
    parts.current = parts.current.filter(p => p.y < c.height + 20)
    if (parts.current.length) requestAnimationFrame(loop)
    else x.clearRect(0, 0, c.width, c.height)
  }
  useImperativeHandle(ref, () => ({
    boom(n = 120) {
      const c = cv.current
      c.width = innerWidth; c.height = innerHeight
      const running = parts.current.length > 0
      for (let i = 0; i < n; i++) parts.current.push({
        x: innerWidth / 2, y: innerHeight / 2.2,
        vx: (Math.random() - 0.5) * 14, vy: -Math.random() * 13 - 3,
        s: 4 + Math.random() * 6, c: COLORS[i % 5], r: Math.random() * 6,
      })
      if (!running) loop()
    },
  }))
  return <canvas id="cf" ref={cv} />
})
export default Confetti
