import React, { useEffect, useState } from 'react';

export interface MenuItem {
  label: string;
  path: string;
}

interface NavMenuProps {
  items: MenuItem[];
  currentPath: string;
  onSelect: (path: string) => void;
}

export const NavMenu: React.FC<NavMenuProps> = ({ items, currentPath, onSelect }) => {
  const initialIndex = items.findIndex(item => item.path === currentPath);
  const [selectedIndex, setSelectedIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  useEffect(() => {
    const idx = items.findIndex(item => item.path === currentPath);
    if (idx >= 0) setSelectedIndex(idx);
  }, [currentPath, items]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % items.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + items.length) % items.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onSelect(items[selectedIndex].path);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, items, onSelect]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      background: '#2C3A1E',
      border: '3px solid #4A5E2A',
      padding: '12px 10px',
    }}>
      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '7px', color: '#4A5E2A', borderBottom: '1px solid #4A5E2A', paddingBottom: '8px', marginBottom: '6px', letterSpacing: '1px' }}>
        SELECT LEVEL:
      </div>
      {items.map((item, index) => {
        const isSelected = index === selectedIndex;
        const isActive = item.path === currentPath;
        return (
          <div
            key={item.path}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => onSelect(item.path)}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '8px',
              padding: '6px 4px',
              userSelect: 'none',
              color: isActive ? '#CADC9F' : isSelected ? '#8BAC4A' : '#4A5E2A',
              gap: '8px',
            }}
          >
            <span
              className={isSelected ? 'blink' : ''}
              style={{ width: '14px', opacity: isSelected ? 1 : 0, color: '#8BAC4A', fontSize: '10px' }}
            >
              ▶
            </span>
            {item.label}
          </div>
        );
      })}
    </div>
  );
};
export default NavMenu;
