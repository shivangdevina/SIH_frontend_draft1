import { useState } from 'react';
import { Search, Sun, Droplets, Wind, Thermometer, AlertTriangle } from 'lucide-react';

interface WeatherData {
  temperature: string;
  humidity: string;
  rainfall: string;
  windSpeed: string;
  condition: string;
}

const WeatherForecast = () => {
  const [location, setLocation] = useState('Springfield');
  const [weatherData] = useState<WeatherData>({
    temperature: '28°C',
    humidity: '75%',
    rainfall: '2mm',
    windSpeed: '15 km/h',
    condition: 'Partly Cloudy'
  });

  const weatherCards = [
    {
      title: 'Temperature',
      value: weatherData.temperature,
      icon: <Thermometer className="w-6 h-6 text-warning" />,
      description: 'Current temperature'
    },
    {
      title: 'Humidity',
      value: weatherData.humidity,
      icon: <Droplets className="w-6 h-6 text-primary" />,
      description: 'Relative humidity'
    },
    {
      title: 'Rainfall',
      value: weatherData.rainfall,
      icon: <Droplets className="w-6 h-6 text-blue-500" />,
      description: 'Last 24 hours'
    },
    {
      title: 'Wind Speed',
      value: weatherData.windSpeed,
      icon: <Wind className="w-6 h-6 text-muted-foreground" />,
      description: 'Current wind speed'
    }
  ];

  const forecast = [
    { day: 'Today', temp: '28°C', condition: 'Partly Cloudy', icon: '⛅' },
    { day: 'Tomorrow', temp: '30°C', condition: 'Sunny', icon: '☀️' },
    { day: 'Wed', temp: '26°C', condition: 'Light Rain', icon: '🌦️' },
    { day: 'Thu', temp: '25°C', condition: 'Heavy Rain', icon: '🌧️' },
    { day: 'Fri', temp: '27°C', condition: 'Cloudy', icon: '☁️' },
    { day: 'Sat', temp: '29°C', condition: 'Sunny', icon: '☀️' },
    { day: 'Sun', temp: '31°C', condition: 'Hot', icon: '🌡️' }
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Weather Forecasting
          </h1>
          <p className="text-lg text-muted-foreground">
            Get real-time weather updates and forecasts for your farm.
          </p>
        </div>

        {/* Location Search */}
        <div className="card-agricultural mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Search for a location (e.g., Springfield)"
                className="form-input-agricultural pl-12"
              />
            </div>
            <button className="btn-agricultural px-6 py-3 rounded-lg font-medium">
              Search
            </button>
          </div>
        </div>

        {/* Current Weather */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {weatherCards.map((card, index) => (
            <div key={index} className="card-agricultural text-center hover-lift">
              <div className="flex justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {card.title}
              </h3>
              <div className="text-2xl font-bold text-primary mb-2">
                {card.value}
              </div>
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* 7-Day Forecast */}
        <div className="card-agricultural mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">7-Day Forecast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {forecast.map((day, index) => (
              <div key={index} className="text-center p-4 rounded-lg border border-border hover:bg-muted transition-fast">
                <div className="text-sm font-medium text-foreground mb-2">
                  {day.day}
                </div>
                <div className="text-2xl mb-2">{day.icon}</div>
                <div className="text-lg font-semibold text-primary mb-1">
                  {day.temp}
                </div>
                <div className="text-xs text-muted-foreground">
                  {day.condition}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card-agricultural">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <h2 className="text-xl font-semibold text-foreground">Heavy Rain Alert</h2>
            </div>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-destructive font-medium mb-2">
                Weather Warning
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Expect heavy rainfall on Thursday with accumulations up to 50mm. 
                Take precautions to protect crops and ensure proper drainage. 
                Consider postponing field operations until conditions improve.
              </p>
            </div>
          </div>

          <div className="card-agricultural">
            <div className="flex items-center space-x-3 mb-4">
              <Sun className="w-6 h-6 text-warning" />
              <h2 className="text-xl font-semibold text-foreground">Farming Recommendations</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-sm text-muted-foreground">
                  Ideal conditions for harvesting on Friday and Saturday
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                <p className="text-sm text-muted-foreground">
                  High temperatures expected on Sunday - ensure adequate irrigation
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <p className="text-sm text-muted-foreground">
                  Perfect weather for pest monitoring activities today and tomorrow
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;