import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    // Verwerk de boodschap hier, bijvoorbeeld door een verzoek te sturen naar OpenAI's API
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: message,
        
      }),
    });

    if (!response.ok) {
      throw new Error('Error generating image');
    }

    const data = await response.json();
    const image = data.data[0].b64_json;

    return NextResponse.json({ image });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
