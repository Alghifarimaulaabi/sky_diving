'use client';

import React, { useEffect, useState } from 'react';

export const DepthIndicator: React.FC = () => {
  const [depth, setDepth] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setPercent(p);
      setDepth(Math.round(p * 30));

      const nav = document.getElementById('nav');
      if (nav) {
        nav.style.setProperty('--p', p.toFixed(4));
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <aside className="depth" aria-hidden="true">
      <div className="depth__track">
        <div className="depth__fill" id="depthFill" style={{ height: `${percent * 100}%` }} />
      </div>
      <div className="depth__label">
        <span id="depthNum">{depth}</span> m
      </div>
    </aside>
  );
};
