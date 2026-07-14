# Predictive Air Quality System (Almaty)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-Vite-blue.svg)](https://reactjs.org/)

## 📖 Overview
The **Predictive Air Quality System** is a comprehensive, full-stack web application designed to monitor, visualize, and predict air quality metrics (PM2.5 and PM10) across Almaty, Kazakhstan. 

Built with a scalable **Node.js/Express** backend and a responsive **React (Vite)** frontend, this system empowers citizens to view real-time data, analyze historical trends, file environmental complaints, and interact with an AI-driven chatbot powered by Google Gemini.

## ✨ Features
* **Real-time Monitoring**: Live dashboard displaying current AQI, PM2.5, and PM10 values.
* **AI Predictions**: Integration with a LightGBM machine learning model to forecast future particulate matter levels.
* **Interactive AI Assistant**: Chat with a Google Gemini-powered bot to get contextual air quality advice.
* **Historical Data Visualization**: Interactive charts for selected date ranges.
* **Citizen Reporting**: Integrated complaint system for reporting localized air quality issues.
* **Localization**: Multi-language support (English, Russian, Kazakh) built into the frontend context.
* **Modern UI/UX**: Responsive design with a sleek dark-mode aesthetic for accessibility and comfort.

## 🚀 Technologies Used
* **Frontend**: React.js, Vite, Vanilla CSS, JavaScript
* **Backend**: Node.js, Express.js
* **Database**: SQLite (Development) – Ready for migration to PostgreSQL/MySQL
* **Machine Learning**: LightGBM (Python) 
* **AI Integration**: Google Gemini API
* **Containerization**: Docker & Docker Compose

## 📁 Project Structure
```text
predictive-air-quality-almaty/
├── aqm-backend/            # Node.js & Express server
│   ├── src/
│   │   ├── models/         # Database schemas (e.g., Complaint.js)
│   │   ├── routes/         # API endpoints (/chat, /complaints, /predict)
│   │   └── controllers/    # Route logic
│   ├── scripts/            # Database seeding scripts
│   └── package.json
├── aqm-frontend/           # React frontend application (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # State management (LanguageContext.js)
│   │   └── App.jsx         # Main application entry
│   └── package.json
├── docker-compose.yml      # Docker orchestration
├── .gitignore              # Git ignore rules
├── LICENSE                 # MIT License
└── README.md               # Project documentation
```

## 📸 Screenshots
*(Screenshots coming soon - placeholder for dashboard, prediction view, and chat interface)*

## 🛠️ Installation & Setup

### Prerequisites
* **Node.js** (v18 or higher)
* **npm** (Node Package Manager)

### 1. Backend Setup
```bash
# Navigate to the backend directory
cd aqm-backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your Google Gemini API key and Database paths

# Seed the database (districts and sample complaints)
npm run seed

# Start the development server (runs on port 5000)
npm run dev
```

### 2. Frontend Setup
```bash
# In a new terminal, navigate to the frontend directory
cd aqm-frontend

# Install dependencies
npm install

# Start the Vite development server (runs on port 3000)
npm run dev
```

### 3. Usage
Once both servers are running, open your browser and navigate to:
**[http://localhost:3000](http://localhost:3000)**

## 🔮 Future Improvements
* **Mobile Application**: Port the responsive web view into a native Flutter application.
* **Database Migration**: Transition from SQLite to PostgreSQL for robust production deployment.
* **IoT Sensor Integration**: Directly ingest live data streams from localized Arduino/Raspberry Pi air sensors.
* **Automated CI/CD**: Implement GitHub Actions for automated testing and deployment.

## 🤝 Contributing
Contributions are always welcome! Please follow these steps:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
