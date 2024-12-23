require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT ;
const API_BASE_URL = process.env.API_BASE_URL;
const POPULATION_API_URL = process.env.POPULATION_API_URL;
const FLAG_API_URL = process.env.FLAG_API_URL;

app.use(cors());
app.use(express.json());

app.get('/api/countries', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/AvailableCountries`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

app.get('/api/countries/:code', async (req, res) => {
  const { code } = req.params;

  try {
    const borderResponse = await axios.get(`${API_BASE_URL}/CountryInfo/${code}`);
    const borders = borderResponse.data.borders || [];

    const populationResponse = await axios.post(POPULATION_API_URL, {
      country: borderResponse.data.commonName,
    });
    const populationData = populationResponse.data.data.populationCounts;

    const flagResponse = await axios.post(FLAG_API_URL, {
      country: borderResponse.data.commonName,
    });
    const flagUrl = flagResponse.data.data.flag;

    const name = borderResponse.data.commonName;

    res.json({ borders, populationData, flagUrl, name });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country info' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});