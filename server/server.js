const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
  origin: "http://localhost:5173", // Adjust this to your frontend's URL
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome to the root route!");
});

app.get("/api", (req, res) => {
  res.json({
    assets: ["Gold", "Oil", "Jewelry", "Real Estate", "Stocks"],
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
