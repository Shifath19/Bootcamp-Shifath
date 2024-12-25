import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WeatherCard } from './components/WeatherCard';
import { Search } from 'lucide-react';
import type { WeatherData } from './types/weather';

function App() {
  const YOUR_API_KEY = '5cef25b8bcc944fab10164101242512'
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('London');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchWeather = async (searchCity: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${YOUR_API_KEY}&q=${searchCity}&days=3`
      );
      setWeather(response.data);
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div 
      className="min-h-screen w-full bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-md mb-8">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className="w-full px-4 py-3 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
        </form>
      </div>

      {loading && (
        <div className="text-white text-xl">Loading...</div>
      )}

      {error && (
        <div className="text-red-200 bg-red-500/20 backdrop-blur-md px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {weather && !loading && !error && (
        <WeatherCard weather={weather} />
      )}
    </div>
  );
}

export default App;