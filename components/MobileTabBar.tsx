'use client';

import React, { useEffect, useState } from 'react';

const TABS = [
  {
    id: 'top',
    label: 'Beranda',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
      </svg>
    )
  },
  {
    id: 'belajar',
    label: 'Belajar',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zM12 6v14" />
      </svg>
    )
  },
  {
    id: 'gear',
    label: 'Gear',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 9a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v3a4 4 0 0 1-4 4h-1.5l-1.5-2h-2L9.5 16H8a4 4 0 0 1-4-4z" />
      </svg>
    )
  },
  {
    id: 'event',
    label: 'Event',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
      </svg>
    )
  },
  {
    id: 'gabung',
    label: 'Gabung',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0M18 8v6M15 11h6" />
      </svg>
    )
  }
];

export const MobileTabBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('top');

  useEffect(() => {
    const handleScroll = () => {
      const tabIds = ['top', 'belajar', 'gear', 'event', 'gabung'];
      let cur = tabIds[0];
      const y = window.innerHeight * 0.4;

      tabIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= y) {
          cur = id;
        }
      });

      setActiveTab(cur);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="tabbar" aria-label="Navigasi cepat">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            className={isActive ? 'active' : ''}
            aria-current={isActive ? 'true' : undefined}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </a>
        );
      })}
    </nav>
  );
};
