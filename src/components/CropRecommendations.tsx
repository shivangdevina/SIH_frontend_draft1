import { useState } from 'react';
import { Leaf, TrendingUp, Droplets, Thermometer } from 'lucide-react';

interface FormData {
  temperature: string;
  humidity: string;
  rainfall: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  soilPh: string;
  soilType: string;
  season: string;
}

interface CropRecommendation {
  name: string;
  yield: string;
  description: string;
  suitability: number;
  icon: string;
}

const CropRecommendations = () => {
  const [formData, setFormData] = useState<FormData>({
    temperature: '25',
    humidity: '70',
    rainfall: '150',
    nitrogen: '5.5',
    phosphorus: '3.2',
    potassium: '4.1',
    soilPh: '6.5',
    soilType: 'Loamy',
    season: 'Summer'
  });
  const [showRecommendations, setShowRecommendations] = useState(false);

  const mockRecommendations: CropRecommendation[] = [
    {
      name: 'Rice',
      yield: '5 tons/hectare',
      description: 'Excellent choice for your soil conditions. High water requirement makes it perfect for the current rainfall levels.',
      suitability: 95,
      icon: '🌾'
    },
    {
      name: 'Wheat',
      yield: '3 tons/hectare',
      description: 'Good adaptation to your climate conditions. Moderate water requirements and excellent market demand.',
      suitability: 82,
      icon: '🌾'
    },
    {
      name: 'Corn',
      yield: '4 tons/hectare',
      description: 'Strong performer in your soil type. Responds well to the available nutrient levels and temperature range.',
      suitability: 88,
      icon: '🌽'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleGetRecommendations = () => {
    setShowRecommendations(true);
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            AI Crop Recommendations
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter your farm conditions below for tailored crop recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2">
            <div className="card-agricultural">
              <h2 className="text-xl font-semibold text-foreground mb-6">Farm Conditions</h2>
              
              {/* Climate Conditions */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <Thermometer className="w-5 h-5 mr-2 text-primary" />
                  Climate Data
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Temperature (°C)
                    </label>
                    <input
                      type="number"
                      name="temperature"
                      value={formData.temperature}
                      onChange={handleInputChange}
                      className="form-input-agricultural"
                      placeholder="25"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Humidity (%)
                    </label>
                    <input
                      type="number"
                      name="humidity"
                      value={formData.humidity}
                      onChange={handleInputChange}
                      className="form-input-agricultural"
                      placeholder="70"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Rainfall (mm)
                    </label>
                    <input
                      type="number"
                      name="rainfall"
                      value={formData.rainfall}
                      onChange={handleInputChange}
                      className="form-input-agricultural"
                      placeholder="150"
                    />
                  </div>
                </div>
              </div>

              {/* Soil Conditions */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-foreground mb-4 flex items-center">
                  <Leaf className="w-5 h-5 mr-2 text-primary" />
                  Soil Analysis
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      N Level
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="nitrogen"
                      value={formData.nitrogen}
                      onChange={handleInputChange}
                      className="form-input-agricultural"
                      placeholder="5.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      P Level
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="phosphorus"
                      value={formData.phosphorus}
                      onChange={handleInputChange}
                      className="form-input-agricultural"
                      placeholder="3.2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      K Level
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="potassium"
                      value={formData.potassium}
                      onChange={handleInputChange}
                      className="form-input-agricultural"
                      placeholder="4.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Soil pH
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="soilPh"
                      value={formData.soilPh}
                      onChange={handleInputChange}
                      className="form-input-agricultural"
                      placeholder="6.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Soil Type
                    </label>
                    <select
                      name="soilType"
                      value={formData.soilType}
                      onChange={handleInputChange}
                      className="form-select-agricultural"
                    >
                      <option value="Clay">Clay</option>
                      <option value="Loamy">Loamy</option>
                      <option value="Sandy">Sandy</option>
                      <option value="Silt">Silt</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Select Season
                    </label>
                    <select
                      name="season"
                      value={formData.season}
                      onChange={handleInputChange}
                      className="form-select-agricultural"
                    >
                      <option value="Spring">Spring</option>
                      <option value="Summer">Summer</option>
                      <option value="Autumn">Autumn</option>
                      <option value="Winter">Winter</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={handleGetRecommendations}
                className="btn-agricultural px-8 py-3 rounded-lg font-medium hover-lift"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Get Recommendations
              </button>
            </div>
          </div>

          {/* Recommendations */}
          <div className="lg:col-span-1">
            {showRecommendations ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">Recommended Crops</h2>
                
                {mockRecommendations.map((crop, index) => (
                  <div key={index} className="card-agricultural hover-lift">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{crop.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{crop.name}</h3>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            crop.suitability >= 90 ? 'bg-success/20 text-success' :
                            crop.suitability >= 80 ? 'bg-warning/20 text-warning' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {crop.suitability}% match
                          </div>
                        </div>
                        <div className="text-sm font-medium text-primary mb-2">
                          Expected Yield: {crop.yield}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {crop.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="card-agricultural">
                  <h3 className="font-semibold text-foreground mb-3">Growing Tips</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Test soil before planting</li>
                    <li>• Monitor weather conditions</li>
                    <li>• Use quality seeds</li>
                    <li>• Follow proper spacing guidelines</li>
                    <li>• Plan irrigation schedule</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="card-agricultural text-center">
                <div className="text-muted-foreground mb-4">
                  <Leaf className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p>Enter your farm conditions and climate data to receive AI-powered crop recommendations tailored to your specific situation.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropRecommendations;