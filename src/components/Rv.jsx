import { createContext, useContext, useEffect, useRef, useState } from 'react'
export const RevealCtx = createContext(false)

/** Scroll-reveal wrapper: fades/slides in once visible (after the envelope has opened). */
export default function Rv({ as: T = 'div', className = '', d = 0, style, children, ...rest }) {
  const ref = useRef(null)
  const active = useContext(RevealCtx)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (!active || seen || !ref.current) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.15 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [active, seen])
  return <T ref={ref} className={`rv ${seen ? 'in' : ''} ${className}`} style={{ transitionDelay: d + 's', ...style }} {...rest}>{children}</T>
}
