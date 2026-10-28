'use client';

import React from 'react';
import Image from 'next/image';
import { BubblesCanvas } from './BubblesCanvas';

export const Hero: React.FC = () => {
  return (
    <section className="hero" id="top">
      <BubblesCanvas />
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__label">Bandung Apnea Community &times; Every Dive.id</p>
          <h1>
            Tahan napas.
            <br />
            <span className="hero__accent">Selami biru.</span>
          </h1>
          <p className="lead">
            Dari nol sampai berani turun bareng buddy. Belajar freedive, pilih gear yang pas, dan ketemu
            komunitas yang saling jaga.
          </p>
          <div className="hero__cta">
            <a className="btn btn--hero" href="#belajar">
              <span>Mulai Freedive</span>
              <svg
                viewBox="0 0 20 20"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 10h12M10 4l6 6-6 6" />
              </svg>
            </a>
            <a className="btn btn--ghost" href="#gabung">
              Gabung BAC
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__frame">
            <Image
              src="/assets/hero-freediver.webp"
              alt="Freediver descending into deep blue ocean water with sunlight rays"
              width={800}
              height={1000}
              priority
              className="hero__img"
            />
            <div className="hero__vignette" aria-hidden="true" />
            <div className="hero__badge">
              <div className="hero__badge-text">
                <strong>Sesi Kolam Sesko AD</strong>
                <span>Bandung &bull; 100% Buddy System</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__stats">
          <ul className="stats" aria-label="Sorotan Komunitas">
            <li>
              <strong>100+</strong>
              <span>Anggota komunitas</span>
            </li>
            <li className="stats__divider" aria-hidden="true" />
            <li>
              <strong>2x /Seminggu</strong>
              <span>Pool Session Sesko AD</span>
            </li>
            <li className="stats__divider" aria-hidden="true" />
            <li>
              <strong>100%</strong>
              <span>Buddy system</span>
            </li>
          </ul>
        </div>
      </div>
      <svg className="wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,64 C240,120 480,0 720,48 C960,96 1200,16 1440,64 L1440,120 L0,120 Z" />
      </svg>
    </section>
  );
};
