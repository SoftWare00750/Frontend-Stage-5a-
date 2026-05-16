<<<<<<< HEAD
import React, { useState } from 'react';
import { useReveal } from './useReveal';
import { PROJECTS, Project } from './data';

type Filter = 'all' | 'svelte' | '3d' | 'fullstack';

const ProjectCard: React.FC<{ project: Project; delay: number }> = ({ project, delay }) => {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="reveal"
      style={{ transitionDelay: `${delay}s`, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer', position: 'relative', transform: hovered ? 'translateY(-6px)' : 'translateY(0)', boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4)' : 'none', borderColor: hovered ? 'rgba(124,106,245,0.4)' : 'var(--border)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ height: 200, position: 'relative', overflow: 'hidden', background: project.gradient }}>
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', transition: 'transform 0.3s', transform: hovered ? 'scale(1.1)' : 'scale(1)' }}>
          {project.emoji}
        </div>
        <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(5,5,8,0.8)', border: '1px solid var(--border)', padding: '0.3rem 0.7rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent2)' }}>
          {project.badge}
        </span>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{project.title}</h3>
        <p style={{ color: 'var(--text2)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>{project.desc}</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.3rem' }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{ background: 'rgba(124,106,245,0.1)', border: '1px solid rgba(124,106,245,0.2)', padding: '0.25rem 0.6rem', borderRadius: '3px', fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', color: 'var(--accent2)' }}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href={project.demo} style={{ color: 'var(--text3)', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent2)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}>↗ Live Demo</a>
          <a href={project.github} style={{ color: 'var(--text3)', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent2)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}>⌥ GitHub</a>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const titleRef = useReveal();
  const [filter, setFilter] = useState<Filter>('all');

  const FILTERS: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'svelte', label: 'Svelte' },
    { key: '3d', label: '3D / WebGL' },
    { key: 'fullstack', label: 'Full Stack' },
  ];

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="work" style={{ padding: '7rem 3rem', background: 'var(--bg)' }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <span>//</span> 02 — Work
      </div>

      <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} className="reveal" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(2.5rem,5vw,3.5rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
        Selected<br />projects.
      </h2>
      <p className="reveal" style={{ color: 'var(--text2)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 500, marginBottom: '2rem' }}>
        A curated selection of work I'm proud of. From real-time data dashboards to immersive 3D experiences.
      </p>

      <div className="reveal" style={{ display: 'flex', gap: '0.8rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        {FILTERS.map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{
            background: filter === f.key ? 'var(--accent)' : 'var(--surface)',
            border: `1px solid ${filter === f.key ? 'var(--accent)' : 'var(--border)'}`,
            padding: '0.5rem 1.2rem', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: filter === f.key ? '#fff' : 'var(--text2)',
            cursor: 'pointer', transition: 'all 0.2s',
          }}>{f.label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: '1.5rem' }}>
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
};

=======
import React, { useState } from 'react';
import { useReveal } from './useReveal';
import { PROJECTS, Project } from './data';

type Filter = 'all' | 'svelte' | '3d' | 'fullstack';

const ProjectCard: React.FC<{ project: Project; delay: number }> = ({ project, delay }) => {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="reveal"
      style={{ transitionDelay: `${delay}s`, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer', position: 'relative', transform: hovered ? 'translateY(-6px)' : 'translateY(0)', boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4)' : 'none', borderColor: hovered ? 'rgba(124,106,245,0.4)' : 'var(--border)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ height: 200, position: 'relative', overflow: 'hidden', background: project.gradient }}>
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', transition: 'transform 0.3s', transform: hovered ? 'scale(1.1)' : 'scale(1)' }}>
          {project.emoji}
        </div>
        <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(5,5,8,0.8)', border: '1px solid var(--border)', padding: '0.3rem 0.7rem', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent2)' }}>
          {project.badge}
        </span>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{project.title}</h3>
        <p style={{ color: 'var(--text2)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>{project.desc}</p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.3rem' }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{ background: 'rgba(124,106,245,0.1)', border: '1px solid rgba(124,106,245,0.2)', padding: '0.25rem 0.6rem', borderRadius: '3px', fontFamily: "'JetBrains Mono',monospace", fontSize: '0.7rem', color: 'var(--accent2)' }}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href={project.demo} style={{ color: 'var(--text3)', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent2)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}>↗ Live Demo</a>
          <a href={project.github} style={{ color: 'var(--text3)', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent2)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}>⌥ GitHub</a>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const titleRef = useReveal();
  const [filter, setFilter] = useState<Filter>('all');

  const FILTERS: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'svelte', label: 'Svelte' },
    { key: '3d', label: '3D / WebGL' },
    { key: 'fullstack', label: 'Full Stack' },
  ];

  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="work" style={{ padding: '7rem 3rem', background: 'var(--bg)' }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <span>//</span> 02 — Work
      </div>

      <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} className="reveal" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(2.5rem,5vw,3.5rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
        Selected<br />projects.
      </h2>
      <p className="reveal" style={{ color: 'var(--text2)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 500, marginBottom: '2rem' }}>
        A curated selection of work I'm proud of. From real-time data dashboards to immersive 3D experiences.
      </p>

      <div className="reveal" style={{ display: 'flex', gap: '0.8rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        {FILTERS.map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{
            background: filter === f.key ? 'var(--accent)' : 'var(--surface)',
            border: `1px solid ${filter === f.key ? 'var(--accent)' : 'var(--border)'}`,
            padding: '0.5rem 1.2rem', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: filter === f.key ? '#fff' : 'var(--text2)',
            cursor: 'pointer', transition: 'all 0.2s',
          }}>{f.label}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: '1.5rem' }}>
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
};

>>>>>>> 4a1b7e187e3554fa26b61fa81ac0c542b4ef5a80
export default Projects;