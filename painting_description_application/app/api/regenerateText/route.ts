import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  try {
    const { theme } = await request.json();

    const response = await openai.chat.completions.create({
      
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that generates detailed descriptions about painting themes. Provide efficient, creative, and detailed descriptions based on a short theme provided by the USER.'
        },
        {
          role: 'user',
          content: `Generate a prompt describing a picture related to ${theme}. in 285 words`
        }
      ],
    });

    const text = response.choices[0].message.content;

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error regenerating text:', error);
    return NextResponse.error();
  }
}
