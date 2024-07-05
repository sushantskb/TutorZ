require("dotenv").config();
const express = require("express");
const colors = require("colors");
const { connDB } = require("./config/db.config");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const reviewRoutes = require("./routes/review.routes");
const slotRoutes = require("./routes/slot.routes");
const bookingRoutes = require("./routes/booking.routes");
const webhookRoutes = require("./routes/webhooks.routes");
const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("<h1>Your app is healthy and running fine</h1>");
});



// Middlewares
app.use("/webhook", webhookRoutes); // this needs to be here...
app.use(express.json());
app.use(
  cors({
    uri: "http://localhost:5173",
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);

connDB();
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`.blue);
});
