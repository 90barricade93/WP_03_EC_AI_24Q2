"use client";

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function GenerateTextPage() {
  const searchParams = useSearchParams();
  const theme = searchParams.get('theme');
  const text = searchParams.get('text');
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    setImageIsLoading(true);
    try {
      const response = await fetch("/api/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });
      const data = await response.json();
      setImage(data.image);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setImageIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen text-center font-sans">
      <header className="bg-gray-800 text-white p-5">
        <div className="flex justify-center">
          <Image src="/Banner-1200x200.jpg" width={1200} height={200} alt="Logo" className="h-24" />
        </div>
        <h1 className="mt-4">Generated Text for: {theme}</h1>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 p-5">
        <div className="bg-white p-10 shadow-md rounded-md mb-4">
          <h2 className="text-2xl mb-4 text-black ">Generated Text</h2>
          <p className="text-lg text-black">{text}</p>
        </div>
        {/* Generate image button */}
        <button
          className="mt-4 py-2 px-4 bg-gray-600 text-white rounded-full border border-white"
          disabled={imageIsLoading}
          onClick={handleGenerateImage}
        >
          {imageIsLoading ? 'Loading...' : 'Generate an image'}
        </button>
        {image && (
          <div className="card w-full h-screen max-w-md py-10 mx-auto stretch">
            <img src={`data:image/jpeg;base64,${image}`} alt="Generated" />
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white p-3">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
