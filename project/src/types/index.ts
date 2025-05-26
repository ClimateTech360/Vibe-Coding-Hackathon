export interface Patient {
  id: string;
  name: string;
  contactInfo: {
    phone: string;
    whatsapp?: string;
    email?: string;
  };
  preferredChannel: 'sms' | 'whatsapp' | 'email';
  language: string;
  lastAppointment?: string;
  nextAppointment?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  dateTime: string;
  status: 'scheduled' | 'confirmed' | 'missed' | 'completed' | 'cancelled' | 'rescheduled';
  type: string;
  notes?: string;
  followUp?: boolean;
  remindersSent: ReminderLog[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  contactInfo: {
    phone: string;
    email: string;
  };
  schedule: {
    [day: string]: {
      start: string;
      end: string;
    };
  };
}

export interface ReminderLog {
  id: string;
  appointmentId: string;
  patientId: string;
  timestamp: string;
  channel: 'sms' | 'whatsapp' | 'email';
  status: 'sent' | 'delivered' | 'failed' | 'responded';
  messageContent: string;
  response?: string;
}

export interface ReminderTemplate {
  id: string;
  name: string;
  channel: 'sms' | 'whatsapp' | 'email';
  content: string;
  language: string;
  timing: {
    days: number;
    hours?: number;
  };
}

export interface Clinic {
  id: string;
  name: string;
  location: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  operatingHours: {
    [day: string]: {
      start: string;
      end: string;
    };
  };
}

export interface AnalyticsData {
  missedAppointmentsRate: number;
  confirmationRate: number;
  remindersEffectiveness: number;
  mostEffectiveChannel: 'sms' | 'whatsapp' | 'email';
  appointmentsByDay: {
    [day: string]: number;
  };
  missedAppointmentsByReason?: {
    [reason: string]: number;
  };
}