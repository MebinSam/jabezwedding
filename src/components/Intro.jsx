import { useState } from 'react'
import { C, couple } from '../config'
import frameImg from '../assets/jabezwedcard.avif' // Adjust path to match your folder structure

export default function Intro({ onDone }) {
  const [open, setOpen] = useState(false)
  const [gone, setGone] = useState(false)

  const tap = () => {
    if (open) return
    setOpen(true)
    setTimeout(() => {
      setGone(true)
      onDone()
    }, 2500)
  }

  return (
    <div id="intro" className={gone ? 'gone' : ''}>
      {/* 1. Background Frame Layer */}
      <img
        src={frameImg}
        alt=""
        aria-hidden="true"
        className="intro-frame"
      />

      {/* 2. Foreground Elements Layer */}
      <div className="intro-content">
        <div className="kick">You are invited</div>
        <div
          className={'env' + (open ? ' open' : '')}
          onClick={tap}
          role="button"
          aria-label="Open invitation"
        >
          <div className="back" />
          <div className="card">
            <span>THE WEDDING OF</span>
            <b>{couple}</b>
          </div>
          <div className="pocket" />
          <div className="flap" />
          <div className="seal">{C.initials}</div>
        </div>
        <div className="hint">Tap the seal to open</div>
      </div>
    </div>
  )
}