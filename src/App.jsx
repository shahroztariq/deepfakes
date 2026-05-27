import { HashRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Publications from './pages/Publications';
import Explorer from './pages/Explorer';

function App() {
  return (
    <HashRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Publications />} />
        <Route path="/explorer" element={<Explorer />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
