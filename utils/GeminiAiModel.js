// geminiClient.js

const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_KEY,
});

const tools = [
  {
    googleSearch: {},
  },
];

const config = {
  thinkingConfig: {
    thinkingBudget: -1,
  },
  tools,
};

const model = 'gemini-2.5-pro';

/**
 * Generates content from Gemini API for a given prompt.
 * @param {string} prompt - Your custom prompt string
 * @returns {Promise<string>}
 */
async function generateFromPrompt(prompt) {
  const contents = [{ role: 'user', parts: [{ text: String(prompt) }] }];


  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let result = '';
  for await (const chunk of response) {
    result += chunk.text;
  }

  return result;
}

module.exports = {
  generateFromPrompt,
};
