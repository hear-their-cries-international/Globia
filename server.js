const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let events = [
  {
    name: "Dubai Tech Conference",
    location: "UAE",
    date: "2026-06-10",
    description: "A global technology conference.",
    video: "conf1.mp4"
  },
  {
    name: "London Business Summit",
    location: "UK",
    date: "2026-08-20",
    description: "Top business leaders meet.",
    video: "conf2.mp4"
  }
];

let bookings = [];

/* GET EVENTS */
app.get("/events",(req,res)=>{
  res.json(events);
});

/* SAVE BOOKING */
app.post("/book",(req,res)=>{
  bookings.push(req.body);
  console.log("Booking:", req.body);
  res.json({message:"Saved"});
});

app.listen(5000,()=>console.log("Server running on 5000"));
