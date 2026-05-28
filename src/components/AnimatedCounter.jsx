"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function AnimatedCounter({ target, suffix = '', duration = 2000, className = 'metric-value' }) {
  const [count, setCount] = useState('0' + suffix);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(target, suffix, duration);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [target, suffix, duration]);

  const animateCounter = (targetVal, suffixVal, durationVal) => {
    const start = performance.now();
    const startVal = 0;
    const endVal = parseFloat(targetVal);

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationVal, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      const current = startVal + (endVal - startVal) * eased;
      
      const formatted = (Number.isInteger(endVal) ? Math.round(current) : current.toFixed(1)) + suffixVal;
      setCount(formatted);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  return (
    <div className={className} ref={elementRef}>
      {count}
    </div>
  );
}
