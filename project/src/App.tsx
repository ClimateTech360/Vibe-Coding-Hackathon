import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Reminders from './components/Reminders/Reminders';
import Settings from './components/Settings/Settings';
import { NavigationProvider, useNavigate } from './components/Navigation/NavigationContext';

const AppContent: React.FC = () => {
  const { currentPath } = useNavigate();
  
  const renderContent = () => {
    switch (currentPath) {
      case '/':
        return <Dashboard />;
      case '/reminders':
        return <Reminders />;
      case '/settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;