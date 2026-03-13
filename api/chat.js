import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  // Проверяем, что это POST-запрос
  if (req.method !== "POST") {
    return res.status(405).json({ answer: "Метод не разрешен" });
  }

  const { message } = req.body;
  if (!message) return res.status(400).json({ answer: "Нет сообщения" });

  try {
    // Отправляем запрос в OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // можно заменить на "gpt-3.5-turbo" для теста
      messages: [
        { role: "system", content: "Ты космический помощник." },
        { role: "user", content: message }
      ]
    });

    // Берём ответ модели
    const answer = response?.choices?.[0]?.message?.content || "Нет ответа от модели";
    res.status(200).json({ answer });

  } catch (err) {
    // Логируем ошибку для отладки
    console.error("Ошибка OpenAI:", err.response?.status, err.response?.data || err.message);
    res.status(500).json({ answer: "Ошибка сервера" });
  }
}
