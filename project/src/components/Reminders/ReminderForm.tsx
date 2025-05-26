import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { ReminderTemplate } from '../../types';

interface ReminderFormProps {
  template?: ReminderTemplate;
  onSave: (template: ReminderTemplate) => void;
  onCancel: () => void;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ template, onSave, onCancel }) => {
  const [name, setName] = useState(template?.name || '');
  const [channel, setChannel] = useState<'sms' | 'whatsapp' | 'email'>(template?.channel || 'sms');
  const [content, setContent] = useState(template?.content || '');
  const [language, setLanguage] = useState(template?.language || 'en');
  const [days, setDays] = useState(template?.timing?.days?.toString() || '1');
  const [hours, setHours] = useState(template?.timing?.hours?.toString() || '0');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Template name is required';
    }
    
    if (!content.trim()) {
      newErrors.content = 'Message content is required';
    }
    
    if (isNaN(Number(days)) || Number(days) < 0) {
      newErrors.days = 'Days must be a valid number (0 or greater)';
    }
    
    if (isNaN(Number(hours)) || Number(hours) < 0 || Number(hours) > 23) {
      newErrors.hours = 'Hours must be a valid number (0-23)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const newTemplate: ReminderTemplate = {
      id: template?.id || `template-${Date.now()}`,
      name,
      channel,
      content,
      language,
      timing: {
        days: Number(days),
        hours: Number(hours)
      }
    };
    
    onSave(newTemplate);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Template Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="e.g., 1-Day Appointment Reminder"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {errors.name}
          </p>
        )}
      </div>
      
      <div>
        <label htmlFor="channel" className="block text-sm font-medium text-gray-700 mb-1">
          Communication Channel
        </label>
        <select
          id="channel"
          value={channel}
          onChange={(e) => setChannel(e.target.value as 'sms' | 'whatsapp' | 'email')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
        >
          <option value="sms">SMS</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="email">Email</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
          Language
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
        >
          <option value="en">English</option>
          <option value="sw">Swahili</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Message Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 ${
            errors.content ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Hello {{patient_name}}, this is a reminder of your appointment with Dr. {{doctor_name}} on {{appointment_date}} at {{appointment_time}}."
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {errors.content}
          </p>
        )}
        <div className="mt-2 text-xs text-gray-500">
          <p>Available variables:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>{'{{patient_name}}'} - Patient's full name</li>
            <li>{'{{doctor_name}}'} - Doctor's full name</li>
            <li>{'{{appointment_date}}'} - Formatted appointment date</li>
            <li>{'{{appointment_time}}'} - Formatted appointment time</li>
            <li>{'{{clinic_name}}'} - Name of the clinic</li>
            <li>{'{{clinic_phone}}'} - Clinic phone number</li>
          </ul>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-1">
            Days Before
          </label>
          <input
            type="number"
            id="days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            min="0"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 ${
              errors.days ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.days && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.days}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
            Hours Before
          </label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            min="0"
            max="23"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 ${
              errors.hours ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.hours && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.hours}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Save Template
        </button>
      </div>
    </form>
  );
};

export default ReminderForm;