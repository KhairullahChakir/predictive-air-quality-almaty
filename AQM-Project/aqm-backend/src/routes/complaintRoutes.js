const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");
const District = require("../models/District");

router.post("/", async (req, res) => {
  console.log("Получено тело жалобы:", req.body);
  
  try {
    const { title, category, district, description, name, email } = req.body;

    if (!title || !category || !district || !description || !name || !email) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const districtInstance = await District.findOne({ where: { name: district } });

    if (!districtInstance) {
      return res.status(400).json({ message: "Указанный район не найден" });
    }

    const complaint = await Complaint.create({
      title,
      category,
      description,
      name,
      email,
      DistrictId: districtInstance.id
    });

    res.status(201).json({ message: "Жалоба успешно сохранена", complaint });
  } catch (error) {
    console.error("Ошибка при сохранении жалобы:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

router.get("/", async (req, res) => {
    try {
      const complaints = await Complaint.findAll({
        include: {
          model: require("../models/District"),
          attributes: ["name"]
        },
        order: [["createdAt", "DESC"]]
      });
  
      res.json(complaints);
    } catch (error) {
      console.error("Ошибка при получении жалоб:", error);
      res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  });
  

module.exports = router;
