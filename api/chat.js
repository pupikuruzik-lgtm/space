import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  // Проверяем метод
  if (req.method !== "POST") {
    return res.status(405).json({ answer: "Метод не разрешен" });
  }

  const { message } = req.body;
  if (!message) return res.status(400).json({ answer: "Нет сообщения" });

  try {
    // Отправляем запрос в OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo", // Надежная модель для всех аккаунтов
      messages: [
        { role: "system", content: "Ты космический помощник." },
        { role: "user", content: message }
      ],
      temperature: 0.7 // можно регулировать креативность ответов
    });

    // Берём ответ модели
    const answer = response?.choices?.[0]?.message?.content || "Нет ответа от модели";
    res.status(200).json({ answer });

  } catch (err) {
    // Полное логирование ошибки для отладки
    console.error("Ошибка OpenAI full:", JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    res.status(500).json({ answer: "Ошибка сервера. Проверь ключ OpenAI и модель." });
  }
}
