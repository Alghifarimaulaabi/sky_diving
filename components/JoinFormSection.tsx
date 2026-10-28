'use client';

import React, { useState } from 'react';
import { useKit } from '@/context/KitContext';

export const JoinFormSection: React.FC = () => {
  const { waNumber, isWaConfigured } = useKit();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [exp, setExp] = useState('');
  const [wa, setWa] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const a = age.trim();
    const x = exp.trim();
    const w = wa.trim();

    if (!n || !a || !x || !/^[0-9+\s-]{9,16}$/.test(w)) {
      setMsg('Lengkapi semua kolom dengan benar ya.');
      return;
    }

    if (!isWaConfigured) {
      setMsg('Nomor WhatsApp admin belum diatur di data/catalog.ts.');
      return;
    }

    const text = `Halo BAC! Saya mau gabung.\nNama: ${n}\nUsia: ${a}\nPengalaman: ${x}\nWA: ${w}`;
    setMsg('Membuka WhatsApp...');
    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section className="section cta" id="gabung">
      <div className="container container--narrow">
        <header className="sec-head reveal in">
          <h2>Siap nyebur bareng?</h2>
          <p>Isi form, kami lanjut lewat WhatsApp.</p>
        </header>

        <form className="form card reveal in" id="joinForm" onSubmit={handleSubmit} noValidate>
          <label>
            Nama
            <input
              type="text"
              id="fName"
              required
              autoComplete="name"
              autoCapitalize="words"
              enterKeyHint="next"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Usia
            <input
              type="number"
              id="fAge"
              inputMode="numeric"
              min="10"
              max="80"
              required
              enterKeyHint="next"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>

          <label>
            Pengalaman
            <select
              id="fExp"
              required
              value={exp}
              onChange={(e) => setExp(e.target.value)}
            >
              <option value="">Pilih</option>
              <option>Belum pernah</option>
              <option>Pernah snorkeling</option>
              <option>Pernah ikut kelas freedive</option>
              <option>Sudah rutin freedive</option>
            </select>
          </label>

          <label>
            Nomor WhatsApp
            <input
              type="tel"
              id="fWa"
              inputMode="tel"
              placeholder="08xxxxxxxxxx"
              required
              autoComplete="tel"
              enterKeyHint="send"
              value={wa}
              onChange={(e) => setWa(e.target.value)}
            />
          </label>

          <button className="btn" type="submit">
            Kirim lewat WhatsApp
          </button>

          {msg && (
            <p className="note" id="formMsg" aria-live="polite" style={{ marginTop: '8px' }}>
              {msg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};
