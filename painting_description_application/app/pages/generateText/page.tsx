// my-project/app/generateText/page.tsx

"use client";

import { useSearchParams } from 'next/navigation';

export default function GenerateTextPage() {
  const searchParams = useSearchParams();
  const theme = searchParams.get('theme');

  return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Generate Text Page </h1>
        <p>This is where the text will be generated about {theme}</p>
      </div>
  );
}
