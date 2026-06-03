import React, { useState } from 'react';
import { primaryProjects, secondaryProjects, ossContributions } from '../data/projects';
import type { Project } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { PixelSprite } from '../components/PixelSprite';

interface ProjectsProps {
  onBack: () => void;
  hideAvatar?: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ onBack, hideAvatar = false }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <div className="page-screen">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>[ INVENTORY — PROJECTS & ARTIFACTS ]</span>
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
        {/* Primary Projects */}
        <div>
          <div className="section-label">⚔️ PRIMARY ARTIFACTS — LEGENDARY/EPIC TIER:</div>
          <div className="content-grid-3">
            {primaryProjects.map((p) => (
              <ProjectCard key={p.id} project={p} onSelect={setActiveProject} />
            ))}
          </div>
        </div>

        {/* Secondary Projects */}
        <div>
          <div className="section-label">🛡️ SECONDARY INVENTORY — RARE/UNCOMMON TIER:</div>
          <div className="content-grid-3">
            {secondaryProjects.map((p) => (
              <ProjectCard key={p.id} project={p} onSelect={setActiveProject} />
            ))}
          </div>
        </div>

        {/* OSS Guild Raids */}
        <div className="pixel-box-dark">
          <div className="section-label" style={{ color: 'var(--gb-medium)' }}>[ OSS GUILD RAIDS — OPEN SOURCE CONTRIBUTIONS ]</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {ossContributions.map((contrib, index) => (
              <div key={index} style={{ borderLeft: '3px solid var(--gb-dark)', paddingLeft: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <a
                    href={contrib.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press-start-font"
                    style={{ fontSize: '8px', color: 'var(--gb-medium)', textDecoration: 'underline' }}
                  >
                    {contrib.repo} ↗
                  </a>
                  <span className="press-start-font" style={{ fontSize: '7px', color: contrib.status === 'CONTRIBUTED' ? '#44ff44' : 'var(--gb-dark)' }}>
                    [{contrib.status}]
                  </span>
                </div>
                <div style={{ fontFamily: 'VT323, monospace', fontSize: '18px', color: 'var(--gb-light)', lineHeight: 1.4, marginBottom: '8px' }}>
                  {contrib.description}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {contrib.technologies.map((t: string) => (
                    <span key={t} className="press-start-font" style={{ fontSize: '6px', color: 'var(--gb-dark)', background: 'rgba(48,98,48,0.3)', padding: '2px 6px', border: '1px solid var(--gb-dark)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Dialogue Box Overlay */}
      {activeProject && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,56,15,0.6)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="pixel-box-light" style={{ width: '100%', maxWidth: '760px', maxHeight: '85vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '3px solid var(--gb-darkest)', paddingBottom: '12px', marginBottom: '12px', flexShrink: 0 }}>
              <span className="press-start-font" style={{ fontSize: '11px' }}>{activeProject.icon} {activeProject.name}</span>
              <span className="press-start-font" style={{ fontSize: '9px', color: 'var(--gb-dark)' }}>+{activeProject.xp} XP</span>
            </div>

            {/* Stack Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px', flexShrink: 0 }}>
              {activeProject.stack.map((tech: string) => (
                <span key={tech} className="press-start-font" style={{ fontSize: '7px', background: 'var(--gb-medium)', color: 'var(--gb-darkest)', border: '2px solid var(--gb-darkest)', padding: '3px 8px' }}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <div className="section-label">DESCRIPTION:</div>
              <div style={{ fontFamily: 'VT323, monospace', fontSize: '20px', lineHeight: 1.5, color: 'var(--gb-darkest)', whiteSpace: 'pre-line', marginBottom: '16px' }}>
                {activeProject.detailedDescription}
              </div>

              {activeProject.impactMetrics && activeProject.impactMetrics.length > 0 && (
                <div>
                  <div className="section-label">IMPACT STATS:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {activeProject.impactMetrics.map((metric: string, idx: number) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span className="press-start-font" style={{ fontSize: '8px', color: 'var(--gb-darkest)', flexShrink: 0 }}>▶</span>
                        <span style={{ fontFamily: 'VT323, monospace', fontSize: '19px', color: 'var(--gb-darkest)' }}>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '3px solid var(--gb-darkest)', paddingTop: '12px', marginTop: '12px', flexShrink: 0, flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                {activeProject.githubUrl && (
                  <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className="pixel-btn" style={{ fontSize: '8px', textDecoration: 'none' }}>
                    GITHUB ↗
                  </a>
                )}
                {activeProject.liveUrl && (
                  <a href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer" className="pixel-btn" style={{ fontSize: '8px', textDecoration: 'none' }}>
                    LIVE DEMO ↗
                  </a>
                )}
              </div>
              <button onClick={() => setActiveProject(null)} className="pixel-btn-dark" style={{ fontSize: '8px' }}>
                [ A: CLOSE ]
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="page-footer">[ CLICK ITEM TO INSPECT · SCROLL FOR MORE · B: BACK ]</div>
    </div>
  );
};
export default Projects;
