"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function GenerateImagePage() {
  const searchParams = useSearchParams();
  const text = searchParams.get('text');
  const var1 = searchParams.get('var1');
  const var2 = searchParams.get('var2');
  const var3 = searchParams.get('var3');
  const var4 = searchParams.get('var4');
  const var5 = searchParams.get('var5');
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateImage = async () => {
      try {
        // Simuleer een respons met een mock URL
        const mockImageUrl = 'https://via.placeholder.com/512';
        router.push(`generatedImage?imageUrl=${encodeURIComponent(mockImageUrl)}`);
      } catch (error) {
        console.error('Error generating image:', error);
      } finally {
        setLoading(false);
      }
    };

    generateImage();
  }, [text, var1, var2, var3, var4, var5]);

  return (
    <div className="flex flex-col justify-between min-h-screen text-center font-sans bg-gray-50 text-gray-800">
      {/* Banner */}
      <header className="bg-gray-800 text-white p-5">
        <div className="flex justify-center">
          <Image src="/Banner-1200x200.jpg" width={1200} height={200} alt="Logo" className="h-24" />
        </div>
        <h1 className="mt-4">Generate Image Page</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 p-5">
        <div className="bg-white p-10 shadow-md rounded-md">
          <h2 className="text-2xl mb-4">Generating Image...</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p className="text-red-500">Failed to generate image</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-3">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
