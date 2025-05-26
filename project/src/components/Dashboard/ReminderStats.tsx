import React from 'react';
import { CheckCircle, AlertCircle, BarChart2 } from 'lucide-react';

interface ReminderStatsProps {
  stats: {
    sent: number;
    delivered: number;
    failed: number;
    responded: number;
    missedRate: number;
  };
}

const ReminderStats: React.FC<ReminderStatsProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Reminder Statistics</h2>
        <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
          Last 30 days
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-cyan-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-cyan-100 rounded-full">
              <CheckCircle size={20} className="text-cyan-700" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Reminders Sent</p>
              <h3 className="text-xl font-semibold text-gray-900">{stats.sent}</h3>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle size={20} className="text-green-700" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Response Rate</p>
              <h3 className="text-xl font-semibold text-gray-900">{Math.round((stats.responded / stats.delivered) * 100)}%</h3>
            </div>
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertCircle size={20} className="text-red-700" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Failed Reminders</p>
              <h3 className="text-xl font-semibold text-gray-900">{stats.failed}</h3>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-full">
              <AlertCircle size={20} className="text-yellow-700" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Missed Rate</p>
              <h3 className="text-xl font-semibold text-gray-900">{stats.missedRate}%</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-100 pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Reminder Effectiveness</h3>
        <div className="bg-gray-100 h-4 rounded-full overflow-hidden">
          <div className="bg-cyan-600 h-full" style={{ width: `${Math.round(100 - stats.missedRate)}%` }}></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>More effective</span>
          <span>Less effective</span>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button className="text-cyan-600 hover:text-cyan-800 flex items-center justify-center text-sm font-medium mx-auto">
          <BarChart2 size={16} className="mr-1" />
          View Detailed Analytics
        </button>
      </div>
    </div>
  );
};

export default ReminderStats;