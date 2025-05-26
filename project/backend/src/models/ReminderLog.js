import mongoose from 'mongoose';

const reminderLogSchema = new mongoose.Schema({
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  channel: {
    type: String,
    enum: ['sms', 'whatsapp', 'email'],
    required: true
  },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'failed', 'responded'],
    default: 'sent'
  },
  messageContent: {
    type: String,
    required: true
  },
  response: String
});

export default mongoose.model('ReminderLog', reminderLogSchema);