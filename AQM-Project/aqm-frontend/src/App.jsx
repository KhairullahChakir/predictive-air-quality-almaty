import React, { useState, useEffect } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useLanguage } from "./contexts/LanguageContext";
import ModalComplaint from "./components/ModalComplaint";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import ForecastSection from "./components/ForecastSection";
import AiChatWidget from "./components/AiChatWidget";
import PMCharts from "./components/PMcharts";
import SensorCatalog from "./components/SensorCatalog";
import SensorShop from "./components/SensorShop";
import MapWithSensors from "./components/MapWithSensors";
import MapLegend from "./components/MapLegend";
// import LoginModal from "./components/LoginModal";
// import RegisterModal from "./components/RegisterModal";
import UserDashboard from "./components/UserDashboard";

function AppContent() {
    console.log('API URL:', process.env.REACT_APP_API_URL); // Временно добавлено для отладки
    const location = useLocation();
    const { t } = useLanguage();

    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [isLoginOpen, setIsLoginOpen] = useState(false);
    // const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    // Сброс модалок при переходе на другую страницу
    useEffect(() => {
        setIsModalOpen(false);
    }, [location.pathname]);

    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";

    const handleOpenModal = () => setIsModalOpen(true);

    const HomePage = () => (
        <>
            <Header onOpenModal={handleOpenModal} />

            <main className="home_page">
                <div id="home" className="content-container">
                    <div className="map-container">
                        <MapWithSensors />
                    </div>

                    <div className="charts-container">
                        <div className="charts-inner">
                            <h2>{t('emissions_title')}</h2>
                            <PMCharts deviceId={3} />
                        </div>
                    </div>
                </div>

                <ForecastSection />

                {/* --- NEW DARK THEME GUIDE SECTION --- */}
                <section id="guide-section" className="dark-guide-section">
                    <div className="dark-container">
                        <div className="dark-header-group">
                            <h2 className="neon-title">{t('monitoring_title')} <span className="highlight">{t('air_quality')}</span></h2>
                            <p className="dark-subtitle">
                                {t('almaty_risk')}
                            </p>
                        </div>

                        <div className="dark-content-grid">
                            {/* Left: Image with Cyber Overlay */}
                            <div className="cyber-image-card">
                                <div className="cyber-frame">
                                    <img src="/Images/air-pollution.png" alt="Smog in Almaty" />
                                    <div className="scan-line"></div>
                                    <div className="hud-overlay">

                                        <div className="hud-item">
                                            <span className="label">{t('region_label')}</span>
                                            <span className="value">{t('region_value')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Periodic Table Style Grid */}
                            <div className="periodic-grid-wrapper">
                                <h3 className="section-label">{t('pollutants_title')}</h3>
                                <div className="periodic-grid">
                                    {[
                                        { symbol: "PM2.5, PM10", name: t('pm_desc'), color: "red" },
                                        { symbol: "CO", name: t('co_desc'), color: "orange" },
                                        { symbol: "NO₂", name: t('no2_name'), color: "blue" },
                                        { symbol: "SO₂", name: t('so2_name'), color: "yellow" },
                                        { symbol: "O₃", name: t('o3_name'), color: "cyan" },
                                        { symbol: "H₂S", name: t('h2s_name'), color: "purple" },
                                    ].map((el, index) => (
                                        <div key={index} className={`element-card glow-${el.color}`}>
                                            <div className="element-number">{el.number}</div>
                                            <div className="element-symbol">{el.symbol}</div>
                                            <div className="element-name">{el.name}</div>
                                        </div>
                                    ))}
                                </div>
                                <p className="chem-info">
                                    {t('sources_info')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="catalog-section" className="guide-section">
                    <div className="guide-container">
                        <SensorCatalog />
                    </div>
                </section>

                {/* --- CYBER ABOUT SECTION --- */}
                <section id="about" className="cyber-about-section">
                    <div className="cyber-container">
                        <div className="about-header">
                            <h2>{t('digital_shield')}</h2>
                        </div>

                        {/* Outer Frame */}
                        <div className="about-outer-frame">
                            <div className="about-content-row">
                                {/* Left Side: Text and Chart stacked */}
                                <div className="about-left">
                                    {/* Text Content */}
                                    <div className="about-text">
                                        <p>{t('about_desc')}</p>
                                    </div>

                                    {/* Chart */}
                                    <div className="about-chart">
                                        <div className="chart-header">
                                            <p>{t('fig_caption')}</p>
                                            <span className="chart-count">61 ответ</span>
                                        </div>
                                        <div className="chart-wrapper">
                                            <img src="/Images/grafik.jpg" alt="Статистика" />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: QR Code */}
                                <div className="about-qr">
                                    <p className="survey-text">{t('survey_result')}</p>
                                    <p className="qr-title">{t('join_network')}</p>
                                    <div className="qr-code">
                                        <img src="/Images/qr.png" alt="QR Code" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <AiChatWidget />
        </>
    );

    return (
        <>
            {/* Модалки рендерим глобально */}
            <ModalComplaint isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <AiChatWidget />

            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route
                    path="/shop"
                    element={
                        <SensorShop
                            onOpenModal={handleOpenModal}
                        />
                    }
                />
                <Route
                    path="/dashboard"
                    element={<UserDashboard />}
                />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                    path="/admin"
                    element={isAdminAuthenticated ? <AdminPanel /> : <Navigate to="/admin/login" />}
                />
            </Routes>
        </>
    );
}



export default function App() {
    return (
        <Router>
            <LanguageProvider>
                <AppContent />
            </LanguageProvider>
        </Router>
    );
}
