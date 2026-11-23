import { useRef, useState } from 'react'
import Rv from './Rv'
import { couple } from '../config'

const nb = i => { const r = [], x = i % 3, y = (i / 3) | 0; if (x > 0) r.push(i - 1); if (x < 2) r.push(i + 1); if (y > 0) r.push(i - 3); if (y < 2) r.push(i + 3); return r }
const SOLVED = () => [...Array(9).keys()]
function shuffled() {
  const st = SOLVED()
  do {
    let b = 8, prev = -1
    for (let k = 0; k < 90; k++) {
      const o = nb(b).filter(n => n !== prev), n = o[Math.random() * o.length | 0]
      ;[st[b], st[n]] = [st[n], st[b]]; prev = b; b = n
    }
  } while (st.every((v, i) => v === i))
  return st
}

export default function Puzzle({ boom }) {
  const [st, setSt] = useState(shuffled)
  const [moves, setMoves] = useState(0)
  const [solved, setSolved] = useState(false)
  const [msg, setMsg] = useState(null)
  const meet = useRef(null)

  const finish = celebrate => {
    if (solved) return
    setSolved(true); setSt(SOLVED())
    setMsg(celebrate ? 'Beautiful! Meet the couple ✦' : '')
    setTimeout(() => meet.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350)
    if (celebrate) boom()
  }
  const move = i => {
    if (solved) return
    const b = st.indexOf(8)
    if (!nb(b).includes(i)) return
    const next = [...st];[next[b], next[i]] = [next[i], next[b]]
    setSt(next); setMoves(m => m + 1)
    if (next.every((v, k) => v === k)) finish(true)
  }
  return (
    <section id="puz" className="s3">
      <Rv as="h2">One little surprise</Rv>
      <Rv as="p" className="sub">Solve the puzzle to meet the happy couple</Rv>
      <Rv className={'board' + (solved ? ' done' : '')}>
        {st.map((v, i) => (
          <button key={i} aria-label="tile" className={'t' + (v === 8 && !solved ? ' e' : '')}
            style={{ backgroundPosition: `${(v % 3) * 50}% ${((v / 3) | 0) * 50}%` }} onClick={() => move(i)} />
        ))}
      </Rv>
      <div className="moves">{msg ?? `Moves: ${moves}`}</div>
      {!solved && <button className="skip" onClick={() => finish(false)}>Skip &amp; reveal the couple</button>}
      <div ref={meet} className={'meet' + (solved ? ' in' : '')}>
        <div className="nm" style={{ fontSize: 'clamp(44px,13vw,58px)' }}>{couple}</div>
        <div className="to">Can’t wait to celebrate with you</div>
      </div>
    </section>
  )
}
