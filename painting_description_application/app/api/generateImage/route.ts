import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  imageUrl?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { text, var1, var2, var3, var4, var5 } = req.body;

  try {
    const imageUrl = await generateImageWithOpenAI(text, var1, var2, var3, var4, var5);
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error generating image with OpenAI:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
}

async function generateImageWithOpenAI(text: string, var1: string, var2: string, var3: string, var4: string, var5: string): Promise<string> {
  // Voeg hier de code toe om de afbeelding te genereren met OpenAI
  // Voorbeeld implementatie:
  const response = await fetch('https://api.openai.com/v1/images/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
    },
    body: JSON.stringify({
      prompt: `${text} ${var1} ${var2} ${var3} ${var4} ${var5}`,
      n: 1,
      size: '512x512',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate image');
  }

  const data = await response.json();

  if (!data.data || data.data.length === 0) {
    throw new Error('No image generated');
  }

  return data.data[0].url; // Veronderstellend dat de API een URL van de gegenereerde afbeelding teruggeeft
}
