import React, { useEffect, useState } from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { useStatAnimation } from '../hooks/useStatAnimation';

// Design #5 palette constants
const C = {
  darkest: '#2C3A1E',
  dark: '#4A5E2A',
  medium: '#8BAC4A',
  light: '#CADC9F',
  accent: '#E8F0C8',
};

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const { displayedText, isFinished: nameFinished } = useTypingEffect('Devesh Kumar Pandagre', 80, 600);
  const { displayedText: taglineText, isFinished: taglineFinished } = useTypingEffect(
    'FULL STACK DEV | ISO 20022 | MERN',
    45,
    2400
  );
  const skillVal = useStatAnimation(85, 1500, 600);
  const [showPressStart, setShowPressStart] = useState(false);

  useEffect(() => {
    if (taglineFinished) {
      const t = setTimeout(() => setShowPressStart(true), 600);
      return () => clearTimeout(t);
    }
  }, [taglineFinished]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['Enter', ' ', 's', 'a', 'ArrowUp', 'ArrowDown'].includes(e.key)) onBootComplete();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onBootComplete]);

  return (
    <div
      onClick={onBootComplete}
      style={{
        position: 'absolute', inset: 0,
        background: C.light,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '28px 32px',
        cursor: 'pointer',
        userSelect: 'none',
        fontFamily: "'VT323', monospace",
        color: C.darkest,
      }}
    >
      {/* Top info bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Press Start 2P', monospace", fontSize: '9px', color: C.dark }}>
        <span>© 1989-2026 NINTENDO</span>
        <span>LINK STATUS: OK</span>
      </div>

      {/* Center branding */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '28px' }}>

        {/* Logo box */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            border: `4px solid ${C.darkest}`,
            padding: '16px 28px',
            background: C.accent,
            boxShadow: `4px 4px 0 ${C.darkest}`,
          }}>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '22px', letterSpacing: '4px', color: C.darkest }}>
              GAME BOY
            </div>
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px', marginTop: '6px', color: C.dark, letterSpacing: '2px' }}>
              COLOR PORTFOLIO
            </div>
          </div>
        </div>

        {/* Typed name & tagline */}
        <div style={{ width: '380px', textAlign: 'left' }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '9px',
            color: C.darkest,
            minHeight: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            paddingLeft: '6px',
          }}>
            <span style={{ display: 'inline-block' }}>{displayedText}</span>
            {!nameFinished && <span className="blink-fast" style={{ color: C.dark, display: 'inline-block' }}>_</span>}
          </div>
          <div style={{
            fontFamily: "'VT323', monospace",
            fontSize: '20px',
            color: C.dark,
            marginTop: '8px',
            minHeight: '28px',
            paddingLeft: '6px',
          }}>
            {taglineText}
          </div>

          {/* Skill progress bar */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Press Start 2P', monospace", fontSize: '8px', color: C.darkest, marginBottom: '6px' }}>
              <span>SKILL LEVEL:</span>
              <span>{skillVal}/100</span>
            </div>
            <div style={{ border: `3px solid ${C.darkest}`, padding: '3px', background: C.light, height: '22px', display: 'flex', alignItems: 'center' }}>
              <div style={{
                background: C.darkest,
                height: '100%',
                width: `${skillVal}%`,
                transition: 'width 0.1s ease-out',
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Press Start */}
      <div style={{ height: '56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        {showPressStart ? (
          <span className="blink" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '12px', color: C.darkest }}>
            ▶ PRESS START / CLICK
          </span>
        ) : (
          <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '9px', color: C.dark }}>
            LOADING PORTFOLIO...
          </span>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: C.dark }}>
        [ PRESS ENTER OR CLICK ANYWHERE ]
      </div>
    </div>
  );
};
export default BootScreen;
