<<<<<<< HEAD
import React from 'react';
import { useReveal } from './useReveal';
import { EXPERIENCE } from './data';

const Experience: React.FC = () => {
  const titleRef = useReveal();
  const listRef = useReveal();

  return (
    <section id="experience" style={{ padding: '7rem 3rem', background: 'var(--bg)' }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <span>//</span> 04 — Experience
      </div>

      <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} className="reveal" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(2.5rem,5vw,3.5rem)', lineHeight: 1.1, marginBottom: '3.5rem' }}>
        Where I've<br />been.
      </h2>

      <div ref={listRef as React.RefObject<HTMLDivElement>} className="reveal" style={{ position: 'relative', paddingLeft: '2rem' }}>
        {/* Timeline line */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom,var(--accent),transparent)' }} />

        {EXPERIENCE.map((exp, i) => (
          <div key={i} style={{ position: 'relative', paddingBottom: '3rem', paddingLeft: '2rem' }}>
            {/* Dot */}
            <div style={{ position: 'absolute', left: '-2.3rem', top: '0.4rem', width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', border: '2px solid var(--bg)', boxShadow: '0 0 0 3px rgba(124,106,245,0.2)' }} />

            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              {exp.period}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.2rem' }}>{exp.company}</div>
            <div style={{ color: 'var(--accent2)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.8rem' }}>{exp.role}</div>
            <div style={{ color: 'var(--text2)', fontSize: '0.87rem', lineHeight: 1.8 }}>{exp.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

=======
import React from 'react';
import { useReveal } from './useReveal';
import { EXPERIENCE } from './data';

const Experience: React.FC = () => {
  const titleRef = useReveal();
  const listRef = useReveal();

  return (
    <section id="experience" style={{ padding: '7rem 3rem', background: 'var(--bg)' }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <span>//</span> 04 — Experience
      </div>

      <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} className="reveal" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(2.5rem,5vw,3.5rem)', lineHeight: 1.1, marginBottom: '3.5rem' }}>
        Where I've<br />been.
      </h2>

      <div ref={listRef as React.RefObject<HTMLDivElement>} className="reveal" style={{ position: 'relative', paddingLeft: '2rem' }}>
        {/* Timeline line */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom,var(--accent),transparent)' }} />

        {EXPERIENCE.map((exp, i) => (
          <div key={i} style={{ position: 'relative', paddingBottom: '3rem', paddingLeft: '2rem' }}>
            {/* Dot */}
            <div style={{ position: 'absolute', left: '-2.3rem', top: '0.4rem', width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', border: '2px solid var(--bg)', boxShadow: '0 0 0 3px rgba(124,106,245,0.2)' }} />

            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
              {exp.period}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.2rem' }}>{exp.company}</div>
            <div style={{ color: 'var(--accent2)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.8rem' }}>{exp.role}</div>
            <div style={{ color: 'var(--text2)', fontSize: '0.87rem', lineHeight: 1.8 }}>{exp.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

>>>>>>> 4a1b7e187e3554fa26b61fa81ac0c542b4ef5a80
export default Experience;