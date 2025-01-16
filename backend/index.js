const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 5000;

// Middleware to parse JSON body requests
app.use(express.json());

// Enable CORS for all origins (for development)
app.use(cors());

// /generate route handler
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  // Validate if prompt exists
  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }

  // RapidAPI request configuration
  const options = {
    method: 'POST',
    url: 'https://ai-text-to-image-generator-api.p.rapidapi.com/realistic',
    headers: {
      'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
      'x-rapidapi-host': 'ai-text-to-image-generator-api.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: {
      inputs: prompt,
    },
  };

  try {
    const response = await axios.request(options);
    if (response.data) {
      return res.json({ data: response.data });
    } else {
      return res.status(500).json({ message: 'No data returned from RapidAPI' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching image from RapidAPI', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
