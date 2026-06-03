import React from 'react';
import { PixelSprite } from '../components/PixelSprite';

interface AboutProps {
  onBack: () => void;
  hideAvatar?: boolean;
}

export const About: React.FC<AboutProps> = ({ onBack, hideAvatar = false }) => {
  return (
    <div className="page-screen">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>[ PLAYER PROFILE ]</span>
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
          {/* Core Identity Card */}
          <div className="pixel-box">
            <div className="section-label">CHARACTER RECORD:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'VT323, monospace', fontSize: '20px' }}>
              <div><span className="press-start-font" style={{ fontSize: '8px', color: 'var(--gb-dark)' }}>NAME: </span>Devesh Kumar Pandagre</div>
              <div><span className="press-start-font" style={{ fontSize: '8px', color: 'var(--gb-dark)' }}>CLASS: </span>FULL-STACK DEVELOPER</div>
              <div><span className="press-start-font" style={{ fontSize: '8px', color: 'var(--gb-dark)' }}>GUILD: </span>TCS BaNCS</div>
              <div><span className="press-start-font" style={{ fontSize: '8px', color: 'var(--gb-dark)' }}>LOCATION: </span>INDORE, INDIA</div>
              <div><span className="press-start-font" style={{ fontSize: '8px', color: 'var(--gb-dark)' }}>SPEC: </span>ISO 20022 FINTECH</div>
              <div><span className="press-start-font" style={{ fontSize: '8px', color: 'var(--gb-dark)' }}>BAND: </span>TCS BAND 'A' 2026 (TOP 10%)</div>
            </div>
          </div>

          {/* Achievements */}
          <div className="pixel-box-light">
            <div className="section-label">★ ACHIEVEMENTS UNLOCKED:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: '🏆', title: 'Beyond Excellence Award', desc: 'Recognized for exceptional performance on ISO 20022 payment modules at TCS' },
                { icon: '⭐', title: 'Employee of the Month', desc: 'Delivered critical release milestones ahead of schedule with zero production incidents' },
                { icon: '🎖', title: 'Technical Excellence Award', desc: 'Pioneered frontend performance optimizations reducing build time by 40%' },
                { icon: '💡', title: 'Innovation SuperStar Award', desc: 'Led initiative to reduce API overhead 30% via debouncing and data-fetch architecture' },
                {
                  icon: '🎯', title: 'TCS Band A 2026', desc: `Achieved top performance rating (Top 10% selectivity) among a cross-functional team
of 20+ professionals, including senior developers.` },
              ].map((a, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--gb-medium)', paddingBottom: '8px' }}>
                  <div className="press-start-font" style={{ fontSize: '8px', color: 'var(--gb-darkest)', marginBottom: '4px' }}>{a.icon} {a.title}</div>
                  <div style={{ fontFamily: 'VT323, monospace', fontSize: '17px', color: 'var(--gb-dark)' }}>{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Character Backstory — full width */}
        <div className="pixel-box-dark">
          <div className="section-label" style={{ color: 'var(--gb-medium)' }}>CHARACTER BACKSTORY:</div>
          <div style={{ fontFamily: 'VT323, monospace', fontSize: '20px', color: 'var(--gb-light)', lineHeight: 1.5 }}>
            I'm a Full-Stack Software Developer with 2+ years of hands-on experience delivering enterprise-grade web applications
            at Tata Consultancy Services (TCS). My primary theatre of operations is the BaNCS Core Banking platform,
            where I build and maintain React.js/TypeScript frontends powering cross-border ISO 20022 payment processing
            for global banking clients.
          </div>
          <div style={{ fontFamily: 'VT323, monospace', fontSize: '20px', color: 'var(--gb-dark)', lineHeight: 1.5, marginTop: '12px' }}>
            Beyond enterprise work, I actively contribute to open-source projects (Twenty CRM, Infisical) and build side
            projects that sharpen my full-stack instincts — from real-time systems to AI-integrated tools. I believe in
            writing code that is not just functional, but resilient, readable, and built to last.
          </div>
        </div>
      </div>

      <div className="page-footer">[ ARROW KEYS: NAVIGATE · B: BACK · SELECT: MENU ]</div>
    </div>
  );
};
export default About;
