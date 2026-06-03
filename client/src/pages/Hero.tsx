import React from 'react';
import { NavMenu } from '../components/NavMenu';
import type { MenuItem } from '../components/NavMenu';
import { PixelSprite } from '../components/PixelSprite';

interface HeroProps {
  onNavigate: (path: string) => void;
  hideAvatar?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, hideAvatar = false }) => {
  const menuItems: MenuItem[] = [
    { label: 'ABOUT', path: '/about' },
    { label: 'EXPERIENCE', path: '/experience' },
    { label: 'PROJECTS', path: '/projects' },
    { label: 'SKILLS', path: '/skills' },
    { label: 'EDUCATION', path: '/education' },
    { label: 'CONTACT', path: '/contact' }
  ];

  return (
    <div className="hero-screen">
      {/* Main hero content */}
      <div className="hero-body">
        {/* Left: Profile card */}
        <div className="hero-profile pixel-box">
          <div className="hero-avatar">
            <div
              id="hero-avatar-sprite"
              className="hero-avatar-sprite"
              style={{ visibility: hideAvatar ? 'hidden' : 'visible' }}
            >
              <PixelSprite static />
            </div>
          </div>
          <div className="hero-profile-info">
            <div className="hero-name">Devesh Kumar Pandagre</div>
            <div className="hero-title">FULL STACK DEVELOPER</div>
            <div className="hero-divider" />
            <div className="hero-stats">
              <div className="hero-stat-row"><span>CLASS:</span> CODER</div>
              <div className="hero-stat-row"><span>GUILD:</span> TCS BaNCS</div>
              <div className="hero-stat-row"><span>SPEC:</span> ISO 20022</div>
              <div className="hero-stat-row"><span>EXP:</span> 2+ YEARS</div>
              <div className="hero-stat-row"><span>XP:</span> +9999</div>
            </div>
          </div>
        </div>

        {/* Center: Intro text */}
        <div className="hero-intro pixel-box-light">
          <div className="hero-intro-label">CHARACTER DESCRIPTION:</div>
          <p className="hero-intro-text">
            Full-Stack Software Developer specializing in React.js/TypeScript and enterprise
            banking systems at TCS BaNCS. Delivered 5+ ISO 20022 cross-border payment
            modules powering international finance workflows. Reduced build time 40% and
            API overhead 30% through targeted optimization quests.
          </p>
          <div className="hero-intro-text" style={{ marginTop: '12px' }}>
            Currently seeking new quests in another company/start-ups where code creates
            real-world impact at scale. Ready for challenging oppertunities which help
            me to grow and upskill myself.
          </div>
          <div className="hero-tags">
            <span className="hero-tag">React.js</span>
            <span className="hero-tag">TypeScript</span>
            <span className="hero-tag">Node.js</span>
            <span className="hero-tag">MongoDB</span>
            <span className="hero-tag">ISO 20022</span>
            <span className="hero-tag">Express</span>
          </div>
        </div>

        {/* Right: Quick links / nav */}
        <div className="hero-nav pixel-box-dark">
          <div className="hero-nav-title">SELECT MISSION:</div>
          <NavMenu
            items={menuItems}
            currentPath="/"
            onSelect={onNavigate}
          />
          <div className="hero-nav-contact">
            <a href="https://github.com/dev-kp-eloper" target="_blank" rel="noopener noreferrer" className="hero-link">GH ↗</a>
            <a href="https://www.linkedin.com/in/devesh-kumar-pandagre/" target="_blank" rel="noopener noreferrer" className="hero-link">LI ↗</a>
            <a href="mailto:deveshpandagre9502@gmail.com" className="hero-link">✉ ↗</a>
          </div>
        </div>
      </div>

      {/* Bottom walking character strip */}
      <div className="hero-ground">
        <div className="hero-ground-tiles">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="hero-ground-tile" style={{ opacity: i % 3 === 0 ? 0.6 : 0.3 }}>▄</span>
          ))}
        </div>
        <PixelSprite />
        <div className="hero-ground-hint blink">PRESS ENTER OR CLICK MENU TO BEGIN ▶</div>
      </div>
    </div>
  );
};
export default Hero;
