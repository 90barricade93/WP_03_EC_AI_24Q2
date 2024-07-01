import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Initialiseer de OpenAI-client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { theme } = req.body;

  try {
    // Maak een nieuwe thread
    const thread = await openai.beta.threads.create();

    // Voeg een bericht toe aan de thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `Generate a detailed description about ${theme}`,
    });

    // Start een run met de assistent
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID,
    });

    // Stream het antwoord van de assistent
    let generatedText = '';
    run.on('textDelta', (textDelta) => {
      generatedText += textDelta.value;
    });

    run.on('end', () => {
      res.status(200).json({ text: generatedText });
    });

    run.on('error', (error) => {
      res.status(500).json({ error: error.message });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
