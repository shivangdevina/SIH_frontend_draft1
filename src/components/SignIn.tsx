import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundAnimation from './BackgroundAnimation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Mock authentication delay
    setTimeout(() => {
      localStorage.setItem('agribot_token', 'mock_token_12345');
      localStorage.setItem('agribot_user', JSON.stringify({
        email,
        name: 'Demo User',
        role: 'Farmer'
      }));
      navigate('/dashboard/fertilizer-guide');
    }, 1000);
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
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to continue to AgriBot</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email ID
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input-agricultural"
                required
              />
              <div className="text-right mt-2">
                <a href="#" className="text-sm text-primary hover:text-primary-hover transition-fast">
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-agricultural py-3 rounded-lg font-medium text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:text-primary-hover transition-fast font-medium">
                Sign Up
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

export default SignIn;