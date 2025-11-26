import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SimulationProvider } from './context/SimulationContext';
import LandingPageMultiDevice from './pages/LandingPageMultiDevice';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RoleSelectPage from './pages/RoleSelectPage';
import UserFeed from './pages/UserFeed';
import AdminPanel from './pages/AdminPanel';
import DailyReport from './pages/DailyReport';

function App() {
  return (
    <AuthProvider>
      <SimulationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPageMultiDevice />} />
            <Route path="/demo" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/role-select" element={<RoleSelectPage />} />
            <Route path="/user" element={<UserFeed />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/report" element={<DailyReport />} />
          </Routes>
        </BrowserRouter>
      </SimulationProvider>
    </AuthProvider>
  );
}

export default App;
