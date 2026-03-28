const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* ✅ Serve static frontend files */
app.use(express.static(path.join(__dirname)));

/* ✅ Serve videos from /videos */
app.use("/videos", express.static(path.join(__dirname, "videos")));

/* Sample events data */
let events = [
  {
    name: "Tech Conference 2026",
    location: "Dubai",
    date: "May 20",
    description: "AI & Innovation",
    video: "/videos/tech.mp4" // ✅ FIXED PATH
  },
  {
    name: "Business Summit",
    location: "London",
    date: "June 10",
    description: "Entrepreneurship",
    video: "" // no video
  }
];

/* GET events */
app.get("/events", (req, res) => {
  res.json(events);
});

/* POST booking */
app.post("/book", (req, res) => {
  console.log("Booking received:", req.body);
  res.json({ message: "Booked successfully" });
});

/* Start server */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


