import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { name, instructions, model } = await request.json();

    const assistant = await openai.beta.assistants.create({
      name,
      description: null,
      model,
      instructions,
      tools: [],
      top_p: 1,
      temperature: 1,
    });

    return NextResponse.json(assistant);
  } catch (error) {
    console.error('Error creating assistant:', error);
    return NextResponse.json({ error: 'Failed to create assistant. Please try again.' }, { status: 500 });
  }
}
