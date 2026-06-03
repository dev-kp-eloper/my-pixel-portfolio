import { useState, useEffect } from 'react';
import { BootScreen } from './components/BootScreen';
import { Hero } from './pages/Hero';
import { About } from './pages/About';
import { Experience } from './pages/Experience';
import { Projects } from './pages/Projects';
import { Skills } from './pages/Skills';
import { Education } from './pages/Education';
import { Contact } from './pages/Contact';
import { PixelSprite } from './components/PixelSprite';

import './styles/gameboy.css';
import './styles/pixel-borders.css';

const NAV_ITEMS = [
  { label: '[ HOME ]', path: '/' },
  { label: '[ ABOUT ]', path: '/about' },
  { label: '[ QUESTS ]', path: '/experience' },
  { label: '[ ITEMS ]', path: '/projects' },
  { label: '[ STATS ]', path: '/skills' },
  { label: '[ ORIGIN ]', path: '/education' },
  { label: '[ SIGNAL ]', path: '/contact' },
];

const PAGE_HEADINGS: Record<string, string> = {
  '/about': '[ PLAYER PROFILE ]',
  '/experience': '[ QUEST LOG ]',
  '/projects': '[ ITEM POUCH ]',
  '/skills': '[ STATS & ABILITIES ]',
  '/education': '[ ORIGIN STORY ]',
  '/contact': '[ SEND SIGNAL ]',
};

export default function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [activeScreen, setActiveScreen] = useState('/');
  const [isWiping, setIsWiping] = useState(false);
  const [walkingSprite, setWalkingSprite] = useState<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    scale: number;
    targetScale: number;
    facing: 'left' | 'right';
    isActive: boolean;
    step: 'walk-to-menu' | 'walk-to-heading';
  } | null>(null);

  const handleNavigate = (path: string) => {
    if (path === activeScreen) return;

    // Get the starting element for walking
    const isStartingFromHome = activeScreen === '/';
    const startElId = isStartingFromHome ? 'hero-avatar-sprite' : 'hud-avatar-sprite';
    const startEl = document.getElementById(startElId);

    // Get the target menu button
    const targetMenuId = `nav-btn-${path.replace('/', '') || 'home'}`;
    const targetMenuEl = document.getElementById(targetMenuId);

    if (startEl && targetMenuEl) {
      const startRect = startEl.getBoundingClientRect();
      const menuRect = targetMenuEl.getBoundingClientRect();

      // Start coordinate
      const startX = startRect.left;
      const startY = startRect.top;

      // Current scale and menu coordinate (middle of the menu tab)
      const currentScale = isStartingFromHome ? 2 : 0.5;
      const menuScale = 0.5;
      const menuX = menuRect.left + (menuRect.width / 2) - (menuScale * 32);
      const menuY = menuRect.top + (menuRect.height / 2) - (menuScale * 32);

      // Phase 1: Walk to the clicked sidebar menu tab
      setWalkingSprite({
        x: startX,
        y: startY,
        targetX: menuX,
        targetY: menuY,
        scale: currentScale,
        targetScale: menuScale,
        facing: 'left', // Face left walking towards sidebar
        isActive: false,
        step: 'walk-to-menu'
      });

      // Force trigger transition
      setTimeout(() => {
        setWalkingSprite(prev => prev ? { ...prev, isActive: true } : null);
      }, 50);

      // Phase 1 ends after 800ms
      setTimeout(() => {
        setIsWiping(true);

        setTimeout(() => {
          // Change the page screen and header
          setActiveScreen(path);
          setIsWiping(false);

          // Phase 2: Wait 100ms for new DOM to mount, then walk to the new heading
          setTimeout(() => {
            const isGoingToHome = path === '/';
            const endElId = isGoingToHome ? 'hero-avatar-sprite' : 'hud-avatar-sprite';
            const endEl = document.getElementById(endElId);

            if (endEl) {
              const endRect = endEl.getBoundingClientRect();
              const targetScale = isGoingToHome ? 2 : 0.5;

              // Starts at the menu button
              const currentMenuEl = document.getElementById(targetMenuId);
              if (currentMenuEl) {
                const currentMenuRect = currentMenuEl.getBoundingClientRect();
                const menuScale = 0.5;
                const startX2 = currentMenuRect.left + (currentMenuRect.width / 2) - (menuScale * 32);
                const startY2 = currentMenuRect.top + (currentMenuRect.height / 2) - (menuScale * 32);

                const endX = endRect.left;
                const endY = endRect.top;

                setWalkingSprite({
                  x: startX2,
                  y: startY2,
                  targetX: endX,
                  targetY: endY,
                  scale: menuScale,
                  targetScale: targetScale,
                  facing: 'right', // Face right walking towards heading/avatar
                  isActive: false,
                  step: 'walk-to-heading'
                });

                // Start second walk transition
                setTimeout(() => {
                  setWalkingSprite(prev => prev ? { ...prev, isActive: true } : null);
                }, 50);

                // Wait 800ms for Phase 2 to complete
                setTimeout(() => {
                  setWalkingSprite(null);
                }, 800);
              }
            } else {
              setWalkingSprite(null);
            }
          }, 100);

        }, 400); // Wait for screen wipe halfway point (400ms)

      }, 850); // After Phase 1 completes
    } else {
      // Fallback navigate
      setIsWiping(true);
      setTimeout(() => {
        setActiveScreen(path);
        setIsWiping(false);
      }, 400);
    }
  };

  // Keyboard navigation for arrow keys
  useEffect(() => {
    if (!isBooted) return;
    const handleKey = (e: KeyboardEvent) => {
      // Ignore navigation keys if user is typing in a form input or textarea
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      const currentIdx = NAV_ITEMS.findIndex(n => n.path === activeScreen);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const next = NAV_ITEMS[(currentIdx + 1) % NAV_ITEMS.length];
        handleNavigate(next.path);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const prev = NAV_ITEMS[(currentIdx - 1 + NAV_ITEMS.length) % NAV_ITEMS.length];
        handleNavigate(prev.path);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isBooted, activeScreen]);

  if (!isBooted) {
    return (
      <div className="fullscreen-boot scanlines screen-flicker">
        <div className="screen-wipe" />
        <BootScreen onBootComplete={() => setIsBooted(true)} />
      </div>
    );
  }

  return (
    <div className="fullscreen-app scanlines">
      {/* Screen wipe transition layer */}
      <div className={`screen-wipe ${isWiping ? 'active' : ''}`} />

      {/* Top HUD Bar */}
      <header className="gb-topbar">
        <div className="gb-topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="gb-topbar-logo" style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>★ DEVESH.EXE</span>
          {activeScreen !== '/' ? (
            <div className="gb-topbar-heading-container" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: 'var(--gb-light)', opacity: 0.9, marginLeft: '8px', letterSpacing: '0.5px' }}>
                {PAGE_HEADINGS[activeScreen]}
              </span>
            </div>
          ) : (
            <span className="gb-topbar-sub">LVL 24 · FULL-STACK DEV</span>
          )}
        </div>
        <div className="gb-topbar-status">
          <span className="gb-led active" title="Battery" />
          <span className="gb-topbar-hp">HP ❤❤❤×</span>
          <span className="gb-topbar-xp">9999 XP</span>
        </div>
      </header>

      <div className="gb-layout">
        {/* Side Navigation */}
        <nav className="gb-sidenav">
          <div className="gb-sidenav-title">SELECT LEVEL</div>
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.path;
            return (
              <button
                key={item.path}
                id={`nav-btn-${item.path.replace('/', '') || 'home'}`}
                onClick={() => handleNavigate(item.path)}
                className={`gb-navitem ${isActive ? 'gb-navitem-active' : ''}`}
              >
                <span className={`gb-navitem-arrow ${isActive ? 'blink' : ''}`}>▶</span>
                {item.label}
              </button>
            );
          })}

          {/* D-pad hint */}
          <div className="gb-sidenav-hint">
            <div>▲▼ NAVIGATE</div>
            <div>ENTER SELECT</div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="gb-content">
          {activeScreen === '/' && (
            <Hero onNavigate={handleNavigate} hideAvatar={!!walkingSprite} />
          )}
          {activeScreen === '/about' && <About onBack={() => handleNavigate('/')} hideAvatar={!!walkingSprite} />}
          {activeScreen === '/experience' && <Experience onBack={() => handleNavigate('/')} hideAvatar={!!walkingSprite} />}
          {activeScreen === '/projects' && <Projects onBack={() => handleNavigate('/')} hideAvatar={!!walkingSprite} />}
          {activeScreen === '/skills' && <Skills onBack={() => handleNavigate('/')} hideAvatar={!!walkingSprite} />}
          {activeScreen === '/education' && <Education onBack={() => handleNavigate('/')} hideAvatar={!!walkingSprite} />}
          {activeScreen === '/contact' && <Contact onBack={() => handleNavigate('/')} hideAvatar={!!walkingSprite} />}
        </main>
      </div>

      {/* Walking Sprite Transition Overlay */}
      {walkingSprite && (
        <div
          className="sprite-container-walking"
          style={{
            left: walkingSprite.isActive ? `${walkingSprite.targetX}px` : `${walkingSprite.x}px`,
            top: walkingSprite.isActive ? `${walkingSprite.targetY}px` : `${walkingSprite.y}px`,
            transform: `scale(${walkingSprite.isActive ? walkingSprite.targetScale : walkingSprite.scale}) scaleX(${walkingSprite.facing === 'left' ? -1 : 1})`,
            transformOrigin: 'top left',
            transition: walkingSprite.isActive
              ? 'left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              : 'none'
          }}
        >
          <PixelSprite className="sprite-container-transition" />
        </div>
      )}

      {/* Bottom status bar */}
      <footer className="gb-statusbar">
        <span>ARROWS: NAVIGATE</span>
        <span className="blink">■</span>
        <span>ENTER: SELECT</span>
        <span className="blink">■</span>
        <span>ESC: BACK</span>
        <span className="blink">■</span>
        <span>© Devesh Kumar Pandagre 2026</span>
      </footer>
    </div>
  );
}
