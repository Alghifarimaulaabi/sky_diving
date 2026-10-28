import React from 'react';
import { SAFETY_RULES } from '@/data/catalog';

export const SafetySection: React.FC = () => {
  return (
    <section className="section safety" id="safety">
      <div className="container">
        <header className="sec-head reveal in">
          <h2>Safety First</h2>
          <p>Freedive itu seru kalau aman. Ini aturan yang tidak boleh ditawar.</p>
        </header>

        <div className="grid grid--2">
          {SAFETY_RULES.map((rule, idx) => (
            <article key={idx} className="rule reveal in">
              <span aria-hidden="true">{rule.icon}</span>
              <div>
                <h3>{rule.title}</h3>
                <p>{rule.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="warn-box reveal in">
          <strong>Penting:</strong> jangan pernah menahan napas di dalam air saat latihan sendiri,
          dan jangan latih breath-hold sambil berdiri, berkendara, atau dekat air. Belajar langsung
          dengan instruktur.
        </p>
      </div>
    </section>
  );
};
