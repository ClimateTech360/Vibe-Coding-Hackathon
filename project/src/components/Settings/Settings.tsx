import React from 'react';
import CommunicationSettings from './CommunicationSettings';
import { mockData } from '../../data/mockData';

const Settings: React.FC = () => {
  const { communicationSettings } = mockData;
  
  const handleSaveSettings = (settings: any) => {
    console.log('Saving settings:', settings);
    // In a real app, this would call an API to save the settings
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600">Configure your reminder system settings</p>
      </div>
      
      <div className="space-y-6">
        <CommunicationSettings 
          settings={communicationSettings} 
          onSave={handleSaveSettings} 
        />
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Data Privacy & Compliance</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <h3 className="text-md font-medium text-blue-800 mb-2">HIPAA Compliance (US)</h3>
              <p className="text-sm text-blue-700">
                This system is designed to help with HIPAA compliance. Remember that you need to:
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm text-blue-700 space-y-1">
                <li>Ensure all patient data is encrypted at rest and in transit</li>
                <li>Implement proper access controls and user permissions</li>
                <li>Maintain detailed logs of all access to patient information</li>
                <li>Obtain proper patient consent for electronic communications</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
              <h3 className="text-md font-medium text-purple-800 mb-2">GDPR Compliance (EU)</h3>
              <p className="text-sm text-purple-700">
                For clinics operating in or serving EU patients, ensure you:
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm text-purple-700 space-y-1">
                <li>Provide clear consent mechanisms for all communications</li>
                <li>Include unsubscribe options in all reminders</li>
                <li>Document your data processing activities</li>
                <li>Provide patients with access to their data</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
              <h3 className="text-md font-medium text-green-800 mb-2">Local Data Protection</h3>
              <p className="text-sm text-green-700">
                For clinics in developing countries:
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm text-green-700 space-y-1">
                <li>Store data locally when possible to comply with data sovereignty laws</li>
                <li>Implement offline backup procedures for intermittent connectivity</li>
                <li>Consider local telecommunications regulations for SMS and WhatsApp</li>
                <li>Ensure proper consent is obtained in the patient's preferred language</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;