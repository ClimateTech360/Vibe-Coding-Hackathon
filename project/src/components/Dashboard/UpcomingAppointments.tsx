import React from 'react';
import { Calendar, Clock, RefreshCw } from 'lucide-react';
import { Appointment, Patient, Doctor } from '../../types';

interface UpcomingAppointmentsProps {
  appointments: Array<Appointment & { patient: Patient; doctor: Doctor }>;
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({ appointments }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h2>
        <button className="text-cyan-600 hover:text-cyan-800 flex items-center text-sm font-medium">
          <RefreshCw size={16} className="mr-1" />
          Refresh
        </button>
      </div>
      
      <div className="overflow-hidden">
        {appointments.length === 0 ? (
          <div className="text-center py-8">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No upcoming appointments</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => {
              const appointmentDate = new Date(appointment.dateTime);
              const today = new Date();
              const tomorrow = new Date(today);
              tomorrow.setDate(tomorrow.getDate() + 1);
              
              const isToday = appointmentDate.toDateString() === today.toDateString();
              const isTomorrow = appointmentDate.toDateString() === tomorrow.toDateString();
              
              let dateLabel = appointmentDate.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              });
              
              if (isToday) dateLabel = 'Today';
              if (isTomorrow) dateLabel = 'Tomorrow';
              
              const timeLabel = appointmentDate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true
              });
              
              const statusColors = {
                scheduled: 'bg-blue-100 text-blue-800',
                confirmed: 'bg-green-100 text-green-800',
                missed: 'bg-red-100 text-red-800',
                completed: 'bg-gray-100 text-gray-800',
                cancelled: 'bg-red-100 text-red-800',
                rescheduled: 'bg-yellow-100 text-yellow-800'
              };
              
              return (
                <div key={appointment.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex justify-between items-start">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0 bg-cyan-100 rounded-full p-2 w-10 h-10 flex items-center justify-center">
                        {appointment.patient.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{appointment.patient.name}</h3>
                        <p className="text-sm text-gray-500">{appointment.type}</p>
                      </div>
                    </div>
                    <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[appointment.status]}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-1.5 text-gray-400" />
                    <span className="mr-4">{dateLabel}</span>
                    <Clock size={16} className="mr-1.5 text-gray-400" />
                    <span>{timeLabel}</span>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Dr. {appointment.doctor.name} • {appointment.doctor.specialty}
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-xs rounded-md bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors">
                        Send Reminder
                      </button>
                      <button className="px-3 py-1 text-xs rounded-md bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors">
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {appointments.length > 0 && (
        <div className="mt-6 text-center">
          <button className="text-cyan-600 hover:text-cyan-800 text-sm font-medium">
            View All Appointments
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;