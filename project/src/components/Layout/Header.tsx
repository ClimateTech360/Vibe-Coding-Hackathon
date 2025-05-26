import React from 'react';
import { Menu, Bell, Settings, Calendar, User } from 'lucide-react';
import { useNavigate } from '../Navigation/NavigationContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { navigate } = useNavigate();
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-700 md:hidden"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center ml-4 md:ml-0">
            <div className="bg-cyan-700 text-white p-2 rounded-md">
              <Calendar size={20} />
            </div>
            <h1 className="ml-2 text-xl font-semibold text-gray-800">HealthRemind</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-700 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button 
            onClick={() => navigate('/settings')}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-700"
          >
            <Settings size={20} />
          </button>
          
          <div className="flex items-center ml-4 cursor-pointer" onClick={() => navigate('/profile')}>
            <div className="bg-cyan-100 text-cyan-700 p-1.5 rounded-full">
              <User size={18} />
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">Dr. Sarah Kimani</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;