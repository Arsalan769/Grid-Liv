const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const RESOURCES = {
  price: 'a019e2ad-5a36-404e-bc6d-d7c77fd1f66b',
  demand: 'ad93fe4c-394b-4357-9353-f0c8d07c81d4',
  emissions: 'cecf5eec-b24d-49aa-9b60-31a347f3f358',
  transfers: 'f4567f4b-fffb-4561-a403-b50d29ad9f90'
};

const BASE_URL = 'https://api.neso.energy/api/3/action/datastore_search';

app.get('/api/:metric', async (req, res) => {
  const { metric } = req.params;
  const resource_id = RESOURCES[metric];
  if (!resource_id) return res.status(404).json({ error: 'Invalid metric' });

  try {
    const response = await fetch(`${BASE_URL}?resource_id=${resource_id}&limit=100`);
    const data = await response.json();
    res.json(data.result.records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
