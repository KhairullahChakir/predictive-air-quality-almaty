import React, { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "./ForecastSection.css";

// --- ICONS ---
const SunIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f1c40f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="1" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);

const CloudIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
    </svg>
);

// Database expects English keys
const districts = [
    "Alatau", "Almaly", "Auezov", "Bostandyk",
    "Medeu", "Nauryzbay", "Turksib", "Zhetysu"
];

const ForecastSection = () => {
    const { t, language } = useLanguage();
    const [forecast, setForecast] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);

    useEffect(() => {
        const generateForecast = () => {
            const days = Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                return date;
            });

            // Manual translation maps
            const daysMap = {
                'ru': ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
                'en': ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
                'kk': ['ЖЕК', 'ДҮЙ', 'СЕЙ', 'СӘР', 'БЕЙ', 'ЖҰМ', 'СЕН']
            };

            const monthsMap = {
                'ru': ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
                'en': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                'kk': ['Қаң', 'Ақп', 'Нау', 'Сәу', 'Мам', 'Мау', 'Шіл', 'Там', 'Қыр', 'Қаз', 'Қар', 'Жел']
            };

            const currentLang = language || 'ru';
            const dayNames = daysMap[currentLang] || daysMap['ru'];
            const monthNames = monthsMap[currentLang] || monthsMap['ru'];

            // Generate random PM2.5 values (realistic range: 20-120)
            const results = days.map((date) => {
                const dayName = dayNames[date.getDay()];
                const dayNum = date.getDate();
                const monthName = monthNames[date.getMonth()];
                const formattedDate = `${dayNum} ${monthName}`;

                // Generate random PM2.5 value between 20 and 120
                const pm25 = Math.floor(Math.random() * 100) + 20;

                return {
                    day: dayName,
                    date: formattedDate,
                    value: pm25,
                };
            });

            setForecast(results);
        };

        // Generate initial forecast
        generateForecast();

        // Update forecast every 5 seconds (same as PM charts)
        const interval = setInterval(generateForecast, 5000);

        return () => clearInterval(interval);
    }, [selectedDistrict, language]);

    return (
        <section className="forecast-section">
            <div className="forecast-container">
                <div className="forecast-header">
                    <div className="header-title">
                        <span className="section-label">/// {t('weather_data')}</span>
                        <h2 className="neon-text">{t('forecast_title')} ({selectedDistrict})</h2>
                    </div>

                    <div className="header-actions">
                        <select
                            className="cyber-select"
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                        >
                            {districts.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="forecast-grid">
                    {forecast.map((f, i) => {
                        const isToday = i === 0;
                        const hasData = f.value !== null;

                        // Determine color class
                        let statusClass = "glow-green";
                        if (f.value > 35) statusClass = "glow-orange";
                        if (f.value > 75) statusClass = "glow-red";

                        return (
                            <div key={i} className={`day-card ${isToday ? 'active' : ''} ${statusClass}`}>
                                <div className="day-name">{f.day}</div>
                                <div className="day-date">{f.date}</div>

                                <div className="weather-icon">
                                    {hasData && f.value <= 35 ? <SunIcon /> : <CloudIcon />}
                                </div>

                                <div className="aqi-value">
                                    {hasData ? Math.round(f.value) : "--"}
                                </div>
                                <div className="aqi-label">AQI (PM2.5)</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ForecastSection;