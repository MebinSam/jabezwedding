import { useMemo } from 'react'
export default function Petals() {
  const items = useMemo(() => Array.from({ length: 16 }, () => ({
    left: Math.random() * 100 + '%',
    animationDuration: 9 + Math.random() * 10 + 's',
    animationDelay: -Math.random() * 14 + 's',
    transform: `scale(${0.6 + Math.random() * 0.8})`,
  })), [])
  return <div id="petals">{items.map((s, i) => <i key={i} style={s} />)}</div>
}
