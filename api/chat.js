// api/chat.js — Backend sécurisé (fonction serverless Vercel)
// Version avec messages d'erreur clairs pour faciliter le débogage.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        error: "Clé GROQ_API_KEY introuvable. Vérifie le fichier .env à la racine, puis relance vercel dev.",
      });
    }

    const { system, messages } = req.body;

    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.GROQ_API_KEY,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: system }, ...messages],
        max_tokens: 1000,
        temperature: 0.4,
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      console.error("Erreur Groq:", data);
      return res.status(r.status).json({
        error: (data.error && data.error.message) || "Erreur renvoyée par Groq.",
      });
    }

    const text =
      (data.choices &&
        data.choices[0] &&
        data.choices[0].message &&
        data.choices[0].message.content.trim()) ||
      "";
    res.status(200).json({ text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e) });
  }
}