'use client';

import React, { useEffect, useState, useRef } from 'react';
import { FUNDIVE_CONFIG } from '@/data/catalog';
import { useKit } from '@/context/KitContext';

export const WhatsAppFloat: React.FC = () => {
  const { isWaConfigured } = useKit();
  const [hide, setHide] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const lastY = lastYRef.current;

      if (y > lastY + 6 && y > 200) {
        setHide(true);
      } else if (y < lastY - 6 || y <= 200) {
        setHide(false);
      }
      lastYRef.current = y;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waUrl = isWaConfigured
    ? `https://wa.me/${FUNDIVE_CONFIG.wa.replace(/\D/g, '')}`
    : '#';

  return (
    <a
      className={`wa-float ${hide ? 'hide' : ''}`}
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      onClick={(e) => {
        if (!isWaConfigured) e.preventDefault();
      }}
    >
      WA
    </a>
  );
};
