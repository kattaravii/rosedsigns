import { useEffect, useState } from 'react'
const CONTACT_EMAIL = 'kattaravi199@gmail.com'
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

const links = [['about', 'About'], ['services', 'Services'], ['work', 'Portfolio'], ['why', 'Why us'], ['contact', 'Contact']]

const services = [
  { slug: 'branding', title: 'Branding', short: 'Logos, colour, type and guidelines that make a business instantly recognisable.',
    lead: 'A brand is the feeling people remember after they leave. We shape that feeling into a clear, consistent identity.',
    items: ['Logo design and variations', 'Colour palette and typography', 'Brand guidelines document', 'Business cards and stationery'] },
  { slug: 'graphic-design', title: 'Graphic design', short: 'Social posts, print and packaging built from one refined visual language.',
    lead: 'Good design makes people stop scrolling. We create visuals that are beautiful and always on brand.',
    items: ['Social media templates', 'Brochures, flyers and posters', 'Packaging and labels', 'Presentation and pitch decks'] },
  { slug: 'web-development', title: 'Web development', short: 'Fast, responsive websites that look premium and are easy for you to update.',
    lead: 'Your website is your busiest salesperson. We build it to load fast, work on every screen and turn visitors into enquiries.',
    items: ['Responsive landing pages and sites', 'WordPress and custom React builds', 'Contact forms and booking flows', 'Hosting setup and handover'] },
  { slug: 'digital-marketing', title: 'Digital marketing', short: 'Content and campaigns that bring the right people to your brand.',
    lead: 'We plan content and campaigns that help businesses stand out and grow, then report on what actually worked.',
    items: ['Content strategy and calendars', 'Social media management', 'Paid ad campaigns', 'Monthly performance reports'] },
]

const work = [
  ['Ideas designed to be seen', 'Social campaign', 'work-1.jpg'],
  ['Brands that bloom', 'Social campaign', 'work-2.jpg'],
  ['Strategy and content', 'Campaign visuals', 'work-3.jpg'],
  ['Business cards', 'Stationery system', 'work-4.jpg'],
]

const stats = [['4', 'core services, one team'], ['1', 'senior designer on every project'], ['24h', 'reply to every enquiry'], ['100%', 'custom work, never templates']]
const steps = [
  ['Listen', 'We learn your story, your customers and where you want to go.'],
  ['Design', 'Identity, visuals and layouts shaped around what we heard.'],
  ['Launch', 'Your brand and website go live, tested on every screen.'],
  ['Grow', 'Content and campaigns that keep the right people coming back.'],
]
const why = [
  ['One team, start to finish', 'Brand, design, code and marketing happen under one roof, so nothing gets lost between vendors.'],
  ['A clear plan and price', 'You approve a written scope and quote before we begin. No surprise invoices.'],
  ['Weekly progress you can see', 'A working preview every week, so feedback lands while it is still easy to act on.'],
  ['Built to last', 'Clean files, documented systems and handover training so you can run it without us.'],
]

function useHash() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const f = () => setHash(window.location.hash)
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  return hash
}

function ServicePage({ svc }) {
  return (
    <section className="sec detail">
      <a href="#services" className="back">← All services</a>
      <h1>{svc.title}</h1>
      <p className="lead">{svc.lead}</p>
      <ul>{svc.items.map(i => <li key={i}>{i}</li>)}</ul>
      <div className="actions">
        <a href="#contact" className="btn">Start a project</a>
        <a href="https://rosedsigns.com/" target="_blank" rel="noreferrer" className="btn ghost">Visit rosedsigns.com</a>
      </div>
      <div className="others">
        <h3>Other services</h3>
        {services.filter(s => s.slug !== svc.slug).map(s => <a key={s.slug} href={`#/services/${s.slug}`}>{s.title}</a>)}
      </div>
    </section>
  )
}

export default function App() {
  const hash = useHash()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')
  const set = k => e => setForm({ ...form, [k]: e.target.value })
  const svc = hash.startsWith('#/services/') ? services.find(s => s.slug === hash.slice(11)) : null

  useEffect(() => {
    if (svc) window.scrollTo(0, 0)
    else if (hash.length > 1 && !hash.startsWith('#/')) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView())
  }, [hash, svc])

  useEffect(() => {
    document.documentElement.classList.add('js')
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.15 })
    document.querySelectorAll('.rv').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [svc])

  async function submit(e) {
    e.preventDefault()
    if (!FORM_ENDPOINT) {
      const body = `${form.message}\n\nFrom: ${form.name} (${form.email})`
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('New project enquiry from ' + form.name)}&body=${encodeURIComponent(body)}`
      setStatus('sent'); return
    }
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setStatus('sent'); setForm({ name: '', email: '', message: '' })
    } catch { setStatus('error') }
  }

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="nav">
        <a href="#top" className="logo" onClick={() => setOpen(false)}>RoseDsigns</a>
        <button className="burger" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
        <nav id="menu" className={open ? 'open' : ''}>
          {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
          <a href="#contact" className="btn small" onClick={() => setOpen(false)}>Start a project</a>
        </nav>
      </header>

      <main id="main">
        {svc ? <ServicePage svc={svc} /> : (<>
          <section className="hero" id="top">
            <div className="hero-copy">
              <p className="strap">Creative · Branding · Advertising</p>
              <h1>Design that makes people stop, look and <em>remember.</em></h1>
              <p className="sub">RoseDsigns is a creative design and digital marketing agency. We build meaningful brands, beautiful websites and campaigns that help businesses stand out and grow.</p>
              <div className="actions">
                <a href="#contact" className="btn gold">Start a project</a>
                <a href="#work" className="btn ghost">See our work</a>
              </div>
            </div>
            <div className="art">
              <div className="arch"><img src="/logo.png" alt="RoseDsigns logo: a gold letter D entwined with a pink rose" width="520" height="520" /></div>
              <svg className="badge" viewBox="0 0 200 200" aria-hidden="true">
                <circle cx="100" cy="100" r="98" fill="#171514" stroke="#B08A57" />
                <defs><path id="ring" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" /></defs>
                <text fill="#B08A57" fontSize="13.5" letterSpacing="3"><textPath href="#ring" textLength="440">CREATIVE • BRANDING • ADVERTISING •</textPath></text>
                <text x="100" y="116" textAnchor="middle" fill="#D9B1AE" fontSize="46" fontFamily="Cormorant Garamond, serif" fontStyle="italic">D</text>
              </svg>
            </div>
          </section>

          <div className="marquee" aria-hidden="true"><div className="track">
            {Array.from({ length: 8 }).map((_, i) => <span key={i}>Branding ◆ Graphic design ◆ Web development ◆ Digital marketing ◆&nbsp;</span>)}
          </div></div>

          <section className="stats">
            {stats.map(([n, l]) => <div key={l} className="rv"><strong>{n}</strong><span>{l}</span></div>)}
          </section>

          <section className="sec about" id="about">
            <img className="rv" src="/rose.jpg" alt="Soft pink rose petals" loading="lazy" />
            <div>
              <h2>A small studio with a big eye for detail.</h2>
              <p>RoseDsigns began with one belief: good design should feel inviting, not intimidating. We work with founders, shops and growing teams who want a brand that feels considered and a website that brings in customers.</p>
              <p>Every project is led by a senior designer who stays with you from the first sketch to launch day, so you always know who is working on it and what happens next.</p>
              <a href="https://rosedsigns.com/" target="_blank" rel="noreferrer" className="textlink">Visit our main website →</a>
            </div>
          </section>

          <section className="sec" id="services">
            <h2>What we do</h2>
            <div className="services">
              {services.map(s => (
                <a key={s.slug} href={`#/services/${s.slug}`} className="svc rv">
                  <h3>{s.title}</h3><p>{s.short}</p><span>Learn more →</span>
                </a>
              ))}
            </div>
          </section>

          <section className="sec process" id="process">
            <h2>How we work</h2>
            <ol>{steps.map(([t, d], i) => <li key={t} className="rv"><b>0{i + 1}</b><h3>{t}</h3><p>{d}</p></li>)}</ol>
          </section>

          <section className="sec blush" id="work">
            <h2>Selected work</h2>
            <div className="work">
              {work.map(([t, d, src]) => (
                <figure key={t} className="rv"><img src={`/${src}`} alt={`${t}, ${d}`} loading="lazy" /><figcaption><strong>{t}</strong><span>{d}</span></figcaption></figure>
              ))}
            </div>
          </section>

          <section className="sec dark" id="why">
            <h2>Why choose RoseDsigns</h2>
            <div className="why">{why.map(([t, d]) => (<div key={t} className="rv"><h3>{t}</h3><p>{d}</p></div>))}</div>
          </section>
        </>)}

        <section className="sec contact" id="contact">
          <div>
            <h2>Let us make your brand bloom.</h2>
            <p>Tell us a little about your project. We reply within one working day with questions or a first plan.</p>
          </div>
          <form onSubmit={submit}>
            <label>Your name<input required value={form.name} onChange={set('name')} autoComplete="name" /></label>
            <label>Email<input required type="email" value={form.email} onChange={set('email')} autoComplete="email" /></label>
            <label>About your project<textarea required rows="5" value={form.message} onChange={set('message')} /></label>
            <button className="btn gold" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}</button>
            <p role="status" className={'note ' + status}>
              {status === 'sent' && 'Message ready. We will reply within one working day.'}
              {status === 'error' && 'Message not sent. Check your connection and try again.'}
            </p>
          </form>
        </section>
      </main>

      <footer>
        <span className="logo">RoseDsigns</span>
        <a href="https://rosedsigns.com/" target="_blank" rel="noreferrer">rosedsigns.com</a>
        <span>© {new Date().getFullYear()} RoseDsigns</span>
      </footer>
    </>
  )
}