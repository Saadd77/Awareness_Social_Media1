import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SimulationProvider } from './context/SimulationContext';
import LandingPage from './pages/LandingPage';
import UserFeed from './pages/UserFeed';
import AdminPanel from './pages/AdminPanel';
import DailyReport from './pages/DailyReport';

function App() {
  return (
    <SimulationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user" element={<UserFeed />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/report" element={<DailyReport />} />
        </Routes>
      </BrowserRouter>
    </SimulationProvider>
  );
}

export default App;
