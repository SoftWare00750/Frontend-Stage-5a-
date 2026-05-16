import React, { useState } from 'react';
import { useReveal } from './useReveal';

const Contact: React.FC = () => {
  const titleRef = useReveal();
  const formRef = useReveal();

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) { setError('Please fill in all fields.'); return; }
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) { setError('Please enter a valid email address.'); return; }
    setError('');
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '6px',
    padding: '0.85rem 1rem', color: 'var(--text)', fontFamily: "'Syne',sans-serif", fontSize: '0.9rem',
    outline: 'none', transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" style={{ padding: '7rem 3rem', background: 'var(--bg2)' }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: 'var(--accent)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <span>//</span> 05 — Contact
      </div>

      <h2 ref={titleRef as React.RefObject<HTMLHeadingElement>} className="reveal" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(2.5rem,5vw,3.5rem)', textAlign: 'center', lineHeight: 1.1, marginBottom: '1rem' }}>
        Let's build<br />something great.
      </h2>

      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <p className="reveal" style={{ color: 'var(--text2)', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '0.95rem', textAlign: 'center' }}>
          I'm currently open to new opportunities. Whether you have a project in mind or just want to chat about frontend engineering — my inbox is always open.
        </p>

        <div ref={formRef as React.RefObject<HTMLDivElement>} className="reveal" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '2.5rem' }}>
          {[
            { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Jane Doe' },
            { id: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com' },
          ].map((field) => (
            <div key={field.id} style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
                {field.label}
              </label>
              <input
                type={field.type}
                value={form[field.id as 'name' | 'email']}
                onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                placeholder={field.placeholder}
                style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
            </div>
          ))}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontFamily: "'JetBrains Mono',monospace", fontSize: '0.72rem', color: 'var(--accent2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              Message
            </label>
            <textarea
              rows={5}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Tell me about your project..."
              style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </div>

          {error && <p style={{ color: '#f87171', fontSize: '0.82rem', marginBottom: '1rem', fontFamily: "'JetBrains Mono',monospace" }}>{error}</p>}

          <button onClick={handleSubmit} style={{ width: '100%', background: 'var(--accent)', border: 'none', color: '#fff', padding: '1rem', borderRadius: '6px', fontFamily: "'Syne',sans-serif", fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            Send Message →
          </button>

          {submitted && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '6px', color: '#4ade80', fontSize: '0.85rem', textAlign: 'center', animation: 'slide-in 0.4s ease' }}>
              ✓ Message sent! I'll get back to you within 24 hours.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;