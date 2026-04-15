import { useState, useEffect } from 'react';
import publicationsData from '../data/publications.json';

export default function Publications() {
  const [pubs, setPubs] = useState([]);

  useEffect(() => {
    // In a real app we might fetch this, but we import it directly for simplicity.
    setPubs(publicationsData);
  }, []);

  return (
    <div className="page-container">
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          Advancing <span className="gradient-text">Cybersecurity</span> & AI
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Selected works by Dr. Shahroz Tariq, Dr. Kirsten Moore, Dr. Sharif Abuadbba, and collaborators on deepfakes and synthetic media
        </p>
      </header>

      <section>
        <h2 style={{ fontSize: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>Selected Publications</h2>

        <div className="pub-grid">
          {pubs.map((pub, index) => (
            <div className="pub-card glass-panel" key={index}>
              <div className="pub-ranking">{pub.ranking}</div>
              <h3 className="pub-title">{pub.title}</h3>
              <p className="pub-authors">{pub.authors}</p>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{pub.venue}</span>
                {pub.link && (
                  <a href={pub.link} target="_blank" rel="noopener noreferrer" className="pub-link">
                    Read Paper
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
