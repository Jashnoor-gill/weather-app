import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';
import { WeatherData } from './types/weather';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY || '2d19e641a0284e9fe004f14b5be5bdd4'}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found. Please try again.');
      }
      
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundClass = () => {
    if (!weatherData) return 'bg-gradient-to-br from-blue-400 to-purple-500';
    
    const weatherId = weatherData.weather[0].id;
    
    if (weatherId >= 200 && weatherId < 300) return 'bg-gradient-to-br from-gray-600 to-gray-800'; // Thunderstorm
    if (weatherId >= 300 && weatherId < 400) return 'bg-gradient-to-br from-blue-500 to-gray-600'; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return 'bg-gradient-to-br from-blue-600 to-gray-700'; // Rain
    if (weatherId >= 600 && weatherId < 700) return 'bg-gradient-to-br from-blue-300 to-white'; // Snow
    if (weatherId >= 700 && weatherId < 800) return 'bg-gradient-to-br from-gray-500 to-gray-700'; // Atmosphere
    if (weatherId === 800) return 'bg-gradient-to-br from-blue-400 to-yellow-400'; // Clear
    if (weatherId >= 801 && weatherId < 900) return 'bg-gradient-to-br from-gray-400 to-blue-500'; // Clouds
    
    return 'bg-gradient-to-br from-blue-400 to-purple-500';
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${getBackgroundClass()}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Weather App
          </h1>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
        
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        {error && (
          <div className="weather-card p-6 mt-6 text-center">
            <p className="text-red-600 dark:text-red-400 text-lg">{error}</p>
          </div>
        )}
        
        {weatherData && <WeatherCard data={weatherData} />}
      </div>
    </div>
  );
}

export default App; 