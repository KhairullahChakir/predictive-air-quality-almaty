require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AQM backend is running");
});

const districtRoutes = require("./routes/districtRoutes");
app.use("/api/districts", districtRoutes);

const complaintRoutes = require("./routes/complaintRoutes");
app.use("/api/complaints", complaintRoutes);

// 
const forecastRoutes = require("./routes/forecastRoutes");
app.use("/api/forecast", forecastRoutes);
// 

const aiRoute = require('./routes/aiRoute');
app.use('/api/ai', aiRoute);


const airQualityRoutes = require("./routes/airQualityRoutes");
app.use("/api/air-quality", airQualityRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const sensorsRoutes = require('./routes/sensorsRoutes');
app.use('/api/sensors', sensorsRoutes);

// для каталога
const userSensorRoutes = require("./routes/userSensors");
app.use("/api/user-sensors", userSensorRoutes);


//admin
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

console.log("admin маршруты подключены");


app.use("/uploads", express.static("uploads"));




const sequelize = require("./db");

sequelize.authenticate()
  .then(() => console.log("PostgreSQL подключен"))
  .catch(err => console.error("Ошибка подключения к БД:", err));

  const Complaint = require("./models/Complaint");
  const District = require("./models/District");
  const User = require("./models/User");

  
  sequelize.sync({ alter: true }).then(() => {
    console.log("Модели синхронизированы с базой данных");
  });
  


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
