'use client';

import React, { useState } from 'react';
import { useKit } from '@/context/KitContext';
import { ProductIcon } from './ProductIcon';

export const KitSheet: React.FC = () => {
  const {
    isKitOpen,
    closeKit,
    kit,
    who,
    updateWho,
    removeLine,
    updateLineQty,
    clearKit,
    totalQty,
    productsById,
    isWaConfigured,
    getKitWhatsAppMessage,
    getKitWhatsAppUrl
  } = useKit();

  const [copyText, setCopyText] = useState('Salin pesan');
  const [isSureClear, setIsSureClear] = useState(false);

  if (!isKitOpen) return null;

  const handleCopy = () => {
    const msg = getKitWhatsAppMessage();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(msg).then(() => {
        setCopyText('Tersalin');
        setTimeout(() => setCopyText('Salin pesan'), 1800);
      });
    } else {
      const ta = document.createElement('textarea');
      ta.value = msg;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopyText('Tersalin');
        setTimeout(() => setCopyText('Salin pesan'), 1800);
      } catch {
        // Ignore
      }
      document.body.removeChild(ta);
    }
  };

  const handleClearClick = () => {
    if (isSureClear) {
      clearKit();
      setIsSureClear(false);
    } else {
      setIsSureClear(true);
      setTimeout(() => setIsSureClear(false), 3000);
    }
  };

  const variantText = (pId: string, v: Record<string, string>) => {
    const p = productsById[pId];
    if (!p || !p.options.length) return '';
    return p.options.map((o) => `${o.label}: ${v[o.key] || 'belum dipilih'}`).join('; ');
  };

  const previewMessage = getKitWhatsAppMessage();
  const waUrl = getKitWhatsAppUrl();

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(2, 10, 22, 0.75)',
        backdropFilter: 'blur(4px)',
        padding: '16px'
      }}
      onClick={closeKit}
    >
      <div
        className="modal sheet"
        id="kitSheet"
        role="dialog"
        aria-labelledby="ksTitle"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'sheet .25s ease' }}
      >
        <button
          className="modal__close"
          id="ksClose"
          type="button"
          aria-label="Tutup"
          onClick={closeKit}
        >
          &times;
        </button>
        <div className="sheet__in">
          <h3 id="ksTitle">
            {kit.length > 0 ? `Kit saya (${totalQty} item)` : 'Kit saya'}
          </h3>

          {kit.length === 0 ? (
            <div id="kitEmpty">
              <p style={{ marginTop: '14px' }}>
                Kit masih kosong. Pilih gear dari katalog atau mulai dari paket.
              </p>
              <p style={{ marginTop: '14px' }}>
                <button
                  className="btn btn--sm"
                  id="ksBrowse"
                  type="button"
                  onClick={closeKit}
                >
                  Lihat katalog
                </button>
              </p>
            </div>
          ) : (
            <div id="kitFull">
              <ul className="klines" id="kitLines">
                {kit.map((l, idx) => {
                  const p = productsById[l.id];
                  if (!p) return null;
                  const vt = variantText(l.id, l.v);
                  return (
                    <li key={`${l.id}-${idx}`} className="kline">
                      <span className="kline__pic">
                        <ProductIcon name={p.icon} size={30} />
                      </span>
                      <div className="kline__body">
                        <div className="kline__txt">
                          <strong>{p.name}</strong>
                          {vt && <span>{vt}</span>}
                        </div>
                        <div className="kline__ctl">
                          <div className="qty">
                            <button
                              type="button"
                              aria-label={`Kurangi jumlah ${p.name}`}
                              disabled={l.qty <= 1}
                              onClick={() => updateLineQty(idx, l.qty - 1)}
                            >
                              −
                            </button>
                            <output aria-live="polite">{l.qty}</output>
                            <button
                              type="button"
                              aria-label={`Tambah jumlah ${p.name}`}
                              disabled={l.qty >= 99}
                              onClick={() => updateLineQty(idx, l.qty + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="kline__rm"
                            type="button"
                            aria-label={`Hapus ${p.name} dari kit`}
                            onClick={() => removeLine(idx)}
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="kform">
                <div className="kform__2">
                  <label>
                    Nama
                    <input
                      id="kName"
                      type="text"
                      autoComplete="name"
                      autoCapitalize="words"
                      enterKeyHint="next"
                      value={who.name}
                      onChange={(e) => updateWho('name', e.target.value)}
                    />
                  </label>
                  <label>
                    Domisili
                    <input
                      id="kCity"
                      type="text"
                      autoComplete="address-level2"
                      autoCapitalize="words"
                      enterKeyHint="next"
                      placeholder="Kota atau kecamatan"
                      value={who.city}
                      onChange={(e) => updateWho('city', e.target.value)}
                    />
                  </label>
                </div>
                <label>
                  Catatan
                  <textarea
                    id="kNote"
                    rows={3}
                    placeholder="Misalnya tinggi dan berat badan, atau pengalaman freedive"
                    value={who.note}
                    onChange={(e) => updateWho('note', e.target.value)}
                  />
                </label>
              </div>

              <h4>Pesan yang akan dikirim</h4>
              <div className="bubble">
                <pre id="kitPreview">{previewMessage}</pre>
              </div>

              {!isWaConfigured && (
                <p className="warn-box" id="kitWarn">
                  Nomor WhatsApp admin belum diatur. Isi <strong>wa</strong> di data/catalog.ts.
                </p>
              )}

              <a
                className="btn btn--wa"
                id="kitSend"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!isWaConfigured) e.preventDefault();
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12a8 8 0 0 1-11.8 7L4 20.5l1.5-4.8A8 8 0 1 1 21 12z" />
                </svg>
                Kirim ke WhatsApp
              </a>

              <div className="krow">
                <button
                  className="btn btn--ghost btn--sm"
                  id="kitCopy"
                  type="button"
                  onClick={handleCopy}
                >
                  {copyText}
                </button>
                <button
                  className="btn btn--ghost btn--sm"
                  id="kitClear"
                  type="button"
                  onClick={handleClearClick}
                >
                  {isSureClear ? 'Ketuk lagi untuk kosongkan' : 'Kosongkan kit'}
                </button>
              </div>

              <p className="note">
                Kamu akan diarahkan ke WhatsApp. Pesan baru terkirim setelah kamu menekan kirim di
                sana. Kit tetap tersimpan di HP ini kalau ingin diubah.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
