import type { NextApiRequest, NextApiResponse } from 'next';

const openaiApiKey = process.env.OPENAI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { theme } = req.body;

  if (!openaiApiKey) {
    return res.status(500).json({ error: 'OpenAI API key is not set' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        prompt: `Generate a detailed description about ${theme}`,
        max_tokens: 100,
      }),
    });

    const data = await response.json();
    res.status(200).json({ text: data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: 'Error generating text' });
  }
}
