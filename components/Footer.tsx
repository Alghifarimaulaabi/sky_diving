'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FUNDIVE_CONFIG } from '@/data/catalog';

export const Footer: React.FC = () => {
  const [year, setYear] = useState(2026);
  const waUrl = `https://wa.me/${FUNDIVE_CONFIG.wa.replace(/\D/g, '')}`;

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <div className="brand">
            <Image
              src="/assets/logo-bac.webp"
              alt="Logo Bandung Apnea Community"
              width={56}
              height={56}
              loading="lazy"
            />
            <span className="brand__x" aria-hidden="true">
              &times;
            </span>
            <Image
              src="/assets/logo-everydive.webp"
              alt="Logo Every Dive.id"
              width={56}
              height={56}
              loading="lazy"
            />
          </div>
          <p className="muted" style={{ marginTop: '10px' }}>
            Dive into the blue.
          </p>
        </div>

        <nav aria-label="Navigasi footer" className="footer__nav">
          <a href="#belajar">Freedive</a>
          <a href="#gear">Gear</a>
          <a href="#safety">Safety</a>
          <a href="#bac">BAC</a>
          <a href="#event">Event</a>
          <a href="#faq">FAQ</a>
        </nav>

        <nav aria-label="Media sosial" className="footer__nav">
          <a
            href={FUNDIVE_CONFIG.instagram}
            rel="noopener noreferrer"
            target="_blank"
          >
            Instagram
          </a>
          <a
            href={FUNDIVE_CONFIG.tiktok}
            rel="noopener noreferrer"
            target="_blank"
          >
            TikTok
          </a>
          <a
            href={FUNDIVE_CONFIG.youtube}
            rel="noopener noreferrer"
            target="_blank"
          >
            YouTube
          </a>
          <a
            href={waUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
        </nav>
      </div>

      <p className="container muted a2hs">
        <strong>Tips HP:</strong> di iPhone buka lewat Safari, ketuk Bagikan lalu Tambah ke Layar Utama.
        Di Android buka menu Chrome lalu pilih Instal aplikasi atau Tambahkan ke layar utama.
      </p>

      <p className="container disclaimer">
        Disclaimer: freedive adalah aktivitas berisiko. Website ini bersifat edukasi dan bukan
        pengganti pelatihan. Belajarlah langsung dengan instruktur dan jangan pernah freedive sendirian.
      </p>

      <p className="container muted copy">
        &copy; {year} Bandung Apnea Community &times; Every Dive.id
      </p>
    </footer>
  );
};
