require("dotenv").config();
const express = require("express");
const colors = require("colors");
const { connDB } = require("./config/db.config");
const authRoutes = require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")
const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("<h1>Your app is healthy and running fine</h1>")
})

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)


connDB()
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`.blue);
})