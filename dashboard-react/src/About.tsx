import React, { useEffect, useRef } from 'react';
import { useReveal } from './useReveal';
import { SKILLS } from './data';

const About: React.FC = () => {
  const titleRef = useReveal();
  const textRef = useReveal();
  const statsRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        el.querySelectorAll<HTMLElement>('.stat-fill').forEach((fill, i) => {
          setTimeout(() => { fill.style.transform = 'scaleX(1)'; }, i * 120);
        });
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tags = ['SvelteKit', 'TypeScript', 'GSAP', 'Three.js', 'React / Next.js', 'TailwindCSS', 'Node.js', 'Figma'];

  return (
    <section id="about" style={{ padding: '7rem 3rem', background: 'var(--bg2)' }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <span>//</span> 01 — About
      </div>

      <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} className="reveal" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(2.5rem,5vw,3.5rem)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
        The person<br />behind the pixels.
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', marginTop: '4rem', alignItems: 'start' }}>
        {/* Text + skills */}
        <div ref={textRef as React.RefObject<HTMLDivElement>} className="reveal">
          {['I\'m a frontend engineer with 5+ years of experience building production applications that users actually enjoy using. My approach blends engineering rigour with a deep appreciation for interaction design.',
            'I specialize in Svelte & SvelteKit, complex animation systems, and building component libraries that scale. When I\'m not coding, I\'m usually reading about typography or obsessing over smooth 60fps animations.',
            'Currently based in Lagos, open to remote opportunities worldwide.',
          ].map((p, i) => (
            <p key={i} style={{ color: 'var(--text2)', lineHeight: 1.9, marginBottom: '1.2rem', fontSize: '0.95rem' }}>{p}</p>
          ))}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '0.8rem', marginTop: '1.5rem' }}>
            {tags.map((tag) => (
              <div key={tag} style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '0.6rem 1rem', borderRadius: '4px', fontFamily: "'JetBrains Mono',monospace", fontSize: '0.78rem', color: 'var(--text2)', transition: 'all 0.2s', cursor: 'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}>
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Stat bars */}
        <div ref={statsRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {SKILLS.map((skill) => (
            <div key={skill.name} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.5rem', transition: 'transform 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.82rem', fontWeight: 600 }}>
                <span>{skill.name}</span>
                <span style={{ color: 'var(--accent2)', fontFamily: "'JetBrains Mono',monospace" }}>{skill.pct}%</span>
              </div>
              <div style={{ height: 4, background: 'var(--surface2)', borderRadius: 2, overflow: 'hidden' }}>
                <div className="stat-fill" style={{
                  height: '100%', borderRadius: 2,
                  background: 'linear-gradient(90deg,var(--accent),var(--accent3))',
                  transformOrigin: 'left', transform: 'scaleX(0)',
                  transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1)',
                  width: `${skill.pct}%`,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;