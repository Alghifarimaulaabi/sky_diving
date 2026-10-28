'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { KitLine, WhoInfo, Product } from '@/types/catalog';
import { PRODUCTS, PACKS, FUNDIVE_CONFIG } from '@/data/catalog';

interface KitContextType {
  kit: KitLine[];
  who: WhoInfo;
  isKitOpen: boolean;
  activeProductId: string | null;
  toastMessage: string | null;
  totalQty: number;
  productsById: Record<string, Product>;
  waNumber: string;
  isWaConfigured: boolean;
  addLine: (id: string, v: Record<string, string>, qty: number, quiet?: boolean) => void;
  removeLine: (index: number) => void;
  updateLineQty: (index: number, qty: number) => void;
  clearKit: () => void;
  addPack: (packId: string) => void;
  openProduct: (id: string) => void;
  closeProduct: () => void;
  openKit: () => void;
  closeKit: () => void;
  showToast: (msg: string) => void;
  updateWho: (key: keyof WhoInfo, val: string) => void;
  qtyOf: (id: string) => number;
  estimateTotal: () => number;
  formatRupiah: (val: number) => string;
  getKitWhatsAppMessage: () => string;
  getSingleProductWhatsAppUrl: (product: Product, v: Record<string, string>, qty: number) => string;
  getKitWhatsAppUrl: () => string;
}

const KitContext = createContext<KitContextType | null>(null);

const STORAGE_KEY = 'fundive-kit-v1';
const WHO_KEY = 'fundive-kit-who-v1';

export const KitProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [kit, setKit] = useState<KitLine[]>([]);
  const [who, setWho] = useState<WhoInfo>({ name: '', city: '', note: '' });
  const [isKitOpen, setIsKitOpen] = useState(false);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const productsById = React.useMemo(() => {
    const map: Record<string, Product> = {};
    PRODUCTS.forEach((p) => {
      map[p.id] = p;
    });
    return map;
  }, []);

  const waClean = FUNDIVE_CONFIG.wa.replace(/\D/g, '');
  const waNumber = waClean.charAt(0) === '0' ? '62' + waClean.slice(1) : waClean;
  const isWaConfigured = /^62\d{8,13}$/.test(waNumber);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const rawKit = localStorage.getItem(STORAGE_KEY);
      if (rawKit) {
        const parsed = JSON.parse(rawKit) as KitLine[];
        const valid = parsed
          .filter((l) => l && productsById[l.id])
          .map((l) => {
            const p = productsById[l.id];
            const cleanV: Record<string, string> = {};
            p.options.forEach((opt) => {
              const val = l.v && l.v[opt.key];
              if (val && opt.choices.includes(val)) {
                cleanV[opt.key] = val;
              }
            });
            return {
              id: l.id,
              v: cleanV,
              qty: Math.min(99, Math.max(1, parseInt(String(l.qty), 10) || 1))
            };
          });
        setKit(valid);
      }

      const rawWho = localStorage.getItem(WHO_KEY);
      if (rawWho) {
        setWho(JSON.parse(rawWho));
      }
    } catch {
      // Ignore storage read errors
    }
  }, [productsById]);

  // Sync kit to localStorage & body class
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(kit));
    } catch {
      // Ignore
    }
    const total = kit.reduce((sum, item) => sum + item.qty, 0);
    if (total > 0) {
      document.body.classList.add('has-kit');
    } else {
      document.body.classList.remove('has-kit');
    }
  }, [kit]);

  // Sync who info to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WHO_KEY, JSON.stringify(who));
    } catch {
      // Ignore
    }
  }, [who]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const sig = (id: string, v: Record<string, string>) => {
    const p = productsById[id];
    if (!p) return id;
    return id + '|' + p.options.map((o) => v[o.key] || '').join('|');
  };

  const addLine = (id: string, v: Record<string, string>, qty: number, quiet = false) => {
    const targetSig = sig(id, v);
    setKit((prev) => {
      const idx = prev.findIndex((l) => sig(l.id, l.v) === targetSig);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: Math.min(99, next[idx].qty + qty) };
        return next;
      }
      return [...prev, { id, v, qty }];
    });

    if (!quiet) {
      const p = productsById[id];
      if (p) {
        showToast(`${p.name} masuk kit`);
      }
    }
  };

  const removeLine = (index: number) => {
    setKit((prev) => prev.filter((_, i) => i !== index));
  };

  const updateLineQty = (index: number, qty: number) => {
    setKit((prev) => {
      if (!prev[index]) return prev;
      const next = [...prev];
      next[index] = { ...next[index], qty: Math.min(99, Math.max(1, qty)) };
      return next;
    });
  };

  const clearKit = () => {
    setKit([]);
  };

  const addPack = (packId: string) => {
    const pack = PACKS.find((pk) => pk.id === packId);
    if (!pack) return;

    let addedCount = 0;
    pack.items.forEach((id) => {
      if (productsById[id]) {
        const exists = kit.some((l) => l.id === id);
        if (!exists) {
          addLine(id, {}, 1, true);
          addedCount++;
        }
      }
    });

    if (addedCount > 0) {
      showToast(`${pack.name}: ${addedCount} item masuk kit`);
    } else {
      showToast(`${pack.name} sudah ada di kit`);
    }
  };

  const openProduct = (id: string) => {
    setActiveProductId(id);
  };

  const closeProduct = () => {
    setActiveProductId(null);
  };

  const openKit = () => {
    setIsKitOpen(true);
  };

  const closeKit = () => {
    setIsKitOpen(false);
  };

  const updateWho = (key: keyof WhoInfo, val: string) => {
    setWho((prev) => ({ ...prev, [key]: val }));
  };

  const totalQty = kit.reduce((sum, l) => sum + l.qty, 0);

  const qtyOf = (id: string) => {
    return kit.reduce((sum, l) => (l.id === id ? sum + l.qty : sum), 0);
  };

  const formatRupiah = (val: number) => {
    return 'Rp ' + Math.round(val).toLocaleString('id-ID');
  };

  const estimateTotal = () => {
    let sum = 0;
    for (const line of kit) {
      const p = productsById[line.id];
      if (!p || !p.price) return 0;
      sum += p.price * line.qty;
    }
    return sum;
  };

  const variantText = (p: Product, v: Record<string, string>) => {
    if (!p.options.length) return '';
    return p.options.map((o) => `${o.label}: ${v[o.key] || 'belum dipilih'}`).join('; ');
  };

  const lineText = (p: Product, v: Record<string, string>, qty: number) => {
    const vt = variantText(p, v);
    return `${p.name}${vt ? ` (${vt})` : ''} x${qty}`;
  };

  const getKitWhatsAppMessage = () => {
    const lines = kit.map((l, i) => {
      const p = productsById[l.id];
      return `${i + 1}. ${p ? lineText(p, l.v, l.qty) : l.id}`;
    });
    const out = [
      `Halo ${FUNDIVE_CONFIG.shop}, saya mau tanya dan pesan gear dari katalog website:`,
      '',
      lines.join('\n')
    ];
    const est = estimateTotal();
    if (est > 0) {
      out.push('', `Perkiraan total: ${formatRupiah(est)} (belum termasuk ongkir)`);
    }
    const info: string[] = [];
    if (who.name.trim()) info.push(`Nama: ${who.name.trim()}`);
    if (who.city.trim()) info.push(`Domisili: ${who.city.trim()}`);
    if (who.note.trim()) info.push(`Catatan: ${who.note.trim()}`);
    if (info.length) {
      out.push('', info.join('\n'));
    }
    out.push('', 'Mohon info stok, harga, dan cara pembayarannya. Terima kasih!');
    return out.join('\n');
  };

  const getSingleProductWhatsAppUrl = (
    product: Product,
    v: Record<string, string>,
    qty: number
  ) => {
    if (!isWaConfigured) return '#';
    const text = `Halo ${FUNDIVE_CONFIG.shop}, saya mau tanya soal gear ini dari katalog website:\n\n${lineText(
      product,
      v,
      qty
    )}\n\nApakah tersedia? Mohon info stok dan harganya. Terima kasih!`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  };

  const getKitWhatsAppUrl = () => {
    if (!isWaConfigured) return '#';
    const text = getKitWhatsAppMessage();
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <KitContext.Provider
      value={{
        kit,
        who,
        isKitOpen,
        activeProductId,
        toastMessage,
        totalQty,
        productsById,
        waNumber,
        isWaConfigured,
        addLine,
        removeLine,
        updateLineQty,
        clearKit,
        addPack,
        openProduct,
        closeProduct,
        openKit,
        closeKit,
        showToast,
        updateWho,
        qtyOf,
        estimateTotal,
        formatRupiah,
        getKitWhatsAppMessage,
        getSingleProductWhatsAppUrl,
        getKitWhatsAppUrl
      }}
    >
      {children}
    </KitContext.Provider>
  );
};

export const useKit = (): KitContextType => {
  const ctx = useContext(KitContext);
  if (!ctx) {
    throw new Error('useKit must be used within a KitProvider');
  }
  return ctx;
};
