"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
};

function formatCounter(value: number, target: number) {
  if (target >= 1_000_000) {
    if (value < 1) return "0";
    if (value < 1_000) return Math.round(value).toString();
    if (value < 1_000_000) return `${Math.round(value / 1_000)}K`;
    return `${(value / 1_000_000).toFixed(value >= target ? 0 : 1).replace(".", ",")}M`;
  }
  if (target >= 1_000) return value < 1_000 ? Math.round(value).toString() : `${Math.round(value / 1_000)}K`;
  return Math.round(value).toLocaleString("it-IT");
}

export function AnimatedCounter({ value, suffix = "" }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const counter = counterRef.current;
    if (!counter) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const startedAt = performance.now();
        const duration = 1500;

        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setDisplayValue(value * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.45 },
    );

    observer.observe(counter);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={counterRef}>{formatCounter(displayValue, value)}{suffix}</span>;
}
