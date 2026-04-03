const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   STATIC FILES (FOR LOCAL TEST)
========================= */
app.use(express.static(path.join(__dirname)));
app.use("/videos", express.static(path.join(__dirname, "videos")));

/* =========================
   EVENTS DATA
========================= */
let events = [
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

/* =========================
   GET EVENTS
========================= */
app.get("/events", (req, res) => {
  res.json(events);
});

/* =========================
   BOOKING ROUTE
========================= */
app.post("/book", (req, res) => {
  try {
    const booking = req.body;

    console.log("📩 Booking:", booking);

    res.json({
      success: true,
      message: "Booking successful"
    });

  } catch (err) {
    res.status(500).json({ error: "Booking failed" });
  }
});

/* =========================
   AI ROUTE
========================= */
app.post("/ai", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (err) {
    res.status(500).json({ error: "AI failed" });
  }
});

/* =========================
   HEALTH CHECK
========================= */
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
