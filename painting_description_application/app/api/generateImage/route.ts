import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  try {
    const { text, n_images, size } = await request.json();

    const response = await openai.images.generate({
      prompt: text,
      n: n_images,
      size: size,
    });

    if (!response || !response.data) {
      throw new Error('Invalid response from OpenAI');
    }

    const images = response.data.map((img: { url: string }) => img.url);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error generating images:', error);

    if (error.response) {
      const { status, data } = error.response;
      console.error('Error response from OpenAI:', status, data);
      return new NextResponse(JSON.stringify({ error: data }), { status });
    }

    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
