// const express = require('express');
// const path = require('path');
// const app = express();
// const { translate } = require('bing-translate-api');

// const port = 3000;


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // Serve static files from the root directory
// app.use(express.static(__dirname));

// // Serve static files from the public directory
// app.use(express.static(path.join(__dirname, '../public')));

// // Route to handle translation
// app.post('/translate', async (req, res) => {
//   try {
//     console.log(req.body);
//     const { text, fromLang, toLang } = req.body;
//     if (!text || !toLang || !fromLang) {
//       return res.status(400).json({ error: 'Text and target language are required' });
//     }

//     const result = await translate(text, fromLang, toLang);
//     res.json({ translation: result.translation });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Translation failed' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });


// new version with google
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { translate } from 'bing-translate-api';
import { translate as Gtran } from '@vitalets/google-translate-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

function fix_lang4g(lang_code){
  if (lang_code == 'zh-Hans') return 'zh-CN'; 
  else if (lang_code == 'zh-Hant') return 'zh-TW';
  else if (lang_code == 'pt-PT') return 'pt';
  else if (lang_code == 'tgk') return 'tg';
  else return lang_code
}
// Route to handle translation
app.post('/translate', async (req, res) => {
  try {
    console.log(req.body);
    const { text, fromLang, toLang } = req.body;
    if (!text || !toLang || !fromLang) {
      return res.status(400).json({ error: 'Text and target language are required' });
    }

    // const result = await translate(text, fromLang, toLang);
    // res.json({ translation: result.translation });
    const googleText = await Gtran(text , {from:fix_lang4g(fromLang), to:fix_lang4g(toLang) });
    res.json({ translation: googleText.text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Translation failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
