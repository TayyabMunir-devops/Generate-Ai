import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_URL = "http://localhost:11434";
const MODEL = "llama3";

// HEALTH
app.get("/health", async (req, res) => {
  res.json({ ok: true, model: MODEL });
});

// CHAT STREAM
app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: "messages required" });
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8");

    const response = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages,
        stream: true,
      }),
    });

    if (!response.ok || !response.body) {
      const err = await response.text();
      return res.status(500).send(err);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);

      // Ollama sends multiple JSON lines
      const lines = chunk.split("\n").filter(Boolean);

      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          const text = json?.message?.content;

          if (text) {
            res.write(text); // 🔥 STREAM TEXT ONLY
          }
        } catch (e) {}
      }
    }

    res.end();
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
  console.log("🤖 Ollama streaming enabled");
});
