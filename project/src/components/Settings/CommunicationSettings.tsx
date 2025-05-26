import React, { useState } from 'react';
import { Settings, AlertCircle, Save } from 'lucide-react';

interface CommunicationSettingsProps {
  settings: {
    sms: {
      enabled: boolean;
      provider: string;
      apiKey: string;
      fromNumber: string;
    };
    whatsapp: {
      enabled: boolean;
      provider: string;
      apiKey: string;
      fromNumber: string;
    };
    email: {
      enabled: boolean;
      provider: string;
      apiKey: string;
      fromEmail: string;
      smtpHost?: string;
      smtpPort?: number;
      smtpUser?: string;
      smtpPassword?: string;
    };
  };
  onSave: (settings: any) => void;
}

const CommunicationSettings: React.FC<CommunicationSettingsProps> = ({ settings: initialSettings, onSave }) => {
  const [settings, setSettings] = useState(initialSettings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  
  const handleChange = (channel: 'sms' | 'whatsapp' | 'email', field: string, value: any) => {
    setSettings({
      ...settings,
      [channel]: {
        ...settings[channel],
        [field]: value
      }
    });
    setSavedSuccess(false);
  };
  
  const handleToggle = (channel: 'sms' | 'whatsapp' | 'email') => {
    setSettings({
      ...settings,
      [channel]: {
        ...settings[channel],
        enabled: !settings[channel].enabled
      }
    });
    setSavedSuccess(false);
  };
  
  const handleSaveSettings = () => {
    onSave(settings);
    setSavedSuccess(true);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <Settings size={20} className="text-cyan-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Communication Settings</h2>
        </div>
      </div>
      
      <div className="p-6 space-y-8">
        {/* SMS Settings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-medium text-gray-900">SMS Configuration</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.sms.enabled} 
                onChange={() => handleToggle('sms')} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              <span className="ml-2 text-sm font-medium text-gray-900">
                {settings.sms.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${settings.sms.enabled ? '' : 'opacity-50 pointer-events-none'}`}>
            <div>
              <label htmlFor="sms-provider" className="block text-sm font-medium text-gray-700 mb-1">
                SMS Provider
              </label>
              <select
                id="sms-provider"
                value={settings.sms.provider}
                onChange={(e) => handleChange('sms', 'provider', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                disabled={!settings.sms.enabled}
              >
                <option value="twilio">Twilio</option>
                <option value="africas-talking">Africa's Talking</option>
                <option value="infobip">Infobip</option>
                <option value="messagebird">MessageBird</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="sms-api-key" className="block text-sm font-medium text-gray-700 mb-1">
                API Key / Token
              </label>
              <input
                type="password"
                id="sms-api-key"
                value={settings.sms.apiKey}
                onChange={(e) => handleChange('sms', 'apiKey', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter your API key"
                disabled={!settings.sms.enabled}
              />
            </div>
            
            <div>
              <label htmlFor="sms-from-number" className="block text-sm font-medium text-gray-700 mb-1">
                From Number
              </label>
              <input
                type="text"
                id="sms-from-number"
                value={settings.sms.fromNumber}
                onChange={(e) => handleChange('sms', 'fromNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="+1234567890"
                disabled={!settings.sms.enabled}
              />
              <p className="mt-1 text-xs text-gray-500">
                Include country code (e.g., +254 for Kenya)
              </p>
            </div>
          </div>
        </div>
        
        {/* WhatsApp Settings */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-medium text-gray-900">WhatsApp Configuration</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.whatsapp.enabled} 
                onChange={() => handleToggle('whatsapp')} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              <span className="ml-2 text-sm font-medium text-gray-900">
                {settings.whatsapp.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${settings.whatsapp.enabled ? '' : 'opacity-50 pointer-events-none'}`}>
            <div>
              <label htmlFor="whatsapp-provider" className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Provider
              </label>
              <select
                id="whatsapp-provider"
                value={settings.whatsapp.provider}
                onChange={(e) => handleChange('whatsapp', 'provider', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                disabled={!settings.whatsapp.enabled}
              >
                <option value="twilio">Twilio</option>
                <option value="360dialog">360dialog</option>
                <option value="messagebird">MessageBird</option>
                <option value="infobip">Infobip</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="whatsapp-api-key" className="block text-sm font-medium text-gray-700 mb-1">
                API Key / Token
              </label>
              <input
                type="password"
                id="whatsapp-api-key"
                value={settings.whatsapp.apiKey}
                onChange={(e) => handleChange('whatsapp', 'apiKey', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter your API key"
                disabled={!settings.whatsapp.enabled}
              />
            </div>
            
            <div>
              <label htmlFor="whatsapp-from-number" className="block text-sm font-medium text-gray-700 mb-1">
                From Number
              </label>
              <input
                type="text"
                id="whatsapp-from-number"
                value={settings.whatsapp.fromNumber}
                onChange={(e) => handleChange('whatsapp', 'fromNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="+1234567890"
                disabled={!settings.whatsapp.enabled}
              />
              <p className="mt-1 text-xs text-gray-500">
                Must be a verified WhatsApp Business number
              </p>
            </div>
          </div>
        </div>
        
        {/* Email Settings */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-medium text-gray-900">Email Configuration</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.email.enabled} 
                onChange={() => handleToggle('email')} 
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
              <span className="ml-2 text-sm font-medium text-gray-900">
                {settings.email.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          </div>
          
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${settings.email.enabled ? '' : 'opacity-50 pointer-events-none'}`}>
            <div>
              <label htmlFor="email-provider" className="block text-sm font-medium text-gray-700 mb-1">
                Email Provider
              </label>
              <select
                id="email-provider"
                value={settings.email.provider}
                onChange={(e) => handleChange('email', 'provider', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                disabled={!settings.email.enabled}
              >
                <option value="smtp">SMTP Server</option>
                <option value="sendgrid">SendGrid</option>
                <option value="mailgun">Mailgun</option>
                <option value="ses">Amazon SES</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="email-from" className="block text-sm font-medium text-gray-700 mb-1">
                From Email
              </label>
              <input
                type="email"
                id="email-from"
                value={settings.email.fromEmail}
                onChange={(e) => handleChange('email', 'fromEmail', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="noreply@yourclinic.com"
                disabled={!settings.email.enabled}
              />
            </div>
            
            {settings.email.provider === 'smtp' ? (
              <>
                <div>
                  <label htmlFor="smtp-host" className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    id="smtp-host"
                    value={settings.email.smtpHost || ''}
                    onChange={(e) => handleChange('email', 'smtpHost', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="smtp.example.com"
                    disabled={!settings.email.enabled}
                  />
                </div>
                
                <div>
                  <label htmlFor="smtp-port" className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Port
                  </label>
                  <input
                    type="number"
                    id="smtp-port"
                    value={settings.email.smtpPort || 587}
                    onChange={(e) => handleChange('email', 'smtpPort', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="587"
                    disabled={!settings.email.enabled}
                  />
                </div>
                
                <div>
                  <label htmlFor="smtp-user" className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Username
                  </label>
                  <input
                    type="text"
                    id="smtp-user"
                    value={settings.email.smtpUser || ''}
                    onChange={(e) => handleChange('email', 'smtpUser', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="username"
                    disabled={!settings.email.enabled}
                  />
                </div>
                
                <div>
                  <label htmlFor="smtp-password" className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Password
                  </label>
                  <input
                    type="password"
                    id="smtp-password"
                    value={settings.email.smtpPassword || ''}
                    onChange={(e) => handleChange('email', 'smtpPassword', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="••••••••"
                    disabled={!settings.email.enabled}
                  />
                </div>
              </>
            ) : (
              <div className="md:col-span-2">
                <label htmlFor="email-api-key" className="block text-sm font-medium text-gray-700 mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  id="email-api-key"
                  value={settings.email.apiKey}
                  onChange={(e) => handleChange('email', 'apiKey', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="Enter your API key"
                  disabled={!settings.email.enabled}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between rounded-b-lg">
        {savedSuccess && (
          <div className="flex items-center text-green-700 text-sm">
            <CheckCircle size={16} className="mr-1" />
            Settings saved successfully!
          </div>
        )}
        <div className="text-sm text-gray-500">
          <AlertCircle size={16} className="inline-block mr-1" />
          API keys are encrypted and stored securely
        </div>
        <button
          onClick={handleSaveSettings}
          className="px-4 py-2 bg-cyan-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 flex items-center"
        >
          <Save size={16} className="mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
};

// Add missing component
const CheckCircle = ({ size, className }: { size: number, className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
};

export default CommunicationSettings;