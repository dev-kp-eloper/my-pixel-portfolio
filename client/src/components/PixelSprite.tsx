import React from 'react';
import './PixelSprite.css';

export const PixelSprite: React.FC<{ static?: boolean; className?: string }> = ({ static: isStatic = false, className = '' }) => {
  const containerClass = className 
    ? className 
    : (isStatic ? 'sprite-container-static' : 'sprite-container');
  return (
    <div className={containerClass}>
      {/* Frame 1: Standing Idle */}
      <svg className="sprite-frame frame-idle" viewBox="0 0 16 16" width="64" height="64">
        {/* Cap (Red) */}
        <rect x="4" y="1" width="8" height="3" fill="#8b0000" />
        <rect x="3" y="2" width="10" height="1" fill="#8b0000" />
        <rect x="9" y="2" width="4" height="1" fill="#c0c0c0" /> {/* Cap Visor */}
        
        {/* Face/Skin (Peach) */}
        <rect x="4" y="4" width="7" height="3" fill="#ffdbac" />
        <rect x="4" y="7" width="6" height="1" fill="#ffdbac" />
        
        {/* Eyes/Glasses (Dark Brown/Black) */}
        <rect x="5" y="4" width="1" height="1" fill="#0F380F" />
        <rect x="8" y="4" width="1" height="1" fill="#0F380F" />
        <rect x="4" y="4" width="6" height="1" fill="#306230" opacity="0.3" /> {/* Glasses frame */}
        
        {/* Hair (Brown) */}
        <rect x="3" y="3" width="1" height="3" fill="#5c4033" />
        <rect x="4" y="3" width="7" height="1" fill="#5c4033" />
        <rect x="10" y="3" width="1" height="2" fill="#5c4033" />
        
        {/* Shirt/Torso (Blue/Cyan) */}
        <rect x="3" y="8" width="9" height="4" fill="#008080" />
        <rect x="4" y="9" width="7" height="3" fill="#00ced1" />
        {/* Backpack strap */}
        <rect x="4" y="8" width="1" height="4" fill="#5c4033" />
        <rect x="1" y="7" width="2" height="4" fill="#5c4033" /> {/* Backpack pouch */}
        
        {/* Pants (Dark Greenish Brown) */}
        <rect x="4" y="12" width="7" height="2" fill="#0F380F" />
        
        {/* Shoes (Gray/Black) */}
        <rect x="4" y="14" width="3" height="2" fill="#306230" />
        <rect x="8" y="14" width="3" height="2" fill="#306230" />
      </svg>

      {/* Frame 2: Walking Frame A */}
      <svg className="sprite-frame frame-walk-1" viewBox="0 0 16 16" width="64" height="64">
        {/* Cap (Red) */}
        <rect x="4" y="1" width="8" height="3" fill="#8b0000" />
        <rect x="3" y="2" width="10" height="1" fill="#8b0000" />
        <rect x="9" y="2" width="4" height="1" fill="#c0c0c0" />
        
        {/* Face/Skin */}
        <rect x="4" y="4" width="7" height="3" fill="#ffdbac" />
        <rect x="4" y="7" width="6" height="1" fill="#ffdbac" />
        
        {/* Eyes/Glasses */}
        <rect x="5" y="4" width="1" height="1" fill="#0F380F" />
        <rect x="8" y="4" width="1" height="1" fill="#0F380F" />
        
        {/* Hair (Brown) */}
        <rect x="3" y="3" width="1" height="3" fill="#5c4033" />
        <rect x="4" y="3" width="7" height="1" fill="#5c4033" />
        
        {/* Shirt/Torso */}
        <rect x="3" y="8" width="9" height="4" fill="#008080" />
        <rect x="4" y="9" width="7" height="3" fill="#00ced1" />
        <rect x="4" y="8" width="1" height="4" fill="#5c4033" />
        <rect x="1" y="7" width="2" height="4" fill="#5c4033" />
        
        {/* Pants */}
        <rect x="4" y="12" width="7" height="2" fill="#0F380F" />
        
        {/* Walking Legs (Left foot forward, Right foot up) */}
        <rect x="3" y="14" width="3" height="2" fill="#306230" />
        <rect x="8" y="13" width="2" height="2" fill="#306230" />
      </svg>

      {/* Frame 3: Walking Frame B */}
      <svg className="sprite-frame frame-walk-2" viewBox="0 0 16 16" width="64" height="64">
        {/* Cap (Red) */}
        <rect x="4" y="1" width="8" height="3" fill="#8b0000" />
        <rect x="3" y="2" width="10" height="1" fill="#8b0000" />
        <rect x="9" y="2" width="4" height="1" fill="#c0c0c0" />
        
        {/* Face/Skin */}
        <rect x="4" y="4" width="7" height="3" fill="#ffdbac" />
        <rect x="4" y="7" width="6" height="1" fill="#ffdbac" />
        
        {/* Eyes/Glasses */}
        <rect x="5" y="4" width="1" height="1" fill="#0F380F" />
        <rect x="8" y="4" width="1" height="1" fill="#0F380F" />
        
        {/* Hair (Brown) */}
        <rect x="3" y="3" width="1" height="3" fill="#5c4033" />
        <rect x="4" y="3" width="7" height="1" fill="#5c4033" />
        
        {/* Shirt/Torso */}
        <rect x="3" y="8" width="9" height="4" fill="#008080" />
        <rect x="4" y="9" width="7" height="3" fill="#00ced1" />
        <rect x="4" y="8" width="1" height="4" fill="#5c4033" />
        <rect x="1" y="7" width="2" height="4" fill="#5c4033" />
        
        {/* Pants */}
        <rect x="4" y="12" width="7" height="2" fill="#0F380F" />
        
        {/* Walking Legs (Right foot forward, Left foot up) */}
        <rect x="5" y="13" width="2" height="2" fill="#306230" />
        <rect x="9" y="14" width="3" height="2" fill="#306230" />
      </svg>
    </div>
  );
};
export default PixelSprite;
