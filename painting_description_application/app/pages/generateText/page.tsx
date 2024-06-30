"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

export default function GenerateTextPage() {
  const searchParams = useSearchParams();
  const theme = searchParams.get('theme');
  const router = useRouter();
  const [generatedText, setGeneratedText] = useState(`This is where the text will be generated about ${theme}`);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [variable1, setVariable1] = useState(0.5);
  const [variable2, setVariable2] = useState(0.5);
  const [variable3, setVariable3] = useState(0.5);
  const [variable4, setVariable4] = useState(0.5);
  const [variable5, setVariable5] = useState(0.5);

  const regenerateText = () => {
    setGeneratedText(`This is the newly generated text about ${theme}`);
  };

  const handleSubmitForImaging = () => {
    setLoading(true);
    setTimeout(() => {
      router.push(`generatedImage?text=${encodeURIComponent(generatedText)}&var1=${variable1}&var2=${variable2}&var3=${variable3}&var4=${variable4}&var5=${variable5}`);
    }, 1000);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen text-center font-sans bg-black-50 text-gray-800">
      {/* Banner */}
      <header className="bg-gray-800 text-white p-5">
        <div className="flex justify-center">
          <Image src="/Banner-1200x200.jpg" width={1200} height={200} alt="Logo" className="h-24" />
        </div>
        <h1 className="mt-4">Select a Painting Theme</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 p-5">
        <div className="bg-white p-10 shadow-md rounded-md mb-4">
          <h2 className="text-2xl mb-4">Generate Text Page</h2>
          <p className="text-lg">{generatedText}</p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={regenerateText} 
            className="py-2 px-4 bg-gray-600 text-white rounded-full border border-white"
          >
            Regenerate
          </button>
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
              <label className="block text-gray-700">Variable 1: {variable1}</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={variable1} 
                onChange={(e) => setVariable1(parseFloat(e.target.value))} 
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Variable 2: {variable2}</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={variable2} 
                onChange={(e) => setVariable2(parseFloat(e.target.value))} 
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Variable 3: {variable3}</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={variable3} 
                onChange={(e) => setVariable3(parseFloat(e.target.value))} 
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Variable 4: {variable4}</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={variable4} 
                onChange={(e) => setVariable4(parseFloat(e.target.value))} 
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Variable 5: {variable5}</label>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={variable5} 
                onChange={(e) => setVariable5(parseFloat(e.target.value))} 
                className="w-full"
              />
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
