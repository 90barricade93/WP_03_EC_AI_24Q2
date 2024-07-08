"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function GenerateTextPage() {
  const searchParams = useSearchParams();
  const theme = searchParams.get('theme');
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nImages, setNImages] = useState(1);
  const [size, setSize] = useState('256x256');
  const router = useRouter();

  useEffect(() => {
    const storedText = sessionStorage.getItem('generatedText');
    setGeneratedText(storedText || `This is where the text will be generated about ${theme}`);
  }, [theme]);

  const regenerateText = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/regenerateText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme }),
      });
      const data = await response.json();
      setGeneratedText(data.text);
      sessionStorage.setItem('generatedText', data.text); // Update session storage
    } catch (error) {
      console.error('Error regenerating text:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitForImaging = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: generatedText, n_images: nImages, size }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const data = await response.json();
      sessionStorage.setItem('images', JSON.stringify(data.images)); // Save images to session storage

      // Navigate to the next page
      router.push('generateImage');
    } catch (error) {
      console.error('Error generating images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen text-center font-sans bg-black-50 text-gray-800">
      {/* Banner */}
      <header className="bg-gray-800 text-white p-5">
        <div className="flex justify-center">
          <Image src="/Banner-1200x200.jpg" width={1200} height={200} alt="Logo" className="h-24" />
        </div>
        <h1 className="mt-4">Generated Text for: {theme}</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 p-5">
        <div className="bg-white p-10 shadow-md rounded-md mb-4 w-full max-w-3xl">
          <h2 className="text-2xl mb-4">Generated Text</h2>
          <p className="text-lg">{generatedText}</p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={regenerateText} 
            className="py-2 px-4 bg-gray-600 text-white rounded-full border border-white"
          >
            {loading ? 'Loading...' : 'Regenerate'}
          </button>
          <button 
            onClick={() => setShowModal(true)} 
            className="py-2 px-4 bg-gray-600 text-white rounded-full border border-white"
          >
            {loading ? 'Submit for Imaging' : 'Submit for Imaging'}
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
                className="w-full p-2 border border-gray-300 rounded-md"
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

      {/* Loading Modal */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-md shadow-md w-3/4 h-3/4 flex items-center justify-center">
          <p className="text-4xl animate-pulse">Loading...</p>
        </div>
      </div>
      )}
    </div>
  );
}
