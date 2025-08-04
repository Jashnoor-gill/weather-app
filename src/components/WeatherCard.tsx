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
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center gap-3">
              <Droplets className="text-blue-500" size={20} />
              <span className="text-gray-700 dark:text-gray-300">Humidity</span>
            </div>
            <span className="font-semibold text-gray-800 dark:text-white">
              {data.main.humidity}%
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center gap-3">
              <Wind className="text-green-500" size={20} />
              <span className="text-gray-700 dark:text-gray-300">Wind Speed</span>
            </div>
            <span className="font-semibold text-gray-800 dark:text-white">
              {data.wind.speed} m/s
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <span className="text-gray-700 dark:text-gray-300">Pressure</span>
            <span className="font-semibold text-gray-800 dark:text-white">
              {data.main.pressure} hPa
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <span className="text-gray-700 dark:text-gray-300">Visibility</span>
            <span className="font-semibold text-gray-800 dark:text-white">
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