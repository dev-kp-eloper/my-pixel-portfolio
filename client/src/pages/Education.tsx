import React, { useState } from 'react';
import { PixelSprite } from '../components/PixelSprite';

interface EducationProps {
  onBack: () => void;
  hideAvatar?: boolean;
}

interface ScrollCert {
  name: string;
  issuer: string;
  details: string;
  year: string;
  link: string;
  localPath: string;
}

export const Education: React.FC<EducationProps> = ({ onBack, hideAvatar = false }) => {
  const [selectedScroll, setSelectedScroll] = useState<ScrollCert | null>(null);

  const scrolls: ScrollCert[] = [
    {
      name: 'Software Engineering Job Simulation',
      issuer: 'JPMorgan Chase & Co.',
      details: 'Java 17, Spring Boot, Kafka, JPA',
      year: '2026',
      link: 'https://drive.google.com/file/d/1btN_faa-epfDJt_JToOxOdhG_e97zdCs/view?usp=sharing',
      localPath: '/certificates/jpmorgan_chase_cert.pdf'
    },
    {
      name: 'Introduction to Generative AI',
      issuer: 'IBM SkillsBuild',
      details: 'Generative AI concepts, applications, and foundational models',
      year: '2026',
      link: 'https://drive.google.com/file/d/11G_3LyzpQPCzLfh62qqeZiOAr5J06StH/view?usp=sharing',
      localPath: '/certificates/ibm_generative_ai_cert.pdf'
    },
    {
      name: 'Claude Code in Action',
      issuer: 'Anthropic',
      details: 'Agentic workflows, terminal-based AI commands, context management',
      year: '2026',
      link: 'https://drive.google.com/file/d/1z_gpbZRQYmaz3zPm6is9tAOIl7PNXe4I/view?usp=sharing',
      localPath: '/certificates/claude_code_cert.pdf'
    },
    {
      name: 'Introduction to agent skills',
      issuer: 'Anthropic',
      details: 'Design and configuration of agent tools, MCP server architectures, reasoning loops',
      year: '2026',
      link: 'https://drive.google.com/file/d/1XNgFnUNRAPNtFBcEXwWkbvC3y-Uw9_PE/view?usp=sharing',
      localPath: '/certificates/agent_skills_cert.pdf'
    }
  ];

  return (
    <div className="page-screen">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>[ ORIGIN STORY — EDUCATION & CERTIFICATIONS ]</span>
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
          {/* Academic Record */}
          <div>
            <div className="pixel-box">
              <div className="section-label">CREATION RECORD (ACADEMICS):</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div className="press-start-font" style={{ fontSize: '8px', color: 'var(--gb-dark)', marginBottom: '4px' }}>INSTITUTION:</div>
                  <div style={{ fontFamily: 'VT323, monospace', fontSize: '20px', fontWeight: 'bold', color: 'var(--gb-darkest)' }}>
                    University Institute of Technology, RGPV
                  </div>
                  <div style={{ fontFamily: 'VT323, monospace', fontSize: '16px', color: 'var(--gb-dark)' }}>Bhopal, Madhya Pradesh, India</div>
                </div>
                <div>
                  <div className="press-start-font" style={{ fontSize: '8px', color: 'var(--gb-dark)', marginBottom: '4px' }}>DEGREE:</div>
                  <div style={{ fontFamily: 'VT323, monospace', fontSize: '20px', fontWeight: 'bold', color: 'var(--gb-darkest)' }}>
                    B.Tech — Computer Science & Engineering
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingTop: '8px', borderTop: '2px solid var(--gb-darkest)' }}>
                  <div>
                    <div className="press-start-font" style={{ fontSize: '7px', color: 'var(--gb-dark)' }}>CGPA:</div>
                    <div style={{ fontFamily: 'VT323, monospace', fontSize: '22px', fontWeight: 'bold', color: 'var(--gb-darkest)' }}>8.1 / 10</div>
                  </div>
                  <div>
                    <div className="press-start-font" style={{ fontSize: '7px', color: 'var(--gb-dark)' }}>GRADUATED:</div>
                    <div style={{ fontFamily: 'VT323, monospace', fontSize: '22px', fontWeight: 'bold', color: 'var(--gb-darkest)' }}>2024</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Backstory */}
            <div className="pixel-box-dark" style={{ marginTop: '16px' }}>
              <div className="section-label" style={{ color: 'var(--gb-medium)' }}>ORIGIN STORY:</div>
              <div style={{ fontFamily: 'VT323, monospace', fontSize: '19px', color: 'var(--gb-light)', lineHeight: 1.5 }}>
                Born and raised in Betul, Madhya Pradesh, India. Enrolled in UIT RGPV to study
                computer Science, databases, and algorithms. Specialized in MERN stack web
                development through dedicated side-projects and internships. Upon graduation in 2024,
                recruited into the TCS, in TCS BaNCS Payments engineering clan where I continue building
                enterprise-grade cross-border banking engines daily.
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="section-label">📜 SCROLLS COLLECTED (CERTIFICATIONS):</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {scrolls.map((scroll, i) => (
                <div key={i} className="pixel-box-light">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', alignItems: 'flex-start' }}>
                    <div className="press-start-font" style={{ fontSize: '8px', color: 'var(--gb-darkest)', lineHeight: 1.5 }}>{scroll.name}</div>
                    <span className="press-start-font" style={{ fontSize: '7px', color: 'var(--gb-dark)', flexShrink: 0, marginLeft: '8px' }}>[{scroll.year}]</span>
                  </div>
                  <div className="press-start-font" style={{ fontSize: '7px', color: 'var(--gb-dark)', marginBottom: '6px' }}>
                    Issuer: {scroll.issuer}
                  </div>
                  <div style={{ fontFamily: 'VT323, monospace', fontSize: '18px', color: 'var(--gb-dark)', lineHeight: 1.4, marginBottom: '8px' }}>
                    Skills: {scroll.details}
                  </div>
                  <button
                    onClick={() => setSelectedScroll(scroll)}
                    className="press-start-font"
                    style={{
                      fontSize: '7px',
                      color: 'var(--gb-darkest)',
                      textDecoration: 'underline',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    VIEW CERTIFICATE ↗
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedScroll && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="pixel-box" style={{
            width: '100%',
            maxWidth: '850px',
            height: '85%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--gb-light)',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid var(--gb-darkest)', paddingBottom: '8px' }}>
              <div className="press-start-font" style={{ fontSize: '9px', color: 'var(--gb-darkest)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>
                {selectedScroll.name}
              </div>
              <button
                onClick={() => setSelectedScroll(null)}
                className="press-start-font"
                style={{
                  fontSize: '9px',
                  background: 'var(--gb-darkest)',
                  color: 'var(--gb-light)',
                  border: 'none',
                  padding: '4px 8px',
                  cursor: 'pointer'
                }}
              >
                X
              </button>
            </div>
            
            <div style={{ flex: 1, backgroundColor: '#000', border: '3px solid var(--gb-darkest)', position: 'relative', overflow: 'hidden' }}>
              <iframe
                src={selectedScroll.localPath}
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ backgroundColor: '#fff', border: 'none' }}
                title={selectedScroll.name}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <a
                href={selectedScroll.localPath}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn"
                style={{ fontSize: '8px', textDecoration: 'none' }}
              >
                OPEN FULL PDF ↗
              </a>
              <a
                href={selectedScroll.link}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-btn"
                style={{ fontSize: '8px', textDecoration: 'none' }}
              >
                DRIVE LINK ↗
              </a>
              <button
                onClick={() => setSelectedScroll(null)}
                className="pixel-btn"
                style={{ fontSize: '8px' }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="page-footer">[ B: BACK ]</div>
    </div>
  );
};
export default Education;
