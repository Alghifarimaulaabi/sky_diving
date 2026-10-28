import React from 'react';

export const AboutBacSection: React.FC = () => {
  return (
    <section className="section" id="bac">
      <div className="container bac">
        <div className="reveal in">
          <h2>Bandung Apnea Community (BAC)</h2>
          <p>
            Komunitas freedive inklusif berbasis di Bandung untuk semua level—dari kamu yang belum
            pernah menyelam sama sekali hingga penyelam berpengalaman. Kami berfokus pada
            pembelajaran bertahap, persahabatan, dan penerapan sistem buddy yang disiplin dan aman.
          </p>

          <h3>Visi</h3>
          <p>
            Membangun ekosistem freediving yang aman, edukatif, dan ramah bagi anak muda serta warga
            Bandung &amp; Jawa Barat untuk mencintai dunia bawah air tanpa rasa takut.
          </p>

          <h3>Kegiatan rutin</h3>
          <ul className="list">
            <li>Sesi latihan kolam rutin 2x seminggu di Kolam Renang Sesko AD Bandung</li>
            <li>Sesi teori, latihan pernapasan diafragma, dan teknik Frenzel equalization di darat</li>
            <li>Fun dive dan open water trip berkala ke laut bersama buddy &amp; safety certified</li>
          </ul>

          <a className="btn" href="#gabung">
            Gabung BAC
          </a>
        </div>

        <div className="bac__media reveal in">
          <div
            className="ph ph--tall"
            role="img"
            aria-label="Foto kegiatan Bandung Apnea Community"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px',
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🌊</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--text)' }}>
              Bandung Apnea Community
            </strong>
            <span style={{ marginTop: '4px', color: 'var(--teal)' }}>
              Sesko AD Bandung &bull; Est. Community
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
