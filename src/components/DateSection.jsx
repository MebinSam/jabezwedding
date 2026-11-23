import { useEffect, useRef, useState } from 'react'
import Rv from './Rv'
import { C, couple } from '../config'

function Scratch({ boom }) {
  const ref = useRef(null)
  const s = useRef({ down: false, n: 0, done: false })
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const g = ref.current.getContext('2d')
    g.globalCompositeOperation = 'source-over'
    const gr = g.createLinearGradient(0, 0, 480, 240)
    gr.addColorStop(0, '#c9b0e8'); gr.addColorStop(0.35, '#f4ecfc'); gr.addColorStop(0.6, '#b79adf'); gr.addColorStop(1, '#e6d8f6')
    g.fillStyle = gr; g.fillRect(0, 0, 480, 240)
    g.fillStyle = 'rgba(91,45,143,.75)'; g.font = '600 26px Montserrat,sans-serif'; g.textAlign = 'center'
    g.fillText('✦ SCRATCH HERE ✦', 240, 132)
  }, [])

  const pos = e => { const r = ref.current.getBoundingClientRect(); return [(e.clientX - r.left) * 480 / r.width, (e.clientY - r.top) * 240 / r.height] }
  const check = g => {
    const d = g.getImageData(0, 0, 480, 240).data
    let c = 0
    for (let i = 3; i < d.length; i += 64) if (d[i] === 0) c++
    if (c / (d.length / 64) > 0.5) { s.current.done = true; setGone(true); boom(90) }
  }
  const scratch = e => {
    const st = s.current
    if (!st.down || st.done) return
    const g = ref.current.getContext('2d'), [x, y] = pos(e)
    g.globalCompositeOperation = 'destination-out'
    g.beginPath(); g.arc(x, y, 24, 0, 7); g.fill()
    if (++st.n % 8 === 0) check(g)
  }
  return (
    <canvas ref={ref} width={480} height={240}
      style={gone ? { opacity: 0, pointerEvents: 'none' } : undefined}
      onPointerDown={e => { s.current.down = true; e.currentTarget.setPointerCapture(e.pointerId); scratch(e) }}
      onPointerMove={scratch}
      onPointerUp={() => (s.current.down = false)}
      onPointerCancel={() => (s.current.down = false)} />
  )
}

const calc = () => {
  const d = Math.max(0, new Date(C.dateISO).getTime() - Date.now())
  return [d / 864e5, d / 36e5 % 24, d / 6e4 % 60, d / 1e3 % 60].map(x => String(Math.floor(x)).padStart(2, '0'))
}
function Countdown() {
  const [v, setV] = useState(calc)
  useEffect(() => { const i = setInterval(() => setV(calc()), 1000); return () => clearInterval(i) }, [])
  return (
    <Rv className="cd">
      {['Days', 'Hours', 'Mins', 'Secs'].map((l, i) => <div key={l}><b>{v[i]}</b><small>{l}</small></div>)}
    </Rv>
  )
}

export default function DateSection({ boom }) {
  const enc = encodeURIComponent
  const cal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${enc(couple + ' Wedding')}&dates=${C.calStart}/${C.calEnd}&location=${enc(C.calLocation)}`
  return (
    <section id="dt" className="s2">
      <Rv as="h2">Save the date</Rv>
      <Rv as="p" className="sub">Scratch the card to reveal</Rv>
      <Rv className="scr">
        <div className="d"><span>{C.weekday.toUpperCase()}</span><b>{C.dateText}</b><span>{C.timeText}</span></div>
        <Scratch boom={boom} />
      </Rv>
      <Countdown />
      <Rv as="a" className="btn o" target="_blank" rel="noopener" href={cal}>Add to calendar</Rv>
    </section>
  )
}
