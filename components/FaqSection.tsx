import React from 'react';
import { FAQ_LIST } from '@/data/catalog';

export const FaqSection: React.FC = () => {
  return (
    <section className="section" id="faq">
      <div className="container container--narrow">
        <header className="sec-head reveal in">
          <h2>FAQ</h2>
        </header>
        <div className="faq reveal in">
          {FAQ_LIST.map((faq, index) => (
            <details key={index}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
