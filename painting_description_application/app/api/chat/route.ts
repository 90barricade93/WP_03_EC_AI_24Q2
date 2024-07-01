import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          'You are an AI assistant that generates detailed descriptions about painting themes and the AI has been trained to describe a painting based on a short description (theme) from USER, You will provide efficient strictly painting descriptions with details about its elements, style, details, and colors. The AI thinks outside the box and is creative.'
      },
      ...messages,
    ],
    
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
