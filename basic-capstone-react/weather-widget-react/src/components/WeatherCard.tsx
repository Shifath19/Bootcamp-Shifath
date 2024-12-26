import React from 'react';
import { Cloud, Wind, Droplets, Thermometer } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
}
export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white shadow-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-5xl font-semibold mb-2">{weather.location.name}</h2>
        <p className="text-base font-medium opacity-80 mb-8">{weather.location.country}</p>
        
        <div className="flex items-center justify-center mb-8">
          <img 
            src={`https:${weather.current.condition.icon}`}
            alt={weather.current.condition.text}
            className="w-24 h-24"
          />
          <span className="text-7xl font-bold ml-4">{Math.round(weather.current.temp_c)}°</span>
        </div>
        
        <p className="text-2xl font-semibold mb-8">{weather.current.condition.text}</p>
        
        <div className="grid grid-cols-2 gap-8 w-full">
          <div className="flex items-center">
            <Thermometer className="w-6 h-6 mr-2" />
            <div>
              <p className="text-base font-medium opacity-80">Feels Like</p>
              <p className="text-xl font-semibold">{Math.round(weather.current.feelslike_c)}°</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Wind className="w-6 h-6 mr-2" />
            <div>
              <p className="text-base font-medium opacity-80">Wind</p>
              <p className="text-xl font-semibold">{weather.current.wind_kph} km/h</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Droplets className="w-6 h-6 mr-2" />
            <div>
              <p className="text-base font-medium opacity-80">Humidity</p>
              <p className="text-xl font-semibold">{weather.current.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Cloud className="w-6 h-6 mr-2" />
            <div>
              <p className="text-base font-medium opacity-80">UV Index</p>
              <p className="text-xl font-semibold">{weather.current.uv}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};