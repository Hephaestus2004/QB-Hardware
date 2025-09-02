require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('TestWebsite'));



app.get('/gemini-test', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          parts: [
            { text: 'Explain how AI works in a few words' }
          ]
        }
      ]
    };
    const response = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
    let message = '';
    if (response.data && response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content && response.data.candidates[0].content.parts) {
      message = response.data.candidates[0].content.parts[0].text;
    }
    res.json({ message });
  } catch (err) {
    res.status(500).json({ message: 'Error: ' + err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/gemini-test.html`);
});
