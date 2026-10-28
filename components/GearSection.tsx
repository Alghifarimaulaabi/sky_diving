'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { PRODUCTS, PACKS, FUNDIVE_CONFIG } from '@/data/catalog';
import { Product } from '@/types/catalog';
import { useKit } from '@/context/KitContext';
import { ProductIcon } from './ProductIcon';
import { WetsuitCalculator } from './WetsuitCalculator';

export const GearSection: React.FC = () => {
  const { addPack, addLine, openProduct, qtyOf, formatRupiah, isWaConfigured } = useKit();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('Semua');
  const [selectedLvl, setSelectedLvl] = useState<'Semua' | 'Pemula' | 'Lanjut'>('Semua');

  const categories = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => set.add(p.cat));
    return ['Semua', ...Array.from(set)];
  }, []);

  const filterMatches = (p: Product, baseOnly = false) => {
    if (selectedLvl !== 'Semua' && p.level !== selectedLvl) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const hay = `${p.name} ${p.cat} ${p.short} ${p.fn}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (baseOnly) return true;
    return selectedCat === 'Semua' || p.cat === selectedCat;
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => filterMatches(p));
  }, [searchQuery, selectedCat, selectedLvl]);

  const countForCategory = (cat: string) => {
    return PRODUCTS.filter((p) => (cat === 'Semua' || p.cat === cat) && filterMatches(p, true)).length;
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCat('Semua');
    setSelectedLvl('Semua');
  };

  const handleAddClick = (p: Product) => {
    if (p.options.length > 0) {
      openProduct(p.id);
    } else {
      addLine(p.id, {}, 1);
    }
  };

  const waLink = isWaConfigured ? `https://wa.me/${FUNDIVE_CONFIG.wa.replace(/\D/g, '')}` : '#';

  return (
    <section className="section section--alt" id="gear">
      <div className="container">
        <header className="sec-head reveal in">
          <h2>Katalog Gear</h2>
          <p>
            Pilih perlengkapan, kumpulkan jadi satu daftar, lalu kirim ke admin lewat WhatsApp.
            Harga dan stok dikonfirmasi langsung oleh admin.
          </p>
        </header>

        {/* Packs */}
        <div className="packs" id="packs" aria-label="Paket siap pilih">
          {PACKS.map((pk) => (
            <div key={pk.id} className="pack">
              <div>
                <h3>{pk.name}</h3>
                <p>{pk.desc}</p>
              </div>
              <button
                className="btn btn--ghost btn--sm"
                type="button"
                aria-label={`Tambah ${pk.name} ke kit`}
                onClick={() => addPack(pk.id)}
              >
                Tambah paket
              </button>
            </div>
          ))}
        </div>

        {/* Catalog layout */}
        <div className="cat" id="catalog">
          <div className="cat__side">
            <div className="cat__search">
              <label className="sr-only" htmlFor="catQ">
                Cari gear
              </label>
              <input
                id="catQ"
                type="search"
                placeholder="Cari gear, misalnya fins"
                autoComplete="off"
                enterKeyHint="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="cat__cats" id="catCats" role="group" aria-label="Kategori">
              {categories.map((c) => {
                const firstProduct = PRODUCTS.find((p) => p.cat === c);
                const count = countForCategory(c);
                return (
                  <button
                    key={c}
                    className="cchip"
                    type="button"
                    data-cat={c}
                    aria-pressed={selectedCat === c}
                    onClick={() => setSelectedCat(c)}
                  >
                    {firstProduct && (
                      <span className="cchip__ic">
                        <ProductIcon name={firstProduct.icon} size={22} />
                      </span>
                    )}
                    <span className="cchip__t">{c}</span>
                    <small>{count}</small>
                  </button>
                );
              })}
            </div>

            <div className="seg" id="catLvl" role="group" aria-label="Level">
              {(['Semua', 'Pemula', 'Lanjut'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  data-lvl={lvl}
                  aria-pressed={selectedLvl === lvl}
                  onClick={() => setSelectedLvl(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="cat__main">
            <p className="muted" id="catCount" aria-live="polite">
              {filteredProducts.length === PRODUCTS.length
                ? `${PRODUCTS.length} gear`
                : `${filteredProducts.length} dari ${PRODUCTS.length} gear`}
            </p>

            {filteredProducts.length > 0 ? (
              <div className="cat__list" id="catList">
                {filteredProducts.map((p) => {
                  const q = qtyOf(p.id);
                  const inKit = q > 0;
                  return (
                    <article
                      key={p.id}
                      className={`grow ${inKit ? 'in-kit' : ''}`}
                      data-id={p.id}
                    >
                      <button
                        className="grow__main"
                        type="button"
                        aria-haspopup="dialog"
                        onClick={() => openProduct(p.id)}
                      >
                        <span className="grow__pic">
                          {p.photo ? (
                            <Image
                              src={p.photo}
                              alt=""
                              width={76}
                              height={76}
                              loading="lazy"
                            />
                          ) : (
                            <ProductIcon name={p.icon} size={46} />
                          )}
                        </span>
                        <span className="grow__txt">
                          <strong>{p.name}</strong>
                          <span className="fn">{p.short}</span>
                          <span className="grow__meta">
                            <span
                              className={`lvl lvl--${
                                p.level === 'Lanjut' ? 'lanjut' : 'pemula'
                              }`}
                            >
                              {p.level}
                            </span>
                            <span
                              className={`gprice ${!p.price ? 'gprice--ask' : ''}`}
                            >
                              {p.price ? formatRupiah(p.price) : 'Tanya harga'}
                            </span>
                          </span>
                        </span>
                      </button>

                      <button
                        className="grow__add"
                        type="button"
                        onClick={() => handleAddClick(p)}
                        aria-label={
                          inKit
                            ? `${p.name} di kit: ${q}. ${
                                p.options.length ? 'Buka pilihan' : 'Tambah satu lagi'
                              }`
                            : p.options.length
                            ? `Pilih varian ${p.name}`
                            : `Tambah ${p.name} ke kit`
                        }
                      >
                        {inKit ? q : '+'}
                      </button>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="cat__empty" id="catEmpty">
                <h3>Gear tidak ditemukan</h3>
                <p>Coba kata kunci lain, atau hapus filter kategori dan level.</p>
                <div className="hero__cta">
                  <button className="btn btn--sm" id="catReset" type="button" onClick={resetFilters}>
                    Hapus filter
                  </button>
                  <a
                    className="btn btn--ghost btn--sm"
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tanya admin di WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Wetsuit & Weight Calculator */}
        <WetsuitCalculator />
      </div>
    </section>
  );
};
