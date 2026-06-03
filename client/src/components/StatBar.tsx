import React from 'react';
import { useStatAnimation } from '../hooks/useStatAnimation';

interface StatBarProps {
  label: string;
  skillName: string;
  value: number;
}

export const StatBar: React.FC<StatBarProps> = ({ label, skillName, value }) => {
  const animatedValue = useStatAnimation(value, 1200, 100);
  const totalBlocks = 14;
  const filled = Math.round((animatedValue / 100) * totalBlocks);
  const bar = '█'.repeat(filled) + '░'.repeat(Math.max(0, totalBlocks - filled));

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #8BAC4A',
      paddingBottom: '6px',
      marginBottom: '4px',
      gap: '12px',
      flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', color: '#4A5E2A', minWidth: '70px' }}>
          {label}
        </span>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', color: '#2C3A1E' }}>
          [{skillName}]
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontFamily: "'VT323', monospace", fontSize: '18px', color: '#2C3A1E', letterSpacing: '-1px', userSelect: 'none' }}>
          {bar}
        </span>
        <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '8px', color: '#4A5E2A', minWidth: '52px', textAlign: 'right' }}>
          {animatedValue}/100
        </span>
      </div>
    </div>
  );
};
export default StatBar;
