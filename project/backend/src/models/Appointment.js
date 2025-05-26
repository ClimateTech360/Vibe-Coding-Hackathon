import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'missed', 'completed', 'cancelled', 'rescheduled'],
    default: 'scheduled'
  },
  type: {
    type: String,
    required: true
  },
  notes: String,
  followUp: {
    type: Boolean,
    default: false
  },
  remindersSent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReminderLog'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Appointment', appointmentSchema);