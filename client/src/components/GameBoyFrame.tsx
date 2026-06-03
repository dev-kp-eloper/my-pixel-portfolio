import React from 'react';
import './GameBoyFrame.css';

interface GameBoyFrameProps {
  children: React.ReactNode;
  onButtonPress?: (buttonName: string) => void;
}

export const GameBoyFrame: React.FC<GameBoyFrameProps> = ({ children, onButtonPress }) => {
  const handlePress = (btn: string) => {
    if (onButtonPress) {
      onButtonPress(btn);
    }
  };

  return (
    <div className="gb-hardware-container">
      {/* Outer Console Shell */}
      <div className="gb-console">
        {/* Top Screen Border with blue/red accent lines */}
        <div className="gb-screen-bezel">
          <div className="gb-screen-header">
            <div className="gb-screen-header-lines">
              <span className="gb-line-blue"></span>
              <span className="gb-line-red"></span>
            </div>
            <div className="gb-dot-matrix-label press-start-font">
              DOT MATRIX WITH STEREO SOUND
            </div>
          </div>
          
          {/* Main LCD screen area */}
          <div className="gb-screen-wrapper">
            {/* Battery Indicator Light */}
            <div className="gb-battery-section">
              <div className="gb-battery-led active"></div>
              <div className="gb-battery-label font-mono">BATTERY</div>
            </div>

            {/* Screen Content Viewport */}
            <div className="gb-screen scanlines screen-flicker">
              {children}
            </div>
          </div>
        </div>

        {/* Nintendo Game Boy Label */}
        <div className="gb-nintendo-logo">
          <span className="logo-nintendo font-bold">Nintendo</span>
          <span className="logo-gameboy press-start-font italic">GAME BOY</span>
          <span className="logo-color press-start-font text-xs">COLOR</span>
        </div>

        {/* Action Controls Area */}
        <div className="gb-controls">
          {/* D-Pad */}
          <div className="gb-dpad">
            <button 
              className="gb-dpad-btn dpad-up" 
              aria-label="D-Pad Up"
              onClick={() => handlePress('UP')}
            >
              ▲
            </button>
            <button 
              className="gb-dpad-btn dpad-right" 
              aria-label="D-Pad Right"
              onClick={() => handlePress('RIGHT')}
            >
              ▶
            </button>
            <button 
              className="gb-dpad-btn dpad-down" 
              aria-label="D-Pad Down"
              onClick={() => handlePress('DOWN')}
            >
              ▼
            </button>
            <button 
              className="gb-dpad-btn dpad-left" 
              aria-label="D-Pad Left"
              onClick={() => handlePress('LEFT')}
            >
              ◀
            </button>
            <div className="gb-dpad-center"></div>
          </div>

          {/* A/B Action Buttons */}
          <div className="gb-action-buttons">
            <div className="gb-btn-group">
              <button 
                className="gb-round-btn btn-b" 
                aria-label="Button B"
                onClick={() => handlePress('B')}
              >
                B
              </button>
              <span className="btn-label press-start-font">B</span>
            </div>
            <div className="gb-btn-group">
              <button 
                className="gb-round-btn btn-a" 
                aria-label="Button A"
                onClick={() => handlePress('A')}
              >
                A
              </button>
              <span className="btn-label press-start-font">A</span>
            </div>
          </div>
        </div>

        {/* Menu Buttons: SELECT & START */}
        <div className="gb-system-buttons">
          <div className="system-btn-group">
            <button 
              className="gb-pill-btn btn-select" 
              aria-label="Select Button"
              onClick={() => handlePress('SELECT')}
            ></button>
            <span className="system-btn-label press-start-font">SELECT</span>
          </div>
          <div className="system-btn-group">
            <button 
              className="gb-pill-btn btn-start" 
              aria-label="Start Button"
              onClick={() => handlePress('START')}
            ></button>
            <span className="system-btn-label press-start-font">START</span>
          </div>
        </div>

        {/* Sound Grill Speaker cuts */}
        <div className="gb-speaker-grill">
          <span className="grill-cut"></span>
          <span className="grill-cut"></span>
          <span className="grill-cut"></span>
          <span className="grill-cut"></span>
          <span className="grill-cut"></span>
          <span className="grill-cut"></span>
        </div>
      </div>
    </div>
  );
};
export default GameBoyFrame;
