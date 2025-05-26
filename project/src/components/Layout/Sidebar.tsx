import React from 'react';
import { Home, Calendar, Users, MessageCircle, BarChart2, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from '../Navigation/NavigationContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { currentPath, navigate } = useNavigate();

  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Calendar size={20} />, label: 'Appointments', path: '/appointments' },
    { icon: <Users size={20} />, label: 'Patients', path: '/patients' },
    { icon: <MessageCircle size={20} />, label: 'Reminders', path: '/reminders' },
    { icon: <BarChart2 size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' }
  ];

  return (
    <aside 
      className={`bg-cyan-800 text-white fixed h-full transition-all duration-300 ease-in-out z-20 
      ${isOpen ? 'w-64 left-0' : 'w-64 -left-64 md:left-0 md:w-20'}`}
    >
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className={`flex items-center ${!isOpen && 'md:justify-center'}`}>
            <Calendar className="text-white" size={24} />
            <h2 className={`ml-2 font-bold text-xl ${!isOpen && 'md:hidden'}`}>HealthRemind</h2>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto">
          <ul className="px-4 py-2">
            {navItems.map((item) => (
              <li key={item.path} className="mb-2">
                <button
                  onClick={() => navigate(item.path)}
                  className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200
                  ${currentPath === item.path 
                    ? 'bg-cyan-700 text-white' 
                    : 'text-cyan-100 hover:bg-cyan-700 hover:text-white'}`}
                >
                  <div className={`${!isOpen && 'md:mx-auto'}`}>
                    {item.icon}
                  </div>
                  <span className={`ml-3 ${!isOpen && 'md:hidden'}`}>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-cyan-700">
          <div className="px-4 py-2">
            <button className="flex items-center w-full p-3 rounded-lg text-cyan-100 hover:bg-cyan-700 hover:text-white transition-colors duration-200">
              <div className={`${!isOpen && 'md:mx-auto'}`}>
                <HelpCircle size={20} />
              </div>
              <span className={`ml-3 ${!isOpen && 'md:hidden'}`}>Help & Support</span>
            </button>
            <button className="flex items-center w-full p-3 rounded-lg text-cyan-100 hover:bg-cyan-700 hover:text-white transition-colors duration-200">
              <div className={`${!isOpen && 'md:mx-auto'}`}>
                <LogOut size={20} />
              </div>
              <span className={`ml-3 ${!isOpen && 'md:hidden'}`}>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;