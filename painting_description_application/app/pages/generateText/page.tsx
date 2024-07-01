"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function GenerateTextPage() {
  const searchParams = useSearchParams();
  const theme = searchParams.get('theme');
  const [nImages, setNImages] = useState(1);
  const [size, setSize] = useState('256x256');
  const [generatedText, setGeneratedText] = useState(`Generating text for theme: ${theme}`);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchGeneratedText() {
      try {
        const response = await fetch('/api/generateTextAssistant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ theme, n_images: nImages, size }),
        });

        const data = await response.json();
        if (data.text) {
          setGeneratedText(data.text);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error generating text:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchGeneratedText();
  }, [theme, nImages, size]);

  const handleSubmitForImaging = () => {
    setShowModal(false);
    router.push(`generatedImage?text=${encodeURIComponent(generatedText)}&n_images=${nImages}&size=${size}`);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen text-center font-sans bg-black-50 text-gray-800">
      {/* Banner */}
      <header className="bg-gray-800 text-white p-5">
        <div className="flex justify-center">
          <Image src="/Banner-1200x200.jpg" width={1200} height={200} alt="Logo" className="h-24" />
        </div>
        <h1 className="mt-4">Generating Text for: {theme}</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 p-5">
        <div className="bg-white p-10 shadow-md rounded-md mb-4">
          <h2 className="text-2xl mb-4">Generated Text</h2>
          {loading ? <p>Loading...</p> : <p className="text-lg">{generatedText}</p>}
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={() => setShowModal(true)} 
            className="py-2 px-4 bg-gray-600 text-white rounded-full border border-white"
          >
            {loading ? 'Loading...' : 'Submit for Imaging'}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-3">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-xl mb-4">Set Variables for Image Generation</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Number of Images: {nImages}</label>
              <input 
                type="range" 
                min="1" 
                max="4" 
                step="1" 
                value={nImages} 
                onChange={(e) => setNImages(parseInt(e.target.value))} 
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Size: {size}</label>
              <select 
                value={size} 
                onChange={(e) => setSize(e.target.value)} 
                className="w-full p-2 border rounded-md"
              >
                <option value="256x256">256x256</option>
                <option value="512x512">512x512</option>
                <option value="1024x1024">1024x1024</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowModal(false)} 
                className="py-2 px-4 bg-gray-600 text-white rounded-full border border-white"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitForImaging} 
                className="py-2 px-4 bg-blue-600 text-white rounded-full border border-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
