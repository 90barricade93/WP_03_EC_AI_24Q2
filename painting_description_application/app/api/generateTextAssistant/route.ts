import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { theme, n_images, size } = await request.json();
  const assistant_id = 'asst_N3hFnk0NfsTUwSzG8d9Zv2LI';

  try {
    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: 'user',
          content: `Generate a painting description for the theme: ${theme}`,
        },
      ],
    });

    const message = await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: `Please describe a painting with the theme: ${theme}`,
    });

    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id,
      model: 'gpt-4-turbo',
      instructions: 'You are an AI assistant that generates detailed descriptions about painting themes and the AI has been trained to describe a painting based on a short description (theme) from USER. You will provide efficient strictly painting descriptions with details about its elements, style, details, and colors. The AI thinks outside the box and is creative.',
      top_p: 1,
      temperature: 1,
    });

    const messages = await openai.beta.threads.messages.list(thread.id);

    const assistantMessage = messages.data.find(
      (msg) => msg.role === 'assistant'
    );

    if (!assistantMessage) {
      throw new Error('No assistant response found');
    }

    return NextResponse.json({ text: assistantMessage.content });
  } catch (error) {
    console.error('Error creating thread or message:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
