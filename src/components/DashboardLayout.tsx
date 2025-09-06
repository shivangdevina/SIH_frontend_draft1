import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BackgroundAnimation from './BackgroundAnimation';

const DashboardLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('agribot_token');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex bg-background relative">
      <BackgroundAnimation />
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-0 relative z-10">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;