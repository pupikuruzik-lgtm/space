import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.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 });

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
