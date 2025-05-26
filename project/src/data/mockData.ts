import { 
  Appointment, 
  Patient,
  Doctor,
  ReminderTemplate,
  ReminderLog
} from '../types';

// Generate some mock data for the application
const generateMockData = () => {
  // Mock doctors
  const doctors: Doctor[] = [
    {
      id: 'd1',
      name: 'Sarah Kimani',
      specialty: 'General Practitioner',
      contactInfo: {
        phone: '+254712345678',
        email: 'dr.kimani@healthremind.com'
      },
      schedule: {
        'Monday': { start: '08:00', end: '17:00' },
        'Tuesday': { start: '08:00', end: '17:00' },
        'Wednesday': { start: '08:00', end: '17:00' },
        'Thursday': { start: '08:00', end: '17:00' },
        'Friday': { start: '08:00', end: '15:00' }
      }
    },
    {
      id: 'd2',
      name: 'Raj Patel',
      specialty: 'Pediatrician',
      contactInfo: {
        phone: '+919876543210',
        email: 'dr.patel@healthremind.com'
      },
      schedule: {
        'Monday': { start: '09:00', end: '18:00' },
        'Tuesday': { start: '09:00', end: '18:00' },
        'Wednesday': { start: '09:00', end: '18:00' },
        'Thursday': { start: '09:00', end: '18:00' },
        'Saturday': { start: '10:00', end: '14:00' }
      }
    }
  ];

  // Mock patients
  const patients: Patient[] = [
    {
      id: 'p1',
      name: 'John Mwangi',
      contactInfo: {
        phone: '+254723456789',
        whatsapp: '+254723456789',
        email: 'john.m@example.com'
      },
      preferredChannel: 'whatsapp',
      language: 'en',
      lastAppointment: '2023-05-15T09:30:00',
      nextAppointment: '2023-06-15T10:00:00'
    },
    {
      id: 'p2',
      name: 'Priya Singh',
      contactInfo: {
        phone: '+919988776655',
        email: 'priya.s@example.com'
      },
      preferredChannel: 'sms',
      language: 'hi',
      lastAppointment: '2023-05-20T14:00:00',
      nextAppointment: '2023-06-03T14:30:00'
    },
    {
      id: 'p3',
      name: 'Fatima Hassan',
      contactInfo: {
        phone: '+254712345678',
        whatsapp: '+254712345678'
      },
      preferredChannel: 'whatsapp',
      language: 'sw',
      lastAppointment: '2023-05-28T11:15:00',
      nextAppointment: '2023-06-11T11:00:00'
    },
    {
      id: 'p4',
      name: 'Michael Omondi',
      contactInfo: {
        phone: '+254798765432',
        email: 'michael.o@example.com'
      },
      preferredChannel: 'email',
      language: 'en',
      lastAppointment: '2023-05-10T16:00:00',
      nextAppointment: '2023-06-07T16:30:00'
    }
  ];

  // Mock reminder logs
  const reminderLogs: ReminderLog[] = [
    {
      id: 'r1',
      appointmentId: 'a1',
      patientId: 'p1',
      timestamp: '2023-06-14T08:00:00',
      channel: 'whatsapp',
      status: 'delivered',
      messageContent: 'Hello John, this is a reminder for your appointment with Dr. Kimani tomorrow at 10:00 AM. Reply 1 to confirm or 2 to reschedule.'
    },
    {
      id: 'r2',
      appointmentId: 'a2',
      patientId: 'p2',
      timestamp: '2023-06-02T09:00:00',
      channel: 'sms',
      status: 'delivered',
      messageContent: 'Priya, this is a reminder for your appointment with Dr. Patel tomorrow at 2:30 PM. Reply YES to confirm or NO to reschedule.'
    },
    {
      id: 'r3',
      appointmentId: 'a3',
      patientId: 'p3',
      timestamp: '2023-06-10T08:30:00',
      channel: 'whatsapp',
      status: 'delivered',
      messageContent: 'Habari Fatima, hii ni ukumbusho wa miadi yako na Dr. Kimani kesho saa tano asubuhi. Jibu 1 kuthibitisha au 2 kupanga upya.'
    },
    {
      id: 'r4',
      appointmentId: 'a4',
      patientId: 'p4',
      timestamp: '2023-06-06T09:00:00',
      channel: 'email',
      status: 'sent',
      messageContent: 'Dear Michael, this is a reminder for your appointment with Dr. Patel tomorrow at 4:30 PM. Please click the link below to confirm or reschedule.'
    }
  ];

  // Mock appointments with references to patients and doctors
  const appointments: Array<Appointment & { patient: Patient; doctor: Doctor }> = [
    {
      id: 'a1',
      patientId: 'p1',
      doctorId: 'd1',
      dateTime: '2023-06-15T10:00:00',
      status: 'confirmed',
      type: 'Follow-up',
      followUp: true,
      remindersSent: [reminderLogs[0]],
      patient: patients[0],
      doctor: doctors[0]
    },
    {
      id: 'a2',
      patientId: 'p2',
      doctorId: 'd2',
      dateTime: '2023-06-03T14:30:00',
      status: 'scheduled',
      type: 'Check-up',
      followUp: false,
      remindersSent: [reminderLogs[1]],
      patient: patients[1],
      doctor: doctors[1]
    },
    {
      id: 'a3',
      patientId: 'p3',
      doctorId: 'd1',
      dateTime: '2023-06-11T11:00:00',
      status: 'confirmed',
      type: 'Vaccination',
      notes: 'Second dose of vaccine',
      followUp: true,
      remindersSent: [reminderLogs[2]],
      patient: patients[2],
      doctor: doctors[0]
    },
    {
      id: 'a4',
      patientId: 'p4',
      doctorId: 'd2',
      dateTime: '2023-06-07T16:30:00',
      status: 'scheduled',
      type: 'Consultation',
      followUp: false,
      remindersSent: [reminderLogs[3]],
      patient: patients[3],
      doctor: doctors[1]
    }
  ];

  // Mock reminder templates
  const reminderTemplates: ReminderTemplate[] = [
    {
      id: 't1',
      name: '1-Day SMS Reminder (English)',
      channel: 'sms',
      content: 'Hello {{patient_name}}, this is a reminder of your appointment with Dr. {{doctor_name}} tomorrow at {{appointment_time}}. Reply YES to confirm or NO to reschedule. - {{clinic_name}}',
      language: 'en',
      timing: {
        days: 1,
        hours: 0
      }
    },
    {
      id: 't2',
      name: '1-Day WhatsApp Reminder (English)',
      channel: 'whatsapp',
      content: 'Hello {{patient_name}},\n\nThis is a reminder of your appointment with Dr. {{doctor_name}} tomorrow at {{appointment_time}}.\n\nReply:\n1 - Confirm\n2 - Reschedule\n\n{{clinic_name}}',
      language: 'en',
      timing: {
        days: 1,
        hours: 0
      }
    },
    {
      id: 't3',
      name: '3-Day Email Reminder (English)',
      channel: 'email',
      content: 'Dear {{patient_name}},\n\nThis is a friendly reminder of your upcoming appointment with Dr. {{doctor_name}} on {{appointment_date}} at {{appointment_time}}.\n\nIf you need to reschedule, please call us at {{clinic_phone}} or reply to this email.\n\nRegards,\n{{clinic_name}} Team',
      language: 'en',
      timing: {
        days: 3,
        hours: 0
      }
    },
    {
      id: 't4',
      name: '1-Day SMS Reminder (Swahili)',
      channel: 'sms',
      content: 'Habari {{patient_name}}, hii ni ukumbusho wa miadi yako na Dr. {{doctor_name}} kesho saa {{appointment_time}}. Jibu NDIO kuthibitisha au HAPANA kupanga upya. - {{clinic_name}}',
      language: 'sw',
      timing: {
        days: 1,
        hours: 0
      }
    },
    {
      id: 't5',
      name: '1-Day SMS Reminder (Hindi)',
      channel: 'sms',
      content: 'नमस्ते {{patient_name}}, यह आपकी कल {{appointment_time}} बजे Dr. {{doctor_name}} के साथ अपॉइंटमेंट का रिमाइंडर है। पुष्टि करने के लिए हाँ जवाब दें या पुनर्निर्धारित करने के लिए नहीं। - {{clinic_name}}',
      language: 'hi',
      timing: {
        days: 1,
        hours: 0
      }
    },
    {
      id: 't6',
      name: 'Missed Appointment Follow-up (English)',
      channel: 'whatsapp',
      content: 'Hello {{patient_name}},\n\nWe noticed you missed your appointment with Dr. {{doctor_name}} today. Would you like to reschedule?\n\nReply:\n1 - Yes, reschedule\n2 - No, cancel\n\n{{clinic_name}}',
      language: 'en',
      timing: {
        days: 0,
        hours: 4
      }
    }
  ];

  // Mock reminder statistics
  const reminderStats = {
    sent: 450,
    delivered: 435,
    failed: 15,
    responded: 356,
    missedRate: 18
  };

  // Mock channel performance data
  const channelPerformance = {
    sms: {
      sent: 200,
      delivered: 195,
      responded: 160,
      effectiveness: 82
    },
    whatsapp: {
      sent: 180,
      delivered: 178,
      responded: 156,
      effectiveness: 88
    },
    email: {
      sent: 70,
      delivered: 62,
      responded: 40,
      effectiveness: 65
    }
  };

  // Mock communication settings
  const communicationSettings = {
    sms: {
      enabled: true,
      provider: 'africas-talking',
      apiKey: 'at_test_key_123456',
      fromNumber: '+254700123456'
    },
    whatsapp: {
      enabled: true,
      provider: '360dialog',
      apiKey: '360d_test_key_123456',
      fromNumber: '+254700123456'
    },
    email: {
      enabled: true,
      provider: 'smtp',
      apiKey: '',
      fromEmail: 'reminders@myclinic.com',
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpUser: 'reminders@myclinic.com',
      smtpPassword: 'password123'
    }
  };

  return {
    doctors,
    patients,
    appointments,
    reminderLogs,
    reminderTemplates,
    reminderStats,
    channelPerformance,
    communicationSettings
  };
};

export const mockData = generateMockData();