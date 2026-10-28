'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useKit } from '@/context/KitContext';
import { ProductIcon } from './ProductIcon';

export const KitBar: React.FC = () => {
  const { totalQty, kit, productsById, openKit } = useKit();
  const [bump, setBump] = useState(false);
  const prevQtyRef = useRef(totalQty);

  useEffect(() => {
    if (totalQty > 0 && totalQty !== prevQtyRef.current) {
      setBump(true);
      const timer = setTimeout(() => setBump(false), 350);
      prevQtyRef.current = totalQty;
      return () => clearTimeout(timer);
    }
    prevQtyRef.current = totalQty;
  }, [totalQty]);

  if (totalQty === 0) return null;

  // Unique product ids in kit
  const uniqueIds: string[] = [];
  kit.forEach((l) => {
    if (!uniqueIds.includes(l.id)) uniqueIds.push(l.id);
  });

  const visibleIds = uniqueIds.slice(0, 4);
  const remainingCount = uniqueIds.length - 4;

  return (
    <div className="kitbar enter" id="kitBar">
      <button
        className="kitbar__open"
        id="kitOpen"
        type="button"
        aria-haspopup="dialog"
        onClick={openKit}
      >
        <span className={`kitbar__stack ${bump ? 'bump' : ''}`} id="kitStack" aria-hidden="true">
          {visibleIds.map((id) => {
            const p = productsById[id];
            if (!p) return null;
            return (
              <span key={id}>
                <ProductIcon name={p.icon} size={20} />
              </span>
            );
          })}
          {remainingCount > 0 && <span className="more">+{remainingCount}</span>}
        </span>
        <span className="kitbar__txt">
          <strong>Kit saya</strong>
          <span>
            <span id="kitCount">{totalQty}</span> item siap dikirim
          </span>
        </span>
        <span className="kitbar__go">Lihat &amp; kirim</span>
      </button>
    </div>
  );
};
