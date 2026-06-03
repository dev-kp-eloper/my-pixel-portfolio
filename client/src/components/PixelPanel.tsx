import React from 'react';

interface PixelPanelProps {
  title?: string;
  variant?: 'light' | 'medium' | 'dark';
  className?: string;
  children: React.ReactNode;
}

export const PixelPanel: React.FC<PixelPanelProps> = ({
  title,
  variant = 'medium',
  className = '',
  children
}) => {
  let boxClass = 'pixel-box';
  if (variant === 'light') boxClass = 'pixel-box-light';
  if (variant === 'dark') boxClass = 'pixel-box-dark';

  return (
    <div className={`${boxClass} ${className} flex flex-col w-full`}>
      {title && (
        <div className="pixel-double-border mb-3 text-center press-start-font text-[10px] tracking-wide text-[#0F380F]">
          {title}
        </div>
      )}
      <div className="flex-1 w-full">{children}</div>
    </div>
  );
};
export default PixelPanel;
