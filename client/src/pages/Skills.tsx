import React from 'react';
import { rpgStats, skillCategories } from '../data/skills';
import { StatBar } from '../components/StatBar';
import { PixelSprite } from '../components/PixelSprite';

interface SkillsProps {
  onBack: () => void;
  hideAvatar?: boolean;
}

export const Skills: React.FC<SkillsProps> = ({ onBack, hideAvatar = false }) => {
  return (
    <div className="page-screen">
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>[ CHARACTER STATS — SKILL TREE ]</span>
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
          {/* RPG Stats Column */}
          <div className="pixel-box">
            <div className="section-label">ATTRIBUTES (CORE STATS):</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {rpgStats.map((stat) => (
                <StatBar key={stat.label} label={stat.label} skillName={stat.skillName} value={stat.value} />
              ))}
            </div>
          </div>

          {/* Skill Categories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="pixel-box-light">
                <div className="section-label">{cat.title}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cat.skills.map((skill: string, i: number) => (
                    <span
                      key={i}
                      className="press-start-font"
                      style={{ fontSize: '7px', background: 'var(--gb-medium)', color: 'var(--gb-darkest)', border: '2px solid var(--gb-darkest)', padding: '4px 8px' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="page-footer">[ STATS REFLECT REAL-WORLD PROFICIENCY · B: BACK ]</div>
    </div>
  );
};
export default Skills;
