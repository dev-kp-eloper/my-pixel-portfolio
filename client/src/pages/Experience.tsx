import React from 'react';
import { quests } from '../data/experience';
import { PixelSprite } from '../components/PixelSprite';

interface ExperienceProps {
  onBack: () => void;
  hideAvatar?: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({ onBack, hideAvatar = false }) => {
  return (
    <div className="page-screen">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>[ QUEST LOG — CAREER HISTORY ]</span>
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
        {quests.map((quest) => (
          <div key={quest.id} className={quest.type === 'MAIN' ? 'pixel-box' : 'pixel-box-light'}>
            {/* Quest Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--gb-darkest)', paddingBottom: '10px', marginBottom: '14px' }}>
              <div>
                <div className="press-start-font" style={{
                  fontSize: '9px',
                  color: quest.type === 'MAIN' ? '#8b0000' : '#003388',
                  marginBottom: '6px'
                }}>
                  [{quest.type} QUEST]
                </div>
                <div className="press-start-font" style={{ fontSize: '12px', color: 'var(--gb-darkest)', lineHeight: 1.5 }}>
                  {quest.guildName}
                </div>
                <div style={{ fontFamily: 'VT323, monospace', fontSize: '17px', color: 'var(--gb-dark)', marginTop: '4px' }}>
                  {quest.role} · {quest.location}
                </div>
              </div>
              <div className="press-start-font" style={{ fontSize: '8px', color: 'var(--gb-dark)', flexShrink: 0, marginLeft: '16px' }}>
                {quest.duration}
              </div>
            </div>

            {/* Description */}
            <div style={{ fontFamily: 'VT323, monospace', fontSize: '20px', color: 'var(--gb-darkest)', lineHeight: 1.5, marginBottom: '14px' }}>
              {quest.description}
            </div>

            {/* Objectives */}
            <div className="section-label">OBJECTIVES COMPLETED:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {quest.objectives.map((obj, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span className="press-start-font" style={{ fontSize: '8px', color: 'var(--gb-darkest)', flexShrink: 0, marginTop: '3px' }}>[✓]</span>
                  <span style={{ fontFamily: 'VT323, monospace', fontSize: '19px', lineHeight: 1.4, color: 'var(--gb-darkest)' }}>{obj}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="page-footer">[ SCROLL TO VIEW ALL QUESTS · B: BACK ]</div>
    </div>
  );
};
export default Experience;
