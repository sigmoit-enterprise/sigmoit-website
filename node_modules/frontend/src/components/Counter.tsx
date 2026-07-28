import React, { useEffect, useState, useRef } from 'react';

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

export const Counter: React.FC<CounterProps> = ({ target, duration = 1500, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = target;
    if (start === end) return;

    // Calculate increment step based on total duration
    const totalMiliseconds = duration;
    const frameRate = 1000 / 60; // 60 frames per second
    const totalFrames = Math.round(totalMiliseconds / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      // Easing function: outQuad
      const progress = frame / totalFrames;
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.round(end * easeProgress);

      setCount(currentCount);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counter);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [hasStarted, target, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};
export default Counter;
