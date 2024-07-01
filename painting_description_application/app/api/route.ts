import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const assistantId = 'asst_N3hFnk0NfsTUwSzG8d9Zv2LI';

    const assistant = await openai.beta.assistants.create({
      name: "Data visualizer",
      model: "gpt-4-turbo",
      tools: [],
      assistant_id: assistantId, // Correct field for the assistant ID
      tool_resources: {
        "code_interpreter": {
          "file_ids": ["your_file_id_here"] // Replace this with your actual file ID
        }
      }
    });

    return NextResponse.json(assistant);
  } catch (error) {
    console.error('Error creating assistant:', error);
    return NextResponse.json({ error: 'Failed to create assistant. Please try again.' }, { status: 500 });
  }
}
