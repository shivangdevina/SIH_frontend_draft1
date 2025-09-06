import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundAnimation from './BackgroundAnimation';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Farmer'
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Mock signup delay
    setTimeout(() => {
      localStorage.setItem('agribot_token', 'mock_token_12345');
      localStorage.setItem('agribot_user', JSON.stringify({
        email: formData.email,
        name: formData.name,
        role: formData.role
      }));
      navigate('/dashboard/fertilizer-guide');
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <BackgroundAnimation />
      
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="card-agricultural">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-agricultural rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              A
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to AgriBot</h1>
            <p className="text-muted-foreground">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="form-input-agricultural"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email ID
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="form-input-agricultural"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a strong password"
                className="form-input-agricultural"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-foreground mb-2">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="form-select-agricultural"
              >
                <option value="Farmer">Farmer</option>
                <option value="Agricultural Specialist">Agricultural Specialist</option>
                <option value="Farm Manager">Farm Manager</option>
                <option value="Researcher">Researcher</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-agricultural py-3 rounded-lg font-medium text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/signin" className="text-primary hover:text-primary-hover transition-fast font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-foreground transition-fast text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;