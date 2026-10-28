'use client';

import React, { useState } from 'react';
import { DISCIPLINES } from '@/data/catalog';
import { Discipline } from '@/types/catalog';

export const DisciplinesSection: React.FC = () => {
  const [activeDisc, setActiveDisc] = useState<Discipline | null>(null);

  const handleOpen = (d: Discipline) => {
    setActiveDisc(d);
  };

  const handleClose = () => {
    setActiveDisc(null);
  };

  return (
    <section className="section section--alt" id="disiplin">
      <div className="container">
        <header className="sec-head reveal in">
          <h2>Disiplin Freedive</h2>
          <p>Klik kartu untuk lihat penjelasannya.</p>
        </header>

        <div className="grid grid--4" id="disciplines">
          {DISCIPLINES.map((d) => (
            <button
              key={d.code}
              className="card disc reveal in"
              type="button"
              onClick={() => handleOpen(d)}
              aria-haspopup="dialog"
            >
              <strong>{d.code}</strong>
              <span>{d.name}</span>
            </button>
          ))}
        </div>
      </div>

      {activeDisc && (
        <div
          className="modal-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(2, 10, 22, 0.75)',
            backdropFilter: 'blur(4px)',
            padding: '16px'
          }}
          onClick={handleClose}
        >
          <div
            className="modal"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '520px',
              animation: 'sheet .2s ease'
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="dmTitle"
          >
            <button
              className="modal__close"
              id="dmClose"
              onClick={handleClose}
              aria-label="Tutup"
              type="button"
            >
              &times;
            </button>
            <h3 id="dmTitle" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>
              {activeDisc.code} - {activeDisc.name}
            </h3>
            <p id="dmBody" style={{ lineHeight: 1.6 }}>
              {activeDisc.desc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
