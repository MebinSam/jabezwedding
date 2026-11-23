import Rv from './Rv'
import { C, couple } from '../config'

export default function Location() {
  return (
    <section id="lc" className="s4">
      <Rv className="loc">
        <h2>Join us at</h2>
        <div className="orn">✦</div>
        <h3>{C.venue}</h3>
        <p>{C.addr1}<br />{C.addr2}<br /><b>{C.weekday}, {C.dateText} · {C.timeText}</b></p>
        <a className="btn" target="_blank" rel="noopener" href={C.mapsUrl}>Get directions</a>
      </Rv>
      <Rv className="foot">With love and blessings,<b>{couple}</b></Rv>
    </section>
  )
}
