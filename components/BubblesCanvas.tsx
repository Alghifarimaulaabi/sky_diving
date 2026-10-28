'use client';

import React, { useEffect, useRef } from 'react';

interface Bubble {
  x: number;
  y: number;
  r: number;
  s: number;
  d: number;
}

export const BubblesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let W = (cv.width = cv.offsetWidth);
    let H = (cv.height = cv.offsetHeight);
    let lastW = window.innerWidth;
    let visible = true;
    let animId: number;

    const handleResize = () => {
      if (window.innerWidth !== lastW && cv) {
        W = cv.width = cv.offsetWidth;
        H = cv.height = cv.offsetHeight;
        lastW = window.innerWidth;
      }
    };

    window.addEventListener('resize', handleResize);

    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]) visible = entries[0].isIntersecting;
        },
        { threshold: 0 }
      );
      observer.observe(cv);
    }

    const COUNT = window.innerWidth < 760 ? 6 : 12;
    const bubbles: Bubble[] = [];
    for (let i = 0; i < COUNT; i++) {
      bubbles.push({
        x: Math.random(),
        y: Math.random(),
        r: 1.5 + Math.random() * 3,
        s: 0.00015 + Math.random() * 0.00025,
        d: Math.random() * 6
      });
    }

    const loop = (t: number) => {
      if (!visible || document.hidden) {
        animId = requestAnimationFrame(loop);
        return;
      }
      ctx.clearRect(0, 0, W, H);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const stroke = isLight ? 'rgba(0,127,138,.12)' : 'rgba(0,194,209,.15)';
      const fill = isLight ? 'rgba(0,127,138,.03)' : 'rgba(0,194,209,.04)';

      bubbles.forEach((b) => {
        b.y -= b.s * 2;
        if (b.y < -0.05) {
          b.y = 1.05;
          b.x = Math.random();
        }
        const x = b.x * W + Math.sin(t / 2400 + b.d) * 3;
        const y = b.y * H;

        ctx.beginPath();
        ctx.arc(x, y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = fill;
        ctx.fill();
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} id="bubbles" aria-hidden="true" />;
};
