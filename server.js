const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/:metric", async (req, res) => {
  const metric = req.params.metric;
  const url = `https://api.neso.energy/public/temporal/${metric}/?start=2024-12-01&end=2025-04-01`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch NESO data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
