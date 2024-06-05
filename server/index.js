require("dotenv").config();
const express = require("express");
const colors = require("colors");
const { connDB } = require("./config/db.config");
const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("<h1>Your app is healthy and running fine</h1>")
})


connDB()
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`.blue);
})