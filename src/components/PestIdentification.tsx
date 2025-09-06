import { useState } from 'react';
import { Upload, Camera, CheckCircle, AlertCircle } from 'lucide-react';

interface PestPrediction {
  name: string;
  confidence: number;
  description: string;
  solutions: string[];
}

const PestIdentification = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cropType, setCropType] = useState('Tomato');
  const [description, setDescription] = useState('');
  const [showPrediction, setShowPrediction] = useState(false);

  const mockPrediction: PestPrediction = {
    name: 'Tomato Hornworm',
    confidence: 95,
    description: 'A large green caterpillar that feeds on tomato plants, causing significant damage to leaves and fruit.',
    solutions: [
      'Manual Removal: Hand-pick hornworms from plants during morning inspections',
      'Natural Predators: Encourage beneficial insects like parasitic wasps',
      'Organic Pesticide: Apply Bt (Bacillus thuringiensis) spray in the evening',
      'Preventative Measures: Regular plant inspection and companion planting with basil'
    ]
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleIdentifyPest = () => {
    if (selectedFile) {
      setShowPrediction(true);
    } else {
      alert('Please upload an image first');
    }
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pest Identification
          </h1>
          <p className="text-lg text-muted-foreground">
            Identify pests from an image and get instant remedies from our AI expert.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div className="card-agricultural">
              <h2 className="text-xl font-semibold text-foreground mb-6">Upload Pest Image</h2>
              
              {/* File Upload Area */}
              <div className="mb-6">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-fast">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="pest-upload"
                  />
                  <label htmlFor="pest-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium text-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      PNG, JPG up to 10MB
                    </p>
                    {selectedFile && (
                      <div className="inline-flex items-center space-x-2 bg-primary-light px-4 py-2 rounded-lg">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">
                          {selectedFile.name}
                        </span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Select Crop Type (Optional)
                  </label>
                  <select
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                    className="form-select-agricultural"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Corn">Corn</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Rice">Rice</option>
                    <option value="Soybean">Soybean</option>
                    <option value="Potato">Potato</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the symptoms you're observing on your crops..."
                  rows={4}
                  className="form-input-agricultural resize-none"
                />
              </div>

              <button
                onClick={handleIdentifyPest}
                className="btn-agricultural px-8 py-3 rounded-lg font-medium hover-lift"
              >
                <Camera className="w-5 h-5 mr-2" />
                Identify Pest
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1">
            {showPrediction ? (
              <div className="space-y-6">
                {/* Prediction Result */}
                <div className="card-agricultural">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-success" />
                    <h2 className="text-xl font-semibold text-foreground">Prediction</h2>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">🐛</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {mockPrediction.name}
                    </h3>
                    <div className="inline-flex items-center space-x-2 bg-success/10 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm font-medium text-success">
                        {mockPrediction.confidence}% Confidence
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {mockPrediction.description}
                  </p>
                </div>

                {/* Solutions */}
                <div className="card-agricultural">
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Proposed Solutions</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {mockPrediction.solutions.map((solution, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground leading-relaxed">
                            {solution}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Tips */}
                <div className="card-agricultural">
                  <h3 className="font-semibold text-foreground mb-3">Prevention Tips</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Regular monitoring of plants</li>
                    <li>• Maintain proper plant spacing</li>
                    <li>• Remove infected plant debris</li>
                    <li>• Encourage beneficial insects</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="card-agricultural text-center">
                <div className="text-muted-foreground mb-4">
                  <Camera className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p>Upload an image of the pest or damaged crops to get instant AI identification and treatment recommendations.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestIdentification;