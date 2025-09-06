import { Link } from 'react-router-dom';
import BackgroundAnimation from './BackgroundAnimation';

const features = [
  {
    icon: '🐛',
    title: 'Pest Control',
    description: 'AI-powered pest identification and organic treatment recommendations for healthier crops.'
  },
  {
    icon: '💧',
    title: 'Smart Irrigation',
    description: 'Optimize water usage with intelligent irrigation scheduling and soil moisture monitoring.'
  },
  {
    icon: '🌱',
    title: 'Crop Selection',
    description: 'Get personalized crop recommendations based on soil conditions and climate data.'
  },
  {
    icon: '♻️',
    title: 'Soil Health',
    description: 'Comprehensive soil analysis and fertilizer recommendations for maximum yield.'
  },
  {
    icon: '🌤️',
    title: 'Weather Forecast',
    description: 'Real-time weather updates and agricultural forecasts to plan your farming activities.'
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen relative">
      <BackgroundAnimation />
      
      {/* Navigation */}
      <nav className="relative z-10 container-agricultural py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-agricultural rounded-lg flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <h1 className="text-2xl font-bold text-foreground">AgriBot</h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/signin" className="text-foreground hover:text-primary transition-fast">
              Sign In
            </Link>
            <Link 
              to="/signin" 
              className="btn-agricultural px-6 py-2 rounded-lg font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 hero-gradient py-20 lg:py-32">
        <div className="container-agricultural text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Welcome to <span className="text-primary">AgriBot</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Your AI-powered partner for smarter farming. Get expert advice on crop management, 
            pest control, irrigation, and market analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/signin" 
              className="btn-agricultural px-8 py-4 rounded-lg font-semibold text-lg hover-lift w-full sm:w-auto"
            >
              Get Started
            </Link>
            <button className="btn-agricultural-outline px-8 py-4 rounded-lg font-semibold text-lg hover-lift w-full sm:w-auto">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 bg-background">
        <div className="container-agricultural">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Empowering Your Farm with AI
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Harness the power of artificial intelligence to make informed decisions 
              and optimize your farming operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="card-agricultural hover-lift text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 bg-gradient-agricultural">
        <div className="container-agricultural text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using AgriBot to increase yields 
            and optimize their farming operations.
          </p>
          <Link 
            to="/signup" 
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover-lift transition-smooth"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-foreground text-white py-16">
        <div className="container-agricultural">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-agricultural rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <h3 className="text-2xl font-bold">AgriBot</h3>
              </div>
              <p className="text-white/80 leading-relaxed">
                Empowering farmers with AI-driven insights for sustainable and profitable agriculture.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-fast">About Us</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-fast">Careers</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-fast">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-fast">Knowledge Hub</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-fast">Community</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-fast">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
            <p>&copy; 2024 AgriBot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;