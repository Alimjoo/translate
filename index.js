const express = require('express');
const path = require('path');
const app = express();
const { translate } = require('bing-translate-api');

const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the root directory
app.use(express.static(__dirname));

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle translation
app.post('/translate', async (req, res) => {
  try {
    const { text, toLang } = req.body;
    if (!text || !toLang) {
      return res.status(400).json({ error: 'Text and target language are required' });
    }

    const result = await translate(text, null, toLang);
    res.json({ translation: result.translation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Translation failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});1