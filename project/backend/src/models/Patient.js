import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  contactInfo: {
    phone: {
      type: String,
      required: true
    },
    whatsapp: String,
    email: String
  },
  preferredChannel: {
    type: String,
    enum: ['sms', 'whatsapp', 'email'],
    default: 'sms'
  },
  language: {
    type: String,
    default: 'en'
  },
  lastAppointment: Date,
  nextAppointment: Date,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Patient', patientSchema);