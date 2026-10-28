'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useKit } from '@/context/KitContext';
import { ProductIcon } from './ProductIcon';

export const ProductSheet: React.FC = () => {
  const {
    activeProductId,
    closeProduct,
    productsById,
    addLine,
    formatRupiah,
    isWaConfigured,
    getSingleProductWhatsAppUrl
  } = useKit();

  const product = activeProductId ? productsById[activeProductId] : null;

  const [qty, setQty] = useState(1);
  const [variants, setVariants] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setQty(1);
      const initialVariants: Record<string, string> = {};
      product.options.forEach((opt) => {
        initialVariants[opt.key] = '';
      });
      setVariants(initialVariants);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    const cleanV: Record<string, string> = {};
    Object.keys(variants).forEach((k) => {
      if (variants[k]) cleanV[k] = variants[k];
    });
    addLine(product.id, cleanV, qty);
    closeProduct();
  };

  const askUrl = getSingleProductWhatsAppUrl(product, variants, qty);

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
      onClick={closeProduct}
    >
      <div
        className="modal sheet"
        id="itemSheet"
        role="dialog"
        aria-labelledby="isTitle"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'sheet .25s ease' }}
      >
        <button
          className="modal__close"
          id="isClose"
          type="button"
          aria-label="Tutup"
          onClick={closeProduct}
        >
          &times;
        </button>
        <div className="sheet__in">
          <div className="sheet__head">
            <div className="sheet__pic" id="isPic">
              {product.photo ? (
                <Image src={product.photo} alt={product.name} width={72} height={72} />
              ) : (
                <ProductIcon name={product.icon} size={44} />
              )}
            </div>
            <div>
              <h3 id="isTitle">{product.name}</h3>
              <div className="gtags" id="isTags">
                <span className="gtag">{product.cat}</span>
                <span
                  className={`gtag gtag--${product.level === 'Lanjut' ? 'lanjut' : 'pemula'}`}
                >
                  {product.level}
                </span>
              </div>
            </div>
          </div>

          <p id="isFn" style={{ marginTop: '8px' }}>
            {product.fn}
          </p>

          <h4>Tips memilih</h4>
          <p id="isTip">{product.tip}</p>

          {product.options.length > 0 && (
            <div className="opts" id="isOpts">
              {product.options.map((opt) => (
                <label key={opt.key}>
                  {opt.label}
                  <select
                    value={variants[opt.key] || ''}
                    onChange={(e) =>
                      setVariants((prev) => ({ ...prev, [opt.key]: e.target.value }))
                    }
                  >
                    <option value="">Belum dipilih</option>
                    {opt.choices.map((choice) => (
                      <option key={choice} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          )}

          {product.options.length > 0 && (
            <p className="hint muted" id="isHint">
              Belum yakin dengan pilihannya? Biarkan kosong, admin akan membantu memilihkan lewat WhatsApp.
            </p>
          )}

          <div className="buy">
            <div className="qty">
              <button
                id="isMinus"
                type="button"
                aria-label="Kurangi jumlah"
                disabled={qty <= 1}
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              >
                &minus;
              </button>
              <output id="isQty">{qty}</output>
              <button
                id="isPlus"
                type="button"
                aria-label="Tambah jumlah"
                disabled={qty >= 99}
                onClick={() => setQty((prev) => Math.min(99, prev + 1))}
              >
                +
              </button>
            </div>
            <p id="isPrice">
              {product.price
                ? formatRupiah(product.price * qty)
                : 'Harga dikonfirmasi admin lewat WhatsApp'}
            </p>
          </div>

          {!isWaConfigured && (
            <p className="warn-box" id="isWarn">
              Nomor WhatsApp admin belum diatur. Isi <strong>wa</strong> di data/catalog.ts.
            </p>
          )}

          <div className="stack-btns">
            <button className="btn" id="isAdd" type="button" onClick={handleAdd}>
              Tambah ke kit
            </button>
            <a
              className="btn btn--wa-line"
              id="isAsk"
              href={askUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!isWaConfigured) e.preventDefault();
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 12a8 8 0 0 1-11.8 7L4 20.5l1.5-4.8A8 8 0 1 1 21 12z" />
              </svg>
              Tanya produk ini di WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
