import React from 'react';
import { MessageSquare, Mail, Phone } from 'lucide-react';

interface ChannelPerformanceProps {
  data: {
    sms: {
      sent: number;
      delivered: number;
      responded: number;
      effectiveness: number;
    };
    whatsapp: {
      sent: number;
      delivered: number;
      responded: number;
      effectiveness: number;
    };
    email: {
      sent: number;
      delivered: number;
      responded: number;
      effectiveness: number;
    };
  };
}

const ChannelPerformance: React.FC<ChannelPerformanceProps> = ({ data }) => {
  const channels = [
    { 
      name: 'SMS', 
      icon: <Phone size={20} />, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-100',
      data: data.sms 
    },
    { 
      name: 'WhatsApp', 
      icon: <MessageSquare size={20} />, 
      color: 'text-green-600', 
      bgColor: 'bg-green-100',
      data: data.whatsapp 
    },
    { 
      name: 'Email', 
      icon: <Mail size={20} />, 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-100',
      data: data.email 
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Channel Performance</h2>
      
      <div className="space-y-6">
        {channels.map((channel) => (
          <div key={channel.name} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
            <div className="flex items-center mb-2">
              <div className={`p-2 rounded-full ${channel.bgColor} ${channel.color} mr-2`}>
                {channel.icon}
              </div>
              <h3 className="font-medium text-gray-900">{channel.name}</h3>
              <div className="ml-auto text-xs font-medium text-gray-500">
                {channel.data.effectiveness}% effective
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-3">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Sent</p>
                <p className="font-semibold text-gray-800">{channel.data.sent}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Delivered</p>
                <p className="font-semibold text-gray-800">{channel.data.delivered}</p>
                <p className="text-xs text-gray-400">
                  {Math.round((channel.data.delivered / channel.data.sent) * 100)}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1">Responded</p>
                <p className="font-semibold text-gray-800">{channel.data.responded}</p>
                <p className="text-xs text-gray-400">
                  {Math.round((channel.data.responded / channel.data.delivered) * 100)}%
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    channel.name === 'SMS' ? 'bg-blue-500' : 
                    channel.name === 'WhatsApp' ? 'bg-green-500' : 'bg-yellow-500'
                  }`} 
                  style={{ width: `${channel.data.effectiveness}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPerformance;