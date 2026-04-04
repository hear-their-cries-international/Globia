const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(express.static(path.join(__dirname)));
app.use("/videos", express.static(path.join(__dirname, "videos")));

const events = [
  {
    name: "Tech Conference 2026",
    location: "Dubai",
    date: "May 20",
    description: "AI & Innovation",
    video: "/videos/tech.mp4"
  },
  {
    name: "Business Summit",
    location: "London",
    date: "June 10",
    description: "Entrepreneurship",
    video: "/videos/business.mp4"
  }
];

app.get("/events", (req, res) => {
  res.json(events);
});

app.post("/book", (req, res) => {
  const { name, email, event, ticket } = req.body;

  if (!name || !email || !event || !ticket) {
    return res.status(400).json({ success: false });
  }

  console.log("📩 Booking:", { name, email, event, ticket });

  res.json({ success: true });
});

app.post("/ai", async (req, res) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: req.body.message }]
      })
    });

    const data = await response.json();

    res.json({
      reply: data?.choices?.[0]?.message?.content || "No response"
    });

  } catch {
    res.status(500).json({ error: "AI failed" });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on ${PORT}`);
});
