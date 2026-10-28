'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
      if (saved) {
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);
        updateMetaTheme(saved);
      } else {
        const current = document.documentElement.getAttribute('data-theme') as 'dark' | 'light';
        if (current) setTheme(current);
      }
    } catch {
      // Ignore
    }
  }, []);

  const updateMetaTheme = (t: 'dark' | 'light') => {
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) {
      m.setAttribute('content', t === 'light' ? '#F4FBFF' : '#04152B');
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    updateMetaTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Ignore
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 960) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="nav" id="nav">
      <div className="container nav__inner">
        <a className="brand" href="#top" aria-label="BAC x Every Dive.id, ke atas" onClick={handleLinkClick}>
          <span className="brand__logos">
            <Image
              src="/assets/logo-bac.webp"
              alt="Logo Bandung Apnea Community"
              width={40}
              height={40}
              priority
            />
            <span className="brand__x" aria-hidden="true">
              &times;
            </span>
            <Image
              src="/assets/logo-everydive.webp"
              alt="Logo Every Dive.id"
              width={40}
              height={40}
              priority
            />
          </span>
        </a>

        <nav className={`menu ${isOpen ? 'open' : ''}`} id="menu" aria-label="Menu utama">
          <a href="#belajar" onClick={handleLinkClick}>
            Belajar
          </a>
          <a href="#gear" onClick={handleLinkClick}>
            Gear
          </a>
          <a href="#safety" onClick={handleLinkClick}>
            Safety
          </a>
          <a href="#bac" onClick={handleLinkClick}>
            BAC
          </a>
          <a href="#event" onClick={handleLinkClick}>
            Event
          </a>
          <a href="#faq" onClick={handleLinkClick}>
            FAQ
          </a>
          <a className="btn btn--nav" href="#gabung" onClick={handleLinkClick}>
            Gabung BAC
          </a>
        </nav>

        <div className="nav__tools">
          <button
            className="icon-btn"
            id="themeBtn"
            onClick={toggleTheme}
            aria-label="Ganti tema terang/gelap"
            title="Ganti tema"
            type="button"
          >
            {theme === 'dark' ? (
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <button
            className="icon-btn burger"
            id="burger"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isOpen}
            aria-controls="menu"
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};
