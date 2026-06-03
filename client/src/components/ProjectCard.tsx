import React from 'react';
import type { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

const rarityColors: Record<string, string> = {
  LEGENDARY: '#8b0000',
  EPIC:      '#4b0082',
  RARE:      '#003388',
  UNCOMMON:  '#2C5A1E',
  COMMON:    '#4A5E2A',
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const rarityColor = rarityColors[project.rarity] || '#4A5E2A';
  const totalBlocks = 10;
  const filled = Math.round((project.xp / 10000) * totalBlocks);
  const xpBar = '█'.repeat(filled) + '░'.repeat(totalBlocks - filled);

  return (
    <div
      onClick={() => onSelect(project)}
      style={{
        background: '#E8F0C8',
        border: '4px solid #2C3A1E',
        boxShadow: 'inset -3px -3px 0 #8BAC4A, inset 3px 3px 0 #fff, 4px 4px 0 #2C3A1E',
        padding: '14px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '170px',
        transition: 'transform 0.06s',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translate(-2px,-2px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translate(0,0)')}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px', color: '#2C3A1E', lineHeight: 1.5 }}>
          {project.icon} {project.name}
        </span>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: rarityColor, flexShrink: 0, marginLeft: '8px' }}>
          [{project.rarity}]
        </span>
      </div>

      {/* Summary */}
      <p style={{
        fontFamily: "'VT323', monospace",
        fontSize: '17px',
        color: '#4A5E2A',
        lineHeight: 1.4,
        flexGrow: 1,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        marginBottom: '10px',
      }}>
        {project.shortSummary}
      </p>

      {/* Footer */}
      <div>
        {/* Stack tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '8px' }}>
          {project.stack.slice(0, 3).map(tech => (
            <span key={tech} style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '6px',
              background: '#8BAC4A',
              color: '#2C3A1E',
              border: '1px solid #2C3A1E',
              padding: '2px 5px',
            }}>
              {tech}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span style={{ fontFamily: "'VT323', monospace", fontSize: '14px', color: '#4A5E2A' }}>
              +{project.stack.length - 3}
            </span>
          )}
        </div>

        {/* XP bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #8BAC4A', paddingTop: '6px' }}>
          <span style={{ fontFamily: "'VT323', monospace", fontSize: '16px', color: '#2C3A1E', letterSpacing: '-1px' }}>{xpBar}</span>
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: '#4A5E2A' }}>+{project.xp} XP</span>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
