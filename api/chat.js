import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if(req.method !== "POST"){
    return res.status(405).json({answer:"Метод не разрешен"});
  }

  const { message } = req.body;
  if(!message) return res.status(400).json({answer:"Нет сообщения"});

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
