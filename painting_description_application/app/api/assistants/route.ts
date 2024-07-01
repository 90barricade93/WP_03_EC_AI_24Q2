import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function GET() {
  try {
    const myAssistants = await openai.beta.assistants.list({
      order: "desc",
      limit: "20",
    });
    return NextResponse.json(myAssistants.data);
  } catch (error) {
    return NextResponse.error();
  }
}
