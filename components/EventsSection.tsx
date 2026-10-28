import React from 'react';
import { EVENTS } from '@/data/catalog';

export const EventsSection: React.FC = () => {
  return (
    <section className="section section--alt" id="event">
      <div className="container">
        <header className="sec-head reveal in">
          <h2>Event &amp; Jadwal</h2>
          <p>Ikuti sesi latihan kolam rutin, trip laut, dan workshop edukasi bersama BAC.</p>
        </header>

        <div className="grid grid--3">
          {EVENTS.map((event) => (
            <article key={event.id} className="card event reveal in">
              <time className="event__date" dateTime={event.datetime}>
                <strong>{event.day}</strong>
                <span>{event.month}</span>
              </time>
              <h3>{event.title}</h3>
              <p>{event.desc}</p>
              <p
                style={{
                  fontSize: '0.84rem',
                  color: 'var(--teal)',
                  marginTop: '6px',
                  fontWeight: 500
                }}
              >
                📍 {event.location}
              </p>
              <a className="btn btn--sm" href="#gabung">
                Daftar
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
