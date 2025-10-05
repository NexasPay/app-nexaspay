import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import { buildSystemPrompt, fewShots } from "./agent-config.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function safeParseJSON(str) {
  try { return JSON.parse(str); } catch {}
  const m = str?.match(/\{[\s\S]*\}$/);
  if (m) { try { return JSON.parse(m[0]); } catch {} }
  return { answer: "Não entendi a resposta do agente.", intent: "unknown", entities: {}, action: { type: "NONE" } };
}

app.post("/chat", async (req, res) => {
  try {
    const { user = { id: "anon", name: "Usuário" }, history = [] } = req.body || {};
    const system = buildSystemPrompt({ name: user.name });

    const messages = [
      { role: "system", content: system },
      ...fewShots,
      ...history.map(m => ({ role: m.from === "ai" ? "assistant" : "user", content: m.text })),
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.4,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices?.[0]?.message?.content || "{}";
    const obj = safeParseJSON(raw);

    const allowed = new Set(["/pro/checkout", "/carteiras", "/nexasai", "/opcoes", "/home"]);
    if (obj?.action?.type === "NAVIGATE" && obj?.action?.route && !allowed.has(obj.action.route)) {
      obj.action = { type: "NONE" };
    }

    res.json({
      reply: obj.answer,
      intent: obj.intent,
      entities: obj.entities || {},
      action: obj.action || { type: "NONE" },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Falha ao conversar com o agente" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Nexas AI agent em http://localhost:${PORT}`));
