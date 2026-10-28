'use client';

import { useEffect } from 'react';

/**
 * Mengamati elemen `.reveal` dan menambahkan kelas `in` saat masuk viewport.
 * Dipanggil sekali di level page agar tidak membuat observer baru per komponen.
 */
export function useScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        el.classList.add('in');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        el.classList.add('in');
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    // Observe elemen yang belum punya class 'in'
    document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach((el) => {
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);
}
