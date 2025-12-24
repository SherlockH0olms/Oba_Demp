import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import DashboardPage from './pages/DashboardPage';
import CallCenterPage from './pages/CallCenterPage';
import SurveysPage from './pages/SurveysPage';
import AnalyticsPage from './pages/AnalyticsPage';
import QRCodesPage from './pages/QRCodesPage';
import SimulatorPage from './pages/SimulatorPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <Routes>
            {/* Landing Page - Full screen without layout */}
            <Route path="/landing" element={<LandingPage />} />

            {/* Login Page - Full screen without layout */}
            <Route path="/login" element={<LoginPage />} />

            {/* Main App with Layout */}
            <Route path="/*" element={
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/call-center" element={<CallCenterPage />} />
                        <Route path="/surveys" element={<SurveysPage />} />
                        <Route path="/analytics" element={<AnalyticsPage />} />
                        <Route path="/qr-codes" element={<QRCodesPage />} />
                        <Route path="/simulator" element={<SimulatorPage />} />
                    </Routes>
                </MainLayout>
            } />
        </Routes>
    );
}

export default App;

