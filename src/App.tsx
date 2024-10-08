import React, { useState, useEffect } from 'react';
import { Book, Sun, Moon } from 'lucide-react';

function App() {
  const [summary, setSummary] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check browser theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addListener(listener);
    return () => mediaQuery.removeListener(listener);
  }, []);

  const toggleSummarizer = () => {
    setIsEnabled(!isEnabled);
    if (!isEnabled) {
      // Simulate summarization (replace with actual API call)
      setTimeout(() => {
        setSummary("This is a summary of the Wikipedia page. It includes <b>important dates</b>, <i>key events</i>, and <u>notable characters</u>.");
      }, 1000);
    } else {
      setSummary('');
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col items-center justify-center p-4`}>
      <div className={`w-full max-w-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold flex items-center">
            <Book className="mr-2" /> Wikipedia Summarizer
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDarkMode ? <Sun /> : <Moon />}
          </button>
        </div>
        <button
          onClick={toggleSummarizer}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-all duration-300 ease-in-out ${
            isEnabled
              ? 'bg-green-500 hover:bg-green-600 shadow-inner'
              : 'bg-blue-500 hover:bg-blue-600 shadow-lg'
          }`}
          style={{
            boxShadow: isEnabled
              ? 'inset 2px 2px 5px rgba(0, 0, 0, 0.2), inset -2px -2px 5px rgba(255, 255, 255, 0.1)'
              : '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.5)',
          }}
        >
          {isEnabled ? 'Disable Summarizer' : 'Enable Summarizer'}
        </button>
        {summary && (
          <div className={`mt-4 p-4 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h2 className="text-xl font-semibold mb-2">Summary:</h2>
            <div dangerouslySetInnerHTML={{ __html: summary }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;