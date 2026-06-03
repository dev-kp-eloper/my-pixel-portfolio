import React, { useState } from 'react';
import { PixelSprite } from '../components/PixelSprite';

interface ContactProps {
  onBack: () => void;
  hideAvatar?: boolean;
}

export const Contact: React.FC<ContactProps> = ({ onBack, hideAvatar = false }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMsg('ALL FIELDS REQUIRED!');
      setIsError(true);
      return;
    }
    setLoading(true);
    setStatusMsg('SENDING TRANSMISSION...');
    setIsError(false);
    try {
      const res = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMsg('✓ TRANSMISSION SUCCESS!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatusMsg(data.message || 'TRANSMISSION FAILED!');
        setIsError(true);
      }
    } catch {
      setStatusMsg('SERVER OFFLINE!');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-screen">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>[ GUILD INVITATION — SEND SIGNAL ]</span>
          <div
            id="hud-avatar-sprite"
            className="hud-avatar-sprite"
            style={{
              width: '32px',
              height: '32px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              visibility: hideAvatar ? 'hidden' : 'visible'
            }}
          >
            <PixelSprite static className="sprite-container-hud" />
          </div>
        </div>
        <button onClick={onBack} className="page-back-btn">◀ BACK</button>
      </div>

      <div className="page-body">
        <div className="content-grid-2">
          {/* Direct Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="pixel-box">
              <div className="section-label">DIRECT SIGNALS:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { label: 'EMAIL', value: 'deveshpandagre9502@gmail.com', href: 'mailto:deveshpandagre9502@gmail.com' },
                  { label: 'PHONE', value: '+91-8103262591', href: 'tel:+918103262591' },
                  { label: 'GITHUB', value: 'github.com/dev-kp-eloper', href: 'https://github.com/dev-kp-eloper' },
                  { label: 'LINKEDIN', value: 'linkedin.com/in/devesh-kumar-pandagre', href: 'https://www.linkedin.com/in/devesh-kumar-pandagre/' },
                  { label: 'LOCATION', value: 'Indore, Madhya Pradesh, India', href: null },
                ].map(({ label, value, href }) => (
                  <div key={label}>
                    <div className="press-start-font" style={{ fontSize: '8px', color: 'var(--gb-dark)', marginBottom: '4px' }}>{label}:</div>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        style={{ fontFamily: 'VT323, monospace', fontSize: '20px', color: 'var(--gb-darkest)', fontWeight: 'bold', textDecoration: 'underline', display: 'block', wordBreak: 'break-all' }}>
                        {value}
                      </a>
                    ) : (
                      <div style={{ fontFamily: 'VT323, monospace', fontSize: '20px', color: 'var(--gb-darkest)', fontWeight: 'bold' }}>{value}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pixel-box-dark">
              <div className="section-label" style={{ color: 'var(--gb-medium)' }}>OPEN TO:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Full-Time Roles (Start-ups & MNCs)', 'Freelance / Contract Projects', 'Open Source Collaboration', 'Tech Discussions & Networking'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span className="press-start-font" style={{ fontSize: '8px', color: 'var(--gb-medium)' }}>▶</span>
                    <span style={{ fontFamily: 'VT323, monospace', fontSize: '18px', color: 'var(--gb-light)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="pixel-box-light">
            <div className="section-label">&gt; SEND GUILD INVITATION:</div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label className="gb-label">NAME:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  className="gb-input"
                  placeholder="ENTER YOUR NAME"
                />
              </div>
              <div>
                <label className="gb-label">EMAIL:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="gb-input"
                  placeholder="ENTER YOUR EMAIL"
                />
              </div>
              <div>
                <label className="gb-label">MESSAGE:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={loading}
                  rows={5}
                  className="gb-input"
                  placeholder="ENTER YOUR MESSAGE..."
                  style={{ resize: 'vertical' }}
                />
              </div>

              {statusMsg && (
                <div className="press-start-font" style={{ fontSize: '8px', color: isError ? '#cc0000' : 'var(--gb-dark)', padding: '8px', background: isError ? 'rgba(200,0,0,0.1)' : 'rgba(48,98,48,0.1)', border: `2px solid ${isError ? '#cc0000' : 'var(--gb-dark)'}` }}>
                  {statusMsg}
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={onBack} className="pixel-btn" disabled={loading}>
                  B: CANCEL
                </button>
                <button type="submit" className="pixel-btn-dark" disabled={loading}>
                  {loading ? 'SENDING...' : 'A: SEND ▶'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="page-footer">[ B: BACK · TAB: NEXT FIELD · ENTER: SUBMIT ]</div>
    </div>
  );
};
export default Contact;
