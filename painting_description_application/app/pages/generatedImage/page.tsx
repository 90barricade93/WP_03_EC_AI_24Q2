"use client";

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function GeneratedImagePage() {
  const searchParams = useSearchParams();
  const text = searchParams.get('text');
  const var1 = searchParams.get('var1');
  const var2 = searchParams.get('var2');
  const var3 = searchParams.get('var3');
  const var4 = searchParams.get('var4');
  const var5 = searchParams.get('var5');
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [showLoadingPopup, setShowLoadingPopup] = useState(true);

  useEffect(() => {
    const generateImage = async () => {
      try {
        // Mock API call to simulate image generation
        await new Promise(resolve => setTimeout(resolve, 10000)); // Simulate a 10 second delay
        const mockImageUrl = 'https://res.cloudinary.com/dzdgpwtox/image/upload/w_600,c_scale,f_auto,q_auto/v1599559204/designer-tool-uploads/bucket_2274/1599559200483.png';
        setImageUrl(mockImageUrl);
        setLoading(false);
        setShowLoadingPopup(false);
      } catch (error) {
        console.error('Error generating image:', error);
        setLoading(false);
        setShowLoadingPopup(false);
      }
    };

    generateImage();
  }, [text, var1, var2, var3, var4, var5]);

  const handleDownload = async () => {
    if (!imageUrl) return;
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen text-center font-sans bg-black-50 text-gray-800">
      {/* Banner */}
      <header className="bg-gray-800 text-white p-5">
        <div className="flex justify-center">
          <Image src="/Banner-1200x200.jpg" width={1200} height={200} alt="Logo" className="h-24" />
        </div>
        <h1 className="mt-4">Generated Image</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 p-5">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white p-10 shadow-md rounded-md">
            <h2 className="text-2xl mb-4">Your Generated Image</h2>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Generated"
                className="mt-4"
              />
            )}
            <button
              onClick={handleDownload}
              className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-full"
            >
              Download Image
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-3">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>

      {/* Loading Popup */}
      {showLoadingPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-xl mb-4">Generating your image, please wait...</h2>
            <p>Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}
