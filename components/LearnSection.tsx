import React from 'react';
import { TIMELINE_STEPS } from '@/data/catalog';

export const LearnSection: React.FC = () => {
  return (
    <section className="section" id="belajar">
      <div className="container">
        <header className="sec-head reveal in">
          <h2>Belajar dari Nol</h2>
          <p>Pelan-pelan aja. Urutan ini bikin progres kamu aman dan nyata.</p>
        </header>
        <ol className="timeline">
          {TIMELINE_STEPS.map((step) => (
            <li key={step.num} className="reveal in">
              <span className="timeline__n">{step.num}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
