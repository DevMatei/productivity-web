import React from 'react';
import { Moon, Sun, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const { theme, toggleTheme, language, setLanguage } = useApp();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <div className="relative">
              <button className="flex items-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Globe className="h-5 w-5 mr-1" />
                <span className="text-sm">{language.toUpperCase()}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};