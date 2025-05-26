import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} />
      
      <div className={`flex-1 transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="p-4 sm:p-6 lg:p-8 overflow-y-auto" style={{ height: 'calc(100vh - 72px)' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;