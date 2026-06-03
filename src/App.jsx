import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download, Mail, ChevronDown, ChevronUp, X, Phone } from 'lucide-react';
import StarField from './StarField';
import MoonRays from './MoonRays';
import FogDrift from './FogDrift';
import EmberParticles from './EmberParticles';
import { useReveal } from './useReveal';
import './App.css';

/* =============================================
   LIGHTBOX COMPONENT
   ============================================= */
const Lightbox = ({ src, alt, onClose }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(5,6,10,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(10px)',
        animation: 'fadeIn 300ms ease forwards',
        cursor: 'none',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1.5rem', right: '2rem',
          background: 'transparent',
          border: '1px solid rgba(200,169,110,0.4)',
          color: 'var(--gold-pure)',
          width: '40px', height: '40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'none', borderRadius: '2px',
          transition: 'background 200ms ease, border-color 200ms ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,169,110,0.12)'; e.currentTarget.style.borderColor = 'var(--gold-bright)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(200,169,110,0.4)'; }}
        aria-label="Close image"
      >
        <X size={18} />
      </button>

      {/* Image — stop propagation so clicking it doesn't close */}
      <img
        src={src}
        alt={alt}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '88vw',
          maxHeight: '88vh',
          objectFit: 'contain',
          borderRadius: '2px',
          border: '1px solid rgba(200,169,110,0.25)',
          boxShadow: '0 0 60px rgba(0,0,0,0.8), 0 0 20px rgba(200,169,110,0.08)',
          cursor: 'default',
          animation: 'lightboxReveal 350ms var(--ease-out-expo) forwards',
        }}
      />

      <style>{`
        @keyframes lightboxReveal {
          from { opacity: 0; transform: scale(0.93); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

/* =============================================
   DATA — ALL CONTENT PRESERVED
   ============================================= */
const projects = [
  {
    id: 1,
    title: "The Scenarist's Gambit",
    tag: "Quest Design Document",
    features: ["Branching outcomes", "Consequence systems", "NPC relationship design", "World-state changes"],
    cta: "View Documentation",
    link: "https://pdfhost.io/v/XbyK2M6k3h_Scenarists_Gambit_QDD_v2"
  },
  {
    id: 2,
    title: "Rise of the Exiled Bastard",
    tag: "Published Interactive Narrative Game",
    features: ["6000+ plays", "Multiple endings", "Character progression", "Choice-driven storytelling"],
    cta: "Play Interactive Demo",
    link: "https://cogdemos.ink/go/7675"
  },
  {
    id: 3,
    title: "The Doctrine of Still Hands",
    tag: "Worldbuilding & Ideology Design",
    features: ["Faction philosophy", "Character conflict", "Political storytelling", "Moral ambiguity"],
    cta: "Read Narrative",
    link: "https://pdfhost.io/v/fRrkAz7gWt_The_Doctrine_of_Still_Hands"
  },
  {
    id: 4,
    title: "The Survivor's Lie",
    tag: "Branching Dialogue Sample",
    features: ["Character writing", "Player agency", "Multiple outcomes", "Emotional conflict"],
    cta: "Read Dialogue",
    link: "https://pdfhost.io/v/DAU82SF3fz_Dialogue_Branching"
  }
];

const characters = [
  {
    id: 1,
    name: "Magistrate Vell",
    quote: "The man who built an ideology to avoid choosing.",
    personality: "Calm, analytical, patient. Speaks rarely, but every word is deliberate. Deeply compassionate, but hides it behind doctrine.",
    goals: "Preserve the stability of Solvane. Prevent future catastrophes born from political action.",
    fears: "That Quiescence is built on a false assumption. Choosing wrong... and causing another disaster.",
    dialogue: `"You arrive with your causes and your urgency. We have heard urgency before. We buried it in the east quarter, with the seventeen thousand."`,
    image: '/vell.png',
  },
  {
    id: 2,
    name: "Commander Anya",
    quote: "A leader protecting the lie that saved her people.",
    personality: "Stern, unyielding, fiercely protective. Carries the weight of command heavily but never shows weakness.",
    goals: "Maintain the illusion of safety. Keep the borders secure at all costs.",
    fears: "That the truth will break the fragile peace she sacrificed everything to build.",
    dialogue: `"The truth doesn't feed starving children. It doesn't build walls. It only breeds fire."`,
    visualRef: '/anya.png',
  }
];

/* =============================================
   UTILITY — Corner Rune Spans
   ============================================= */
const CornerRunes = () => (
  <>
    <span className="corner-tl" aria-hidden="true" />
    <span className="corner-tr" aria-hidden="true" />
    <span className="corner-bl" aria-hidden="true" />
    <span className="corner-br" aria-hidden="true" />
  </>
);

/* =============================================
   UTILITY — Runic Divider
   ============================================= */
const RunicDivider = ({ elaborate = false }) => (
  <div className="runic-divider" aria-hidden="true">
    <div className="runic-divider-line" />
    <div className="runic-divider-center">
      {elaborate && <span>◆</span>}
      <span className="diamond-main">◆</span>
      {elaborate && <span>◆</span>}
    </div>
    <div className="runic-divider-line" />
  </div>
);

/* =============================================
   UTILITY — Panel with cursor tracking
   ============================================= */
const Panel = ({ className = '', children, ...props }) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      className={`codex-panel ${className}`}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <CornerRunes />
      {children}
    </div>
  );
};

/* =============================================
   SECTION WRAPPER with reveal
   ============================================= */
const RevealSection = ({ children, className = '', animation = 'reveal-fade-up', delay = 0 }) => {
  const [ref, isVisible] = useReveal();
  return (
    <div
      ref={ref}
      className={`${animation} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* =============================================
   CUSTOM CURSOR
   ============================================= */
const GothicCursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let outerX = 0, outerY = 0;
    let rafId;

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      inner.style.left = `${x}px`;
      inner.style.top  = `${y}px`;
      outerX = x;
      outerY = y;
    };

    const animate = () => {
      outer.style.left = `${outerX}px`;
      outer.style.top  = `${outerY}px`;
      rafId = requestAnimationFrame(animate);
    };

    const onEnterLink = () => setHovering(true);
    const onLeaveLink = () => setHovering(false);

    document.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(animate);

    const interactables = document.querySelectorAll('a, button, [role="button"], .char-header, .codex-panel');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className={`cursor-outer ${hovering ? 'hovering' : ''}`} />
      <div ref={innerRef} className="cursor-inner" />
    </>
  );
};

/* =============================================
   MAIN APP
   ============================================= */
function App() {
  const [openChar, setOpenChar] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState(null); // { src, alt }

  const toggleChar = (id) => {
    setOpenChar(openChar === id ? null : id);
  };

  // Navbar scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Letter-split hero name
  const firstName = "Shree";
  const lastName  = "Kamalesh";
  const allLetters = [...firstName.split(''), ' ', ...lastName.split('')];

  return (
    <>
      {/* ATMOSPHERIC LAYER STACK (z: 1–4) */}
      <StarField />
      <MoonRays />
      <FogDrift />
      <EmberParticles />

      {/* VIGNETTE (z: 5) */}
      <div className="vignette" />

      {/* CUSTOM CURSOR */}
      <GothicCursor />

      {/* LIGHTBOX */}
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}

      {/* NAVIGATION (z: 100) */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#hero" className="nav-logo" aria-label="Home">
          <span className="nav-logo-inner">SK</span>
        </a>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#experience">Output</a>
          <a href="#process">Pipeline</a>
          <a href="#characters">Characters</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* PAGE CONTENT (z: 10+) */}
      <div className="app-container fade-in">

        {/* ── HERO ─────────────────────────────────── */}
        <header className="hero" id="hero">


          <h1 className="hero-name" aria-label="Shree Kamalesh" style={{ whiteSpace: 'nowrap' }}>
            Shree Kamalesh
          </h1>

          <p className="hero-roles">
            <span>Narrative Designer</span>
            <span>Quest Designer</span>
            <span>Game Writer</span>
          </p>

          <RunicDivider />

          <p className="hero-statement">
            I build worlds where every choice leaves a scar. Branching narrative, consequence systems,
            and character design crafted to give players the weight of consequence — and the grace to bear it.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View My Work <ArrowRight size={14} /></a>
            <a href="#philosophy" className="btn btn-ghost">Read My Lore</a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <a href="#author-highlight" className="btn btn-ghost" style={{ fontSize: '0.75rem', padding: '0.5em 2em', borderColor: 'var(--gold-dim)', color: 'var(--gold-dim)', letterSpacing: '0.25em' }}>
              Experience
            </a>
          </div>

          <div className="hero-metrics" style={{
            display:'flex', justifyContent:'center', alignItems:'center',
            gap:'1.5rem', marginTop:'2rem', marginBottom:'0',
            fontFamily:'var(--font-heading)', fontSize:'0.72rem',
            letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--text-muted)',
            flexWrap:'wrap'
          }}>
            <span>Published Narrative</span>
            <span style={{color:'var(--gold-dim)'}}>◆</span>
            <span>6,000+ Plays</span>
            <span style={{color:'var(--gold-dim)'}}>◆</span>
            <span>750,000+ Words</span>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator">
            <div className="scroll-line">
              <div className="scroll-diamond" />
            </div>
          </div>
        </header>

        {/* ── RECRUITER BOX ────────────────────────── */}
        <RevealSection>
          <Panel className="recruiter-box">
            <p className="recruiter-title">Looking for</p>
            <ul className="recruiter-roles">
              <li>Narrative Design</li>
              <li>Quest Design</li>
              <li>Game Writing</li>
              <li>Interactive Storytelling</li>
              <li>Internships & Graduate Roles</li>
            </ul>
          </Panel>
        </RevealSection>

        <RunicDivider elaborate />

        {/* ── AUTHOR HIGHLIGHT ─────────────────────── */}
        <RevealSection animation="reveal-glow-in">
          <section id="author-highlight" className="author-highlight content-section">
            <Panel className="author-panel">
              <div className="author-header-row">
                <div>
                  <h3 className="author-title">
                    Independent Narrative Webnovel Author{' '}
                    <span className="author-handle">(Stylish_Demon)</span>
                  </h3>
                  <p className="author-date">2022 – Present</p>
                </div>
                <a
                  href="https://www.webnovel.com/profile/4317806097"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary author-btn"
                >
                  View Here <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                </a>
              </div>

              <ul className="dossier-features author-bullets">
                <li><span className="feature-bullet">✦</span> Published long-form fantasy and LitRPG fiction on Webnovel.</li>
                <li><span className="feature-bullet">✦</span> Wrote 750,000+ words of original narrative content over 3 books.</li>
                <li><span className="feature-bullet">✦</span> Built a recurring reader base through serialized releases.</li>
                <li><span className="feature-bullet">✦</span> Designed original worlds, progression systems, factions, and character arcs.</li>
              </ul>

              <div className="author-books-gallery">
                {[
                  { href: "https://www.webnovel.com/book/rebirth-over-the-horizon_20631625706400305",             title: "Rebirth Over the Horizon" },
                  { href: "https://www.webnovel.com/book/surviving-by-relying-on-my-yandere-fiancee_27828137900473005", title: "Surviving by Relying on my Yandere Fiancee" },
                  { href: "https://www.webnovel.com/book/vrmmo-my-first-contractee-is-yandere_29850691308422005", title: "VRMMO: My First Contractee is Yandere" },
                ].map((book, i) => (
                  <a key={i} href={book.href} target="_blank" rel="noopener noreferrer" className="book-link-card codex-panel">
                    <CornerRunes />
                    <div className="book-card-info">
                      <h4>{book.title}</h4>
                      <p className="read-cta">Read on Webnovel <ArrowRight size={13} /></p>
                    </div>
                  </a>
                ))}
              </div>
            </Panel>
          </section>
        </RevealSection>

        <RunicDivider elaborate />

        {/* ── FEATURED PROJECTS ────────────────────── */}
        <section id="projects" className="content-section">
          <RevealSection animation="reveal-slash-in">
            <h2 className="section-heading">Featured Projects</h2>
          </RevealSection>
          <div className="dossier-grid stagger-grid">
            {projects.map((item, i) => (
              <RevealSection key={item.id} animation="reveal-glow-in" delay={i * 120}>
                <Panel style={{ height: '100%' }}>
                  <div className="dossier-header">{item.tag}</div>
                  <h3 className="dossier-title">{item.title}</h3>
                  <ul className="dossier-features">
                    {item.features.map((feat, idx) => (
                      <li key={idx}>
                        <span className="feature-bullet">✦</span> {feat}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="open-link"
                  >
                    {item.cta} <ArrowRight size={16} />
                  </a>
                </Panel>
              </RevealSection>
            ))}
          </div>
        </section>

        <RunicDivider />

        {/* ── DESIGN PHILOSOPHY & SKILLS ───────────── */}
        <div id="philosophy" className="split-section">
          <RevealSection animation="reveal-fade-up">
            <section className="philosophy-section content-section">
              <h2 className="section-heading">Design Philosophy</h2>
              <Panel className="philosophy-box">
                <p>I believe the most memorable RPG stories emerge when player choices create meaningful consequences.</p>
                <p>My work focuses on combining narrative, systems, and player agency to create experiences where characters, worldbuilding, and gameplay reinforce one another.</p>
              </Panel>
            </section>
          </RevealSection>

          <RevealSection animation="reveal-fade-up" delay={150}>
            <section className="skills-section content-section">
              <h2 className="section-heading">Skills</h2>
              <div className="skills-grid">
                <Panel className="skill-category">
                  <h3>Narrative Design</h3>
                  <ul>
                    <li>Branching Narrative Design</li>
                    <li>Quest Design</li>
                    <li>Dialogue Writing</li>
                    <li>Character Development</li>
                    <li>Worldbuilding</li>
                    <li>Interactive Storytelling</li>
                    <li>Narrative Systems Design</li>
                    <li>Consequence Mapping</li>
                    <li>Interactive Fiction</li>
                  </ul>
                </Panel>
                <Panel className="skill-category">
                  <h3>Technical</h3>
                  <ul>
                    <li>Narrative Documentation</li>
                    <li>Prompt Engineering</li>
                    <li>Local LLM Workflows</li>
                    <li>Generative Asset Pipelines (ComfyUI)</li>
                    <li>Narrative Prototyping</li>
                    <li>ChoiceScript</li>
                    <li>Basic Python / Java</li>
                    <li>React</li>
                  </ul>
                </Panel>
              </div>
            </section>
          </RevealSection>
        </div>

        <RunicDivider />

        {/* ── CREATIVE OUTPUT ───────────────────────── */}
        <section id="experience" className="content-section">
          <RevealSection animation="reveal-slash-in">
            <h2 className="section-heading">Creative Output</h2>
          </RevealSection>
          <div className="metrics-grid stagger-grid">
            {[
              { tag: "Published Interactive Narrative", title: "Rise of the Exiled Bastard", number: "6000+", unit: "Plays", sub: "Multiple Endings · Branching Storylines" },
              { tag: "Long-form Fantasy Writing",       title: "LitRPG Web Serial",           number: "750,000+", unit: "Words", sub: "Character Progression Systems · Deep Worldbuilding" },
              { tag: "RPG Quest Design",                title: "The Scenarist's Gambit",       sub: "Quest Design Documentation · Systemic Consequences" },
              { tag: "Narrative Worldbuilding",         title: "Doctrine of Still Hands",      sub: "Faction philosophy · Political storytelling" },
            ].map((card, i) => (
              <RevealSection key={i} animation="reveal-glow-in" delay={i * 120}>
                <Panel className="metric-card">
                  <div className="metric-tag">{card.tag}</div>
                  <h3>{card.title}</h3>
                  {card.number && (
                    <div className="metric-number">{card.number}<span style={{ fontSize:'1rem', color:'var(--gold-dim)', marginLeft:'0.3em' }}>{card.unit}</span></div>
                  )}
                  <p>{card.sub}</p>
                </Panel>
              </RevealSection>
            ))}
          </div>
        </section>

        <RunicDivider />

        {/* ── DESIGN PIPELINE ───────────────────────── */}
        <section id="process" className="content-section">
          <RevealSection animation="reveal-slash-in">
            <h2 className="section-heading">Design Pipeline</h2>
          </RevealSection>
          <RevealSection animation="reveal-fade-up" delay={200}>
            <div className="process-flow">
              {['Concept','Worldbuilding','Character Design','Quest Design','Dialogue Writing','Branching Outcomes'].map((step, i) => (
                <React.Fragment key={step}>
                  <div className="process-step codex-panel">
                    <CornerRunes />
                    {step}
                  </div>
                  <ArrowRight className="process-arrow" size={18} />
                </React.Fragment>
              ))}
              <div className="process-step codex-panel highlight">
                <CornerRunes />
                Playable Implementation
              </div>
            </div>
          </RevealSection>
        </section>

        <RunicDivider elaborate />

        {/* ── CHARACTER DIRECTORY ───────────────────── */}
        <section id="characters" className="content-section">
          <RevealSection animation="reveal-slash-in">
            <h2 className="section-heading">Character Directory</h2>
          </RevealSection>
          <div className="character-accordion">
            {characters.map((char, i) => (
              <RevealSection key={char.id} animation="reveal-fade-up" delay={i * 150}>
                <div className={`char-card codex-panel ${openChar === char.id ? 'open' : ''}`}>
                  <CornerRunes />
                  <div className="char-header" onClick={() => toggleChar(char.id)}>
                    <div className="char-header-info">
                      <h3 className="char-name">{char.name}</h3>
                      <p className="char-quote">"{char.quote}"</p>
                    </div>
                    <div className="char-toggle">
                      {openChar === char.id
                        ? <ChevronUp size={22} color="var(--gold-pure)" />
                        : <ChevronDown size={22} color="var(--gold-pure)" />
                      }
                    </div>
                  </div>

                  <div className={`char-details-wrapper ${openChar === char.id ? 'expanded' : ''}`}>
                    <div className="char-details" style={{ gridTemplateColumns: char.image || char.visualRef ? '180px 1fr' : '1fr 1fr' }}>

                      {/* Portrait column for Vell */}
                      {char.image && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                          <img
                            src={char.image}
                            alt={`${char.name} portrait`}
                            onClick={() => setLightbox({ src: char.image, alt: `${char.name} portrait` })}
                            title="Click to enlarge"
                            style={{
                              width: '100%',
                              aspectRatio: '3/4',
                              objectFit: 'cover',
                              borderRadius: '2px',
                              border: '1px solid rgba(200,169,110,0.25)',
                              filter: 'sepia(20%) brightness(0.88) contrast(1.05)',
                              boxShadow: '0 0 20px rgba(0,0,0,0.6)',
                              cursor: 'zoom-in',
                              transition: 'filter 400ms ease, transform 400ms ease, box-shadow 400ms ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.filter = 'sepia(0%) brightness(1) contrast(1)'; e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(200,169,110,0.2)'; }}
                            onMouseLeave={e => { e.currentTarget.style.filter = 'sepia(20%) brightness(0.88) contrast(1.05)'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,0,0,0.6)'; }}
                          />
                          <p style={{ fontSize: '0.65rem', color: 'var(--text-faint)', fontStyle: 'italic', textAlign: 'center', letterSpacing: '0.08em' }}>Click to enlarge</p>
                        </div>
                      )}

                      {/* Anya — visual reference column */}
                      {char.visualRef && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                          <h4 style={{
                            fontFamily: 'var(--font-heading)', fontSize: '0.75rem',
                            textTransform: 'uppercase', letterSpacing: '0.2em',
                            color: 'var(--silver-pure)', marginBottom: '0.4rem', fontWeight: 600
                          }}>Visual Reference</h4>
                          <img
                            src={char.visualRef}
                            alt={`${char.name} visual reference`}
                            onClick={() => setLightbox({ src: char.visualRef, alt: `${char.name} visual reference` })}
                            title="Click to enlarge"
                            style={{
                              width: '100%',
                              aspectRatio: '3/4',
                              objectFit: 'cover',
                              borderRadius: '2px',
                              border: '1px solid rgba(168,184,208,0.2)',
                              filter: 'sepia(10%) brightness(0.85)',
                              boxShadow: '0 0 20px rgba(0,0,0,0.6)',
                              cursor: 'zoom-in',
                              transition: 'filter 400ms ease, transform 400ms ease, box-shadow 400ms ease',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.filter = 'sepia(0%) brightness(1)'; e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(168,184,208,0.2)'; }}
                            onMouseLeave={e => { e.currentTarget.style.filter = 'sepia(10%) brightness(0.85)'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,0,0,0.6)'; }}
                          />
                          <p style={{ fontSize: '0.65rem', color: 'var(--text-faint)', fontStyle: 'italic', textAlign: 'center', letterSpacing: '0.08em' }}>Click to enlarge</p>
                          <p style={{
                            fontSize: '0.68rem',
                            color: 'var(--text-faint)',
                            fontStyle: 'italic',
                            letterSpacing: '0.04em',
                            lineHeight: 1.5,
                            borderTop: '1px solid rgba(168,184,208,0.1)',
                            paddingTop: '0.4rem'
                          }}>
                            Designed by human · Visual reference by ChatGPT
                          </p>
                        </div>
                      )}

                      {/* Text detail blocks — always in a nested grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="char-detail-block">
                          <h4>Personality</h4>
                          <p>{char.personality}</p>
                        </div>
                        <div className="char-detail-block">
                          <h4>Goals</h4>
                          <p>{char.goals}</p>
                        </div>
                        <div className="char-detail-block">
                          <h4>Fears</h4>
                          <p>{char.fears}</p>
                        </div>
                        <div className="char-detail-block">
                          <h4>Sample Dialogue</h4>
                          <p className="char-dialogue">{char.dialogue}</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>

        <RunicDivider />

        {/* ── RESUME & CONTACT ──────────────────────── */}
        <section id="resume" className="content-section resume-contact-section">
          <RevealSection animation="reveal-fade-up">
            <Panel className="resume-box">
              <h2>Resume</h2>
              <p>Download my full resume for a detailed breakdown of my education, technical skills, and narrative design experience.</p>
              <br />
              <a href="#" className="btn btn-primary">
                <Download size={16} style={{ marginRight: '8px' }} /> Download Resume
              </a>
            </Panel>
          </RevealSection>

          <RevealSection animation="reveal-fade-up" delay={150}>
            <Panel className="contact-box" id="contact">
              <h2>Let's Connect</h2>
              <p>Ready to build meaningful worlds together?</p>
              <br />
              <div className="contact-links">
                <a href="mailto:shreekamalesh167@gmail.com" className="btn btn-ghost">
                  <Mail size={16} style={{ marginRight: '8px' }} /> shreekamalesh167@gmail.com
                </a>
                <a href="tel:+918220710321" className="btn btn-ghost">
                  <Phone size={16} style={{ marginRight: '8px' }} /> +91 82207 10321
                </a>
              </div>
            </Panel>
          </RevealSection>
        </section>

        {/* ── FOOTER ───────────────────────────────── */}
        <footer className="footer-disclaimer">
          <div className="footer-content">
            <h3>Shree Kamalesh</h3>
            <p style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Narrative Designer · Quest Designer · Game Writer
            </p>
            <p style={{ fontSize: '0.9rem' }}>
              Available for Narrative Design, Quest Design, and Interactive Storytelling opportunities.
            </p>
          </div>
          <RunicDivider />
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}>
            Designed and developed by Shree Kamalesh with technical collaboration from Antigravity.
          </p>
        </footer>

      </div>
    </>
  );
}

export default App;
