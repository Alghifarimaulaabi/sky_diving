'use client';

import React, { useState } from 'react';
import { GALLERY_ITEMS } from '@/data/catalog';

export const GallerySection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<(typeof GALLERY_ITEMS)[0] | null>(null);

  return (
    <section className="section" id="galeri">
      <div className="container">
        <header className="sec-head reveal in">
          <h2>Galeri</h2>
          <p>Momen latihan, kebersamaan buddy, dan eksplorasi kedalaman bersama BAC.</p>
        </header>

        <div className="masonry" id="gallery">
          {GALLERY_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`ph ${item.className}`}
              type="button"
              data-cap={item.cap}
              onClick={() => setActivePhoto(item)}
              aria-label={`Lihat foto: ${item.cap}`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {activePhoto && (
        <div
          className="modal-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(2, 10, 22, 0.85)',
            backdropFilter: 'blur(6px)',
            padding: '16px'
          }}
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="modal modal--lb"
            id="lightbox"
            role="dialog"
            aria-label="Pratinjau foto"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'sheet .2s ease', position: 'relative', width: '100%' }}
          >
            <button
              className="modal__close"
              id="lbClose"
              type="button"
              aria-label="Tutup"
              onClick={() => setActivePhoto(null)}
            >
              &times;
            </button>
            <div
              className="ph ph--lb"
              id="lbImg"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px',
                textAlign: 'center'
              }}
            >
              <span style={{ fontSize: '3rem', marginBottom: '12px' }}>🌊</span>
              <strong style={{ fontSize: '1.2rem', color: 'var(--text)' }}>
                {activePhoto.label}
              </strong>
              <span id="lbCap" style={{ marginTop: '8px', color: 'var(--muted)', fontSize: '0.95rem' }}>
                {activePhoto.cap}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
