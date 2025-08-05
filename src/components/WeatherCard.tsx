import React from 'react';
import { WeatherData } from '../types/weather';
import { Droplets, Wind, Thermometer, MapPin } from 'lucide-react';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="weather-card p-8 mt-8 max-w-2xl mx-auto">
      {/* Location and Time */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin className="text-blue-500" size={20} />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            {data.name}, {data.sys.country}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Main Weather Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Temperature and Icon */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img
              src={getWeatherIcon(data.weather[0].icon)}
              alt={data.weather[0].description}
              className="w-24 h-24"
            />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Thermometer className="text-red-500" size={24} />
            <span className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-white">
              {Math.round(data.main.temp)}°C
            </span>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 capitalize">
            {data.weather[0].description}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Feels like {Math.round(data.main.feels_like)}°C
          </p>
        </div>

        {/* Weather Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-3">
              <Droplets className="text-blue-500 dark:text-blue-300" size={24} />
              <span className="text-gray-700 dark:text-gray-200 font-medium">Humidity</span>
            </div>
            <span className="font-bold text-blue-600 dark:text-blue-300 text-lg">
              {data.main.humidity}%
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-green-200 dark:border-green-700">
            <div className="flex items-center gap-3">
              <Wind className="text-green-500 dark:text-green-300" size={24} />
              <span className="text-gray-700 dark:text-gray-200 font-medium">Wind Speed</span>
            </div>
            <span className="font-bold text-green-600 dark:text-green-300 text-lg">
              {data.wind.speed} m/s
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-purple-200 dark:border-purple-700">
            <div className="flex items-center gap-3">
              <svg className="text-purple-500 dark:text-purple-300" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2z"/>
              </svg>
              <span className="text-gray-700 dark:text-gray-200 font-medium">Pressure</span>
            </div>
            <span className="font-bold text-purple-600 dark:text-purple-300 text-lg">
              {data.main.pressure} hPa
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900 dark:to-amber-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-amber-200 dark:border-amber-700">
            <div className="flex items-center gap-3">
              <svg className="text-amber-500 dark:text-amber-300" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20"/>
              </svg>
              <span className="text-gray-700 dark:text-gray-200 font-medium">Visibility</span>
            </div>
            <span className="font-bold text-amber-600 dark:text-amber-300 text-lg">
              {(data.visibility / 1000).toFixed(1)} km
            </span>
          </div>
        </div>
      </div>

      {/* Sunrise/Sunset */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sunrise</p>
            <p className="font-semibold text-gray-800 dark:text-white">
              {formatTime(data.sys.sunrise)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sunset</p>
            <p className="font-semibold text-gray-800 dark:text-white">
              {formatTime(data.sys.sunset)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 