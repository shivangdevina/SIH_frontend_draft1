import { useState } from 'react';
import { Leaf, Target, AlertTriangle } from 'lucide-react';

interface FormData {
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  soilPh: string;
  soilType: string;
  cropType: string;
}

interface Recommendation {
  type: string;
  description: string;
  icon: React.ReactNode;
  dosage: string;
}

const FertilizerGuide = () => {
  const [formData, setFormData] = useState<FormData>({
    nitrogen: '50',
    phosphorus: '25',
    potassium: '30',
    soilPh: '6.5',
    soilType: 'Loamy',
    cropType: 'Corn'
  });
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleGetRecommendations = () => {
    setShowRecommendations(true);
  };

  const recommendations: Recommendation[] = [
    {
      type: 'Organic Fertilizer',
      description: 'Enrich your soil with composted manure at 10 tons/ha. This will improve soil structure, water retention, and provide slow-release nutrients for sustained crop growth.',
      icon: <Leaf className="w-6 h-6 text-success" />,
      dosage: '10 tons/ha'
    },
    {
      type: 'Chemical Fertilizer',
      description: 'Apply a 10-20-20 NPK blend at 200 kg/ha during planting. This balanced formula provides immediate nutrient availability for early growth stages.',
      icon: <Target className="w-6 h-6 text-primary" />,
      dosage: '200 kg/ha'
    },
    {
      type: 'Safety & Application Notes',
      description: 'Wear protective gear during application. Apply fertilizers during cool, calm weather conditions. Water thoroughly after application to prevent nutrient burn.',
      icon: <AlertTriangle className="w-6 h-6 text-warning" />,
      dosage: 'Follow guidelines'
    }
  ];

  return (
    <div className="min-h-screen pt-20 lg:pt-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Fertilizer Guide
          </h1>
          <p className="text-lg text-muted-foreground">
            Input your soil and crop data to receive tailored fertilizer recommendations from our AI specialist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2">
            <div className="card-agricultural">
              <h2 className="text-xl font-semibold text-foreground mb-6">Soil & Crop Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nitrogen (N) - kg/ha
                  </label>
                  <input
                    type="number"
                    name="nitrogen"
                    value={formData.nitrogen}
                    onChange={handleInputChange}
                    className="form-input-agricultural"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phosphorus (P) - kg/ha
                  </label>
                  <input
                    type="number"
                    name="phosphorus"
                    value={formData.phosphorus}
                    onChange={handleInputChange}
                    className="form-input-agricultural"
                    placeholder="25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Potassium (K) - kg/ha
                  </label>
                  <input
                    type="number"
                    name="potassium"
                    value={formData.potassium}
                    onChange={handleInputChange}
                    className="form-input-agricultural"
                    placeholder="30"
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
                    Select Crop
                  </label>
                  <select
                    name="cropType"
                    value={formData.cropType}
                    onChange={handleInputChange}
                    className="form-select-agricultural"
                  >
                    <option value="Corn">Corn</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Rice">Rice</option>
                    <option value="Soybean">Soybean</option>
                    <option value="Tomato">Tomato</option>
                    <option value="Potato">Potato</option>
                  </select>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleGetRecommendations}
                  className="btn-agricultural px-8 py-3 rounded-lg font-medium hover-lift"
                >
                  Get AI Recommendations
                </button>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="lg:col-span-1">
            {showRecommendations ? (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">AI Recommendations</h2>
                
                {recommendations.map((rec, index) => (
                  <div key={index} className="card-agricultural hover-lift">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {rec.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2">{rec.type}</h3>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          {rec.description}
                        </p>
                        <div className="text-sm font-medium text-primary">
                          Dosage: {rec.dosage}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-agricultural text-center">
                <div className="text-muted-foreground mb-4">
                  <Leaf className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p>Enter your soil and crop information, then click "Get AI Recommendations" to receive personalized fertilizer guidance.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FertilizerGuide;