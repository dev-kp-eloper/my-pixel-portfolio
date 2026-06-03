import { useState, useEffect, useRef } from 'react';

export function useTypingEffect(text: string, speed: number = 100, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  // Use a ref to track the current index so the interval closure is always fresh
  const indexRef = useRef(0);

  useEffect(() => {
    // Reset on text change
    indexRef.current = 0;
    setDisplayedText('');
    setIsFinished(false);

    let interval: ReturnType<typeof setInterval>;

    const delayTimer = setTimeout(() => {
      interval = setInterval(() => {
        const i = indexRef.current;
        if (i < text.length) {
          // Slice from start to current index+1 — guaranteed correct, no closure stale bug
          setDisplayedText(text.slice(0, i + 1));
          indexRef.current = i + 1;
        } else {
          clearInterval(interval);
          setIsFinished(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay]);

  return { displayedText, isFinished };
}
