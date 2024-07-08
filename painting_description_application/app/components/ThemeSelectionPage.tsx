"use client";

import { useChat } from "ai/react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ThemeSelectionPage() {
  const { messages, append, isLoading } = useChat();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState('/Default.png'); // Default image
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showGenerationComplete, setShowGenerationComplete] = useState(false);
  const router = useRouter();

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

  const handleThemeChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const theme = event.target.value;
    setSelectedTheme(theme);
    if (theme) {
      setImageSrc(`/${theme}.png`); // Update image source based on selected theme
    } else {
      setImageSrc('/Default.png'); // Revert to default if no theme is selected
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (selectedTheme) {
      // AI prompt generation
      setIsGenerated(false); // Reset generation status
      append({
        role: "user",
        content: `Generate a prompt describing a picture related to ${selectedTheme}.`,
      });
    }
  }, [selectedTheme, append]);

  useEffect(() => {
    if (messages.length > 0 && !messages[messages.length - 1].content.startsWith("Generate")) {
      const text = messages[messages.length - 1].content;
      setGeneratedText(text);
      setIsGenerated(true); // Set to true when text is generated
      console.log("Generated Text:", text); // Log the generated text to the console

      // Show generation complete indicator after loading disappears
      setShowGenerationComplete(true);
      setTimeout(() => setShowGenerationComplete(false), 3000);
    }
  }, [messages]);

  useEffect(() => {
    if (generatedText) {
      // Store the text in session storage
      sessionStorage.setItem('generatedText', generatedText);
      sessionStorage.setItem('selectedTheme', selectedTheme || '');
      // Push to the new page after a delay
      setTimeout(() => {
        router.push('/pages/generateText');
      }, 4000); // 4 second delay
    }
  }, [generatedText, selectedTheme, router]);

  return (
    <div className="flex flex-col justify-between min-h-screen text-center font-sans">
      <header className="bg-gray-800 text-white p-5">
        <div className="flex justify-center">
          <Image src="/Banner-1200x200.jpg" width={1200} height={200} alt="Logo" className="h-24" />
        </div>
        <h1 className="mt-4">Select a Painting Theme</h1>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 p-4">
        <Image src={imageSrc} width={640} height={480} alt="Selected Theme" className="w-full max-w-md h-96 object-contain my-8" />
        <div className="mb-8 w-full">
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
            <button onClick={handleSubmit} disabled={!selectedTheme} className="mt-4 py-2 px-4 bg-gray-600 text-white rounded-full border border-white">
              {isLoading ? (
                <span className="animate-pulse text-white">Loading...</span>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </div>

      </main>

      <footer className="bg-gray-800 text-white p-3">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}
