import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar       from './components/Navbar/Navbar';
import Home         from './pages/Home/Home';
import Goals        from './pages/Goals/Goals';
import Attempts     from './pages/Attempts/Attempts';
import Attacking    from './pages/Attacking/Attacking';
import Distribution from './pages/Distribution/Distribution';
import Defending    from './pages/Defending/Defending';
import Disciplinary from './pages/Disciplinary/Disciplinary';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-wrapper">
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/goals"        element={<Goals />} />
          <Route path="/attempts"     element={<Attempts />} />
          <Route path="/attacking"    element={<Attacking />} />
          <Route path="/distribution" element={<Distribution />} />
          <Route path="/defending"    element={<Defending />} />
          <Route path="/disciplinary" element={<Disciplinary />} />
          <Route path="/players"      element={<Navigate to="/goals" replace />} />
          <Route path="*"             element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
