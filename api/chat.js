import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { message } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Ты космический помощник." },
        { role: "user", content: message }
      ]
    });

    res.status(200).json({ answer: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: "Ошибка сервера" });
  }
}
