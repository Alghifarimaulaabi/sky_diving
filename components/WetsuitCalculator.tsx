'use client';

import React, { useState } from 'react';

export const WetsuitCalculator: React.FC = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [thickness, setThickness] = useState(3);
  const [result, setResult] = useState<string | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    let size =
      weight < 50
        ? 'S'
        : weight < 62
        ? 'M'
        : weight < 75
        ? 'L'
        : weight < 90
        ? 'XL'
        : 'XXL';

    if (height >= 180 && size !== 'XXL') {
      size += ' (tall)';
    }

    const factorMap: Record<number, number> = {
      0: 0.01,
      1.5: 0.025,
      3: 0.035,
      5: 0.05
    };

    const f = factorMap[thickness] ?? 0.035;
    const kg = weight * f;
    const lo = Math.max(0, kg - 0.5).toFixed(1);
    const hi = (kg + 0.5).toFixed(1);

    setResult(
      `Estimasi ukuran wetsuit: ${size}. Estimasi awal pemberat: ${lo} - ${hi} kg.`
    );
  };

  return (
    <div className="tool card reveal in" id="calc">
      <h3>Kalkulator Estimasi Wetsuit &amp; Pemberat</h3>
      <form id="calcForm" className="form form--inline" onSubmit={calculate}>
        <label>
          Tinggi (cm)
          <input
            type="number"
            id="cH"
            inputMode="numeric"
            min="120"
            max="220"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            required
          />
        </label>
        <label>
          Berat (kg)
          <input
            type="number"
            id="cW"
            inputMode="numeric"
            min="30"
            max="150"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            required
          />
        </label>
        <label>
          Tebal wetsuit
          <select
            id="cT"
            value={thickness}
            onChange={(e) => setThickness(Number(e.target.value))}
          >
            <option value="0">Tanpa wetsuit</option>
            <option value="1.5">1,5 mm</option>
            <option value="3">3 mm</option>
            <option value="5">5 mm</option>
          </select>
        </label>
        <button className="btn" type="submit">
          Hitung
        </button>
      </form>
      <p className="result" id="calcOut" aria-live="polite">
        {result || 'Isi data lalu klik Hitung.'}
      </p>
      <p className="note">
        Hanya estimasi awal. Ukuran pas dan beban akhir harus dites di air bersama instruktur.
      </p>
    </div>
  );
};
