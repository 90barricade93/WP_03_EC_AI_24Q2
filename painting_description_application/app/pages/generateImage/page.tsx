"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function GenerateImagePage() {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const storedImages = sessionStorage.getItem('images');
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    } else {
      router.push('/');
    }
  }, [router]);

  const downloadImage = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `generated_image_${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageClick = (img: string) => {
    setSelectedImage(img);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen text-center font-sans bg-black-50 text-gray-800">
      {/* Banner */}
      <header className="bg-gray-800 text-white p-5">
        <div className="flex justify-center">
          <Image src="/Banner-1200x200.jpg" width={1200} height={200} alt="Logo" className="h-24" />
        </div>
        <h1 className="mt-4">Generated Images</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 p-5">
        {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img 
                  src={img} 
                  alt={`Generated ${index + 1}`} 
                  className="rounded-md shadow-md cursor-pointer" 
                  onClick={() => handleImageClick(img)}
                />
                <button 
                  onClick={() => downloadImage(img, index)} 
                  className="absolute top-2 right-2 bg-blue-600 text-white py-1 px-2 rounded-full"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No images to display.</p>
        )}
        <div className="flex space-x-4 mt-8">
          <button 
            onClick={() => router.back()} 
            className="py-2 px-4 bg-gray-600 text-white rounded-full border border-white"
          >
            Back to Previous
          </button>
          <button 
            onClick={() => router.push('/')} 
            className="py-2 px-4 bg-gray-600 text-white rounded-full border border-white"
          >
            Back to Home
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-3">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>

      {/* Modal for displaying the selected image */}
      {showModal && selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-5 rounded-md shadow-md" style={{ transform: 'scale(1.5)', transformOrigin: 'center', maxWidth: '90%', maxHeight: '90%' }}>
            <img 
              src={selectedImage} 
              alt="Selected" 
              className="rounded-md"
            />
            <button 
              onClick={() => setShowModal(false)} 
              className="mt-4 py-2 px-4 bg-gray-600 text-white rounded-full border border-white"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
