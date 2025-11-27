const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

console.log("OPENROUTER_API_KEY:", process.env.OPENROUTER_API_KEY);

router.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ reply: 'Вопрос не может быть пустым.' });
  }

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Ты — ИИ-консультант по экологии. Отвечай по-русски, кратко, понятно и строго по теме загрязнения воздуха, защиты здоровья, масок и очистителей. Не выдумывай.',
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Ошибка при обращении к OpenRouter:', error.response?.data || error.message);
    res.status(500).json({ reply: 'Ошибка при получении ответа от ИИ.' });
  }
});

module.exports = router;
