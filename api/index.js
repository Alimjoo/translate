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
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "xai/grok-3-mini";

const clarify_token = process.env["CLARIFY_TOKEN"];
const clarify_url = "https://api.clarifai.com/v2/ext/openai/v1";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const src_lang = {
  "en": "English",
  "ug": "Uyghur",
  "zh-Hans": "Chinese Simplified",
  "kk": "Kazakh",
  "bo": "Tibetan",
  "tgk": "Tajik",
  "uz": "Uzbek",
  "tr": "Turkish",
  "es": "Spanish",
  "ru": "Russian",
  "hi": "Hindi",
  "ur": "Urdu",
  "ja": "Japanese",
  "ko": "Korean",
  "ar": "Arabic",
  "zh-Hant": "Chinese Traditional",
  "fr": "French",
  "de": "German",
  "it": "Italian",
  "ky": "Kyrgyz",
  "fa": "Persian",
  "pt-PT": "Portuguese",
  "th": "Thai",
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

function fix_lang4g(lang_code) {
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
    const googleText = await Gtran(text, { from: fix_lang4g(fromLang), to: fix_lang4g(toLang) });
    res.json({ translation: googleText.text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.post('/ai_translate', async (req, res) => {
  try {
    // console.log(req.body);
    const { text, fromLang, toLang } = req.body;
    if (!text || !toLang || !fromLang) {
      return res.status(400).json({ error: 'Text and target language are required' });
    }

    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
    );

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "You are a translator, just output the translated result!" },
          {
            role: "user", content: `Translate this '${text}'
            from ${src_lang[fromLang]} to ${src_lang[toLang]}`
          }
        ],
        temperature: 1,
        top_p: 1,
        model: model
      }
    });

    if (isUnexpected(response)) {
      res.status(500).json({ error: 'Translation failed' });
      // throw response.body.error;
    }
    res.json({ translation: response.body.choices[0].message.content });
    console.log(response.body.choices[0].message.content);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.post('/clarify_translate', async (req, res) => {
  try {
    console.log(req.body);
    const { text, fromLang, toLang } = req.body;
    if (!text || !toLang || !fromLang) {
      return res.status(400).json({ error: 'Text and target language are required' });
    }
    const client = new OpenAI({
      baseURL: clarify_url,
      apiKey: clarify_token,
    });

    const response = await client.chat.completions.create({
      model: "https://clarifai.com/xai/chat-completion/models/grok-3",
      messages: [
        { role: "system", content: "You are a translator, just output the translated result!" },
        {
          role: "user", content: `Translate this '${text}'
            from ${src_lang[fromLang]} to ${src_lang[toLang]}`
        }
      ],
    });
    res.json({ translation: response.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.post('/gemini_translate', async (req, res) => {
  const ai = new GoogleGenAI({});
  try {
    console.log(req.body);
    const { text, fromLang, toLang } = req.body;
    if (!text || !toLang || !fromLang) {
      return res.status(400).json({ error: 'Text and target language are required' });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Translate this '${text}'
            from ${src_lang[fromLang]} to ${src_lang[toLang]}`,
      config: {
        systemInstruction: {
          parts: [
            { text: "You are a translator, just output the best translated result!" },
            { text: "important!! do not explain and just translate as instructed and output the translated result only!" }
          ]
        },
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
      }
    });
    res.json({ translation: response.text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Translation failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
