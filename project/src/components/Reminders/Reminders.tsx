import React from 'react';
import ReminderTemplates from './ReminderTemplates';
import { mockData } from '../../data/mockData';

const Reminders: React.FC = () => {
  const { reminderTemplates } = mockData;
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reminder Management</h1>
        <p className="text-gray-600">Create and manage your appointment reminder templates</p>
      </div>
      
      <div className="space-y-6">
        <ReminderTemplates templates={reminderTemplates} />
      </div>
    </div>
  );
};

export default Reminders;