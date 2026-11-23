import Rv from './Rv'
import { C } from '../config'

export default function Invitation() {
  const { bride: b, groom: g } = C
  return (
    <section id="rev" className="s1">
      <Rv as="h2">Wedding Invitation</Rv>
      <Rv className="orn" d={0.12}>✦ ✦ ✦</Rv>
      <Rv as="p" className="to" d={0.24}>Together with their families</Rv>
      <Rv className="nm">{g.first}</Rv>
      <Rv className="full">{g.rest}</Rv>
      <Rv as="p" className="par" style={{ marginTop: 0 }}><small>Son of</small>{g.father} &amp; {g.mother}</Rv>
      <Rv className="amp">and</Rv>
      <Rv className="nm" d={0.36}>{b.first}</Rv>
      <Rv className="full">{b.rest}</Rv>
      <Rv as="p" className="par"><small>Daughter of</small>{b.father} &amp; {b.mother}</Rv>
      {/* <Rv as="p" className="par" style={{ marginTop: 0 }}><small>Son of</small>{g.father} &amp; {g.mother}</Rv> */}
      <Rv className="orn">✦</Rv>
      {/* <Rv as="p" className="par"><small>Daughter of</small>{b.father} &amp; {b.mother}</Rv> */}
      <Rv as="p" className="sub mt-6">request the pleasure of your presence<br />at the celebration of their wedding</Rv>
    </section>
  )
}
