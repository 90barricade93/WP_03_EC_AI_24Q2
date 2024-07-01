"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const themes = [
  'Abstract',
  'Animals',
  'Art Deco',
  'Art Nouveau',
  'Baroque',
  'Cubism',
  'Expressionism',
  'Futurism',
  'Impressionism',
  'Landscape',
  'Minimalism',
  'Nature',
  'Photorealism',
  'Pop Art',
  'Portrait',
  'Realism',
  'Renaissance',
  'Romanticism',
  'Still Life',
  'Surrealism',
];

export default function ThemeSelectionPage() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState('/Default.png'); // Default image
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const theme = event.target.value;
    setSelectedTheme(theme);
    if (theme) {
      setImageSrc(`/${theme}.png`); // Update image source based on selected theme
    } else {
      setImageSrc('/Default.png'); // Revert to default if no theme is selected
    }
  };

  const handleSubmit = async () => {
    if (selectedTheme) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/setupAssistant', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: "Theme Description Assistant",
            instructions: "You are an AI assistant that generates detailed descriptions about painting themes and the AI has been trained to describe a painting based on a short description (theme) from USER. You will provide efficient, strictly painting descriptions with details about its elements, style, details, and colors. The AI thinks outside the box and is creative.",
            model: "gpt-4-turbo",
          }),
        });

        const data = await response.json();
        if (data.id) {
          router.push(`pages/generateText?theme=${selectedTheme}&assistant_id=${data.id}`);
        } else {
          setError("Failed to create assistant. Please try again.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen text-center font-sans">
      <header className="bg-gray-800 text-white p-5">
        <div className="flex justify-center">
          <Image src="/Banner-1200x200.jpg" width={1200} height={200} alt="Logo" className="h-24" />
        </div>
        <h1 className="mt-4">Select a Painting Theme</h1>
      </header>

      <main className="flex flex-col items-center justify-center flex-1">
        <Image src={imageSrc} width={640} height={480} alt="Selected Theme" className="w-full max-w-md h-96 object-contain my-8" />
        <div className="mb-8">
          <label htmlFor="theme-select" className="text-white text-lg mr-4">Choose a theme:</label>
          <select id="theme-select" value={selectedTheme || ''} onChange={handleThemeChange} className="text-black p-2 rounded-md">
            <option value="">Theme</option>
            {themes.map((theme) => (
              <option key={theme} value={theme} className="text-black">
                {theme}
              </option>
            ))}
          </select>
          <div>
            <button onClick={handleSubmit} disabled={!selectedTheme || loading} className="mt-4 py-2 px-4 bg-gray-600 text-white rounded-full border border-white">
              {loading ? 'Loading...' : 'Submit'}
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-3">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
