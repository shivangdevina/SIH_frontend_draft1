import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  Bug, 
  Droplets, 
  Leaf, 
  Recycle, 
  Thermometer,
  TrendingUp,
  MessageCircle,
  Newspaper
} from 'lucide-react';

const specialists = [
  { name: 'Crop Advisor', path: '/dashboard/crop-advisor', icon: Leaf, avatar: '🌱' },
  { name: 'Pest & Disease Expert', path: '/dashboard/pest-expert', icon: Bug, avatar: '🐛' },
  { name: 'Irrigation Planner', path: '/dashboard/irrigation-planner', icon: Droplets, avatar: '💧' },
  { name: 'Soil & Fertilizer Guide', path: '/dashboard/fertilizer-guide', icon: Recycle, avatar: '🌿' },
  { name: 'Weather Forecast', path: '/dashboard/weather-forecast', icon: Thermometer, avatar: '🌤️' },
  { name: 'Market Analyst', path: '/dashboard/market-analyst', icon: TrendingUp, avatar: '📈' },
];

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = '' }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-agricultural rounded-lg flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <h1 className="text-xl font-bold text-sidebar-foreground">AgriBot</h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-sidebar-accent transition-fast"
          >
            <X className="w-5 h-5 text-sidebar-foreground" />
          </button>
        </div>
      </div>

      {/* All Specialists */}
      <div className="flex-1 px-4 py-6">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-sidebar-foreground mb-4 px-2">All Specialists</h2>
          <nav className="space-y-1">
            {specialists.map((specialist) => {
              const isActive = location.pathname === specialist.path;
              return (
                <Link
                  key={specialist.name}
                  to={specialist.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-fast hover:bg-sidebar-accent group ${
                    isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-sm' : 'text-sidebar-foreground'
                  }`}
                >
                  <span className="text-2xl">{specialist.avatar}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isActive ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground'}`}>
                      {specialist.name}
                    </p>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Chat History */}
        <div className="mb-6">
          <Link
            to="/dashboard/chat"
            onClick={() => setIsOpen(false)}
            className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-fast hover:bg-sidebar-accent ${
              location.pathname === '/dashboard/chat' ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Chat History</span>
          </Link>
        </div>
      </div>

      {/* Agricultural News */}
      <div className="p-4 border-t border-sidebar-border">
        <button className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-fast">
          <Newspaper className="w-5 h-5" />
          <span className="text-sm font-medium">Agricultural News</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-primary text-primary-foreground rounded-lg shadow-agricultural"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative lg:translate-x-0 inset-y-0 left-0 w-80 z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:w-80 ${className}`}
      >
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;