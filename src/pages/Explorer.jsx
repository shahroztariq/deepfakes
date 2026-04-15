import { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

export default function Explorer() {
  const [manifest, setManifest] = useState(null);
  const [category, setCategory] = useState('faceswap');
  const [subcategory, setSubcategory] = useState('in-the-wild');
  const [currentMedia, setCurrentMedia] = useState([]);

  // Fetch the manifest on mount
  useEffect(() => {
    fetch('/data/deepfake_examples.json')
      .then(res => res.json())
      .then(data => setManifest(data))
      .catch(err => console.error("Could not load deepfake examples", err));
  }, []);

  // Update current media when category/subcategory changes or user clicks refresh
  const pickRandomMedia = useCallback(() => {
    if (!manifest) return;
    
    // Get all media for the current category & subcategory
    const availableMedia = manifest[category]?.[subcategory] || [];
    
    if (availableMedia.length === 0) {
      setCurrentMedia([]);
      return;
    }

    // Pick up to 6 random examples to show
    const shuffled = [...availableMedia].sort(() => 0.5 - Math.random());
    setCurrentMedia(shuffled.slice(0, 6)); // Display up to 6 at a time
  }, [manifest, category, subcategory]);

  // Trigger media pick whenever deps change
  useEffect(() => {
    pickRandomMedia();
  }, [pickRandomMedia]);

  const categories = [
    { id: 'faceswap', label: 'Face Swap' },
    { id: 'reenactment', label: 'Face Reenactment' },
    { id: 'synthesis', label: 'Synthesis' }
  ];

  const subcategories = [
    { id: 'in-the-wild', label: 'In the Wild' },
    { id: 'benchmark', label: 'Benchmark Datasets' }
  ];

  return (
    <div className="page-container">
      <header className="explorer-header">
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Deepfake <span className="gradient-text">Examples</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Public awareness gallery demonstrating the three main categories of deepfakes. 
          Use the refresh button to see random new examples from our datasets.
        </p>
      </header>

      <section className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div className="controls-bar">
          
          {/* Category Tabs */}
          <div className="tabs-group">
            {categories.map(cat => (
              <button 
                key={cat.id} 
                className={`btn ${category === cat.id ? 'active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div style={{ width: '2px', height: '30px', background: 'var(--glass-border)', margin: '0 1rem' }} />

          {/* Subcategory Filters */}
          <div className="filter-group">
            {subcategories.map(subcat => (
              <button 
                key={subcat.id} 
                className={`btn ${subcategory === subcat.id ? 'active' : ''}`}
                style={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}
                onClick={() => setSubcategory(subcat.id)}
              >
                {subcat.label}
              </button>
            ))}
          </div>

          <div style={{ flexGrow: 1 }} />

          {/* Refresh Button */}
          <button className="btn btn-primary" onClick={pickRandomMedia}>
            <RefreshCw size={20} /> Refresh Examples
          </button>
        </div>
      </section>

      {/* Media Gallery */}
      <section className="media-gallery">
        {!manifest ? (
          <div className="empty-state">Loading datasets...</div>
        ) : currentMedia.length === 0 ? (
          <div className="empty-state glass-panel">
            <h3 style={{ marginBottom: '1rem' }}>No Data Available</h3>
            <p>You need to add images or videos to the <code>public/examples/{category}/{subcategory}</code> directory,<br />and then run the <code>generate_manifest.py</code> script to display them here.</p>
          </div>
        ) : (
          currentMedia.map((media, idx) => (
            <div className="media-item" key={`${media.url}-${idx}`}>
              {media.type === 'video' ? (
                <video src={media.url} autoPlay loop muted playsInline />
              ) : (
                <img src={media.url} alt={`Deepfake Example - ${category}`} loading="lazy" />
              )}
              {media.source && media.source !== "General" && (
                <div className="media-source-badge">
                  {media.source}
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
}
