import React, { useState } from 'react';
import { Plus, MessageSquare, Mail, Phone, Edit, Trash2, Copy } from 'lucide-react';
import { ReminderTemplate } from '../../types';
import ReminderForm from './ReminderForm';

interface ReminderTemplatesProps {
  templates: ReminderTemplate[];
}

const ReminderTemplates: React.FC<ReminderTemplatesProps> = ({ templates: initialTemplates }) => {
  const [templates, setTemplates] = useState<ReminderTemplate[]>(initialTemplates);
  const [showForm, setShowForm] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<ReminderTemplate | undefined>(undefined);
  
  const handleAddNew = () => {
    setCurrentTemplate(undefined);
    setShowForm(true);
  };
  
  const handleEdit = (template: ReminderTemplate) => {
    setCurrentTemplate(template);
    setShowForm(true);
  };
  
  const handleDuplicate = (template: ReminderTemplate) => {
    const newTemplate = {
      ...template,
      id: `template-${Date.now()}`,
      name: `${template.name} (Copy)`
    };
    
    setTemplates([...templates, newTemplate]);
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(template => template.id !== id));
    }
  };
  
  const handleSave = (template: ReminderTemplate) => {
    if (currentTemplate) {
      setTemplates(templates.map(t => t.id === template.id ? template : t));
    } else {
      setTemplates([...templates, template]);
    }
    
    setShowForm(false);
  };
  
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'sms':
        return <Phone size={16} className="text-blue-600" />;
      case 'whatsapp':
        return <MessageSquare size={16} className="text-green-600" />;
      case 'email':
        return <Mail size={16} className="text-yellow-600" />;
      default:
        return null;
    }
  };
  
  const getTimingText = (days: number, hours?: number) => {
    const parts = [];
    
    if (days > 0) {
      parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    }
    
    if (hours && hours > 0) {
      parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    }
    
    return parts.join(' and ') + ' before';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Reminder Templates</h2>
          <button
            onClick={handleAddNew}
            className="px-3 py-1.5 bg-cyan-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 flex items-center"
          >
            <Plus size={16} className="mr-1" />
            Add New Template
          </button>
        </div>
      </div>
      
      {showForm ? (
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {currentTemplate ? 'Edit Template' : 'Create New Template'}
          </h3>
          <ReminderForm 
            template={currentTemplate} 
            onSave={handleSave} 
            onCancel={() => setShowForm(false)} 
          />
        </div>
      ) : (
        <>
          <div className="p-6">
            {templates.length === 0 ? (
              <div className="text-center py-8">
                <div className="bg-cyan-50 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MessageSquare size={28} className="text-cyan-600" />
                </div>
                <h3 className="text-gray-900 font-medium mb-1">No templates yet</h3>
                <p className="text-gray-500 mb-4">Create your first reminder template to get started</p>
                <button
                  onClick={handleAddNew}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 flex items-center mx-auto"
                >
                  <Plus size={16} className="mr-1" />
                  Create Template
                </button>
              </div>
            ) : (
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Template Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Channel
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Language
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timing
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {templates.map((template) => (
                      <tr key={template.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{template.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            {getChannelIcon(template.channel)}
                            <span className="ml-1 capitalize">{template.channel}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {template.language === 'en' ? 'English' : 
                             template.language === 'sw' ? 'Swahili' : 
                             template.language === 'hi' ? 'Hindi' : 'Spanish'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {getTimingText(template.timing.days, template.timing.hours)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(template)}
                              className="text-cyan-600 hover:text-cyan-900"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDuplicate(template)}
                              className="text-gray-600 hover:text-gray-900"
                              title="Duplicate"
                            >
                              <Copy size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(template.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ReminderTemplates;