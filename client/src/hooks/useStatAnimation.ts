import { useState, useEffect } from 'react';

export function useStatAnimation(targetValue: number, duration: number = 1000, delay: number = 0) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const rate = Math.min(progress / duration, 1);
      
      // Easing out quadratic
      const ease = rate * (2 - rate);
      
      setCurrentValue(Math.floor(ease * targetValue));

      if (rate < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCurrentValue(targetValue);
      }
    };

    const delayTimer = setTimeout(() => {
      animationFrame = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [targetValue, duration, delay]);

  return currentValue;
}
