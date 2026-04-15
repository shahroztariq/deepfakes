import { NavLink } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="glass-panel" style={{ margin: '1rem', border: 'none', borderRadius: '12px' }}>
      <NavLink to="/" className="logo">
        <span className="gradient-text">Deepfake</span> Research @ CSIRO
      </NavLink>
      <div className="links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Publications
        </NavLink>
        <NavLink to="/explorer" className={({ isActive }) => (isActive ? 'active' : '')}>
          Deepfake Examples
        </NavLink>
      </div>
    </nav>
  );
}
