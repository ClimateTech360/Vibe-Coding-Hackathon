import React from 'react';
import UpcomingAppointments from './UpcomingAppointments';
import ReminderStats from './ReminderStats';
import ChannelPerformance from './ChannelPerformance';
import { mockData } from '../../data/mockData';

const Dashboard: React.FC = () => {
  const { appointments, reminderStats, channelPerformance } = mockData;
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Overview of your clinic's appointment reminders</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UpcomingAppointments appointments={appointments} />
        </div>
        <div>
          <ReminderStats stats={reminderStats} />
        </div>
      </div>
      
      <div className="mt-6">
        <ChannelPerformance data={channelPerformance} />
      </div>
    </div>
  );
};

export default Dashboard;