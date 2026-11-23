import { useEffect, useRef, useState } from 'react'
import { RevealCtx } from './components/Rv'
import Petals from './components/Petals'
import Confetti from './components/Confetti'
import Intro from './components/Intro'
import Invitation from './components/Invitation'
import DateSection from './components/DateSection'
import Puzzle from './components/Puzzle'
import Location from './components/Location'

export default function App() {
  const [opened, setOpened] = useState(false)
  const cf = useRef(null)
  useEffect(() => { document.body.classList.toggle('lock', !opened) }, [opened])
  const boom = n => cf.current?.boom(n)
  return (
    <RevealCtx.Provider value={opened}>
      <Petals />
      <Confetti ref={cf} />
      <Intro onDone={() => setOpened(true)} />
      <main className="mx-auto max-w-[460px]">
        <Invitation />
        <DateSection boom={boom} />
        <Puzzle boom={boom} />
        <Location />
      </main>
    </RevealCtx.Provider>
  )
}
