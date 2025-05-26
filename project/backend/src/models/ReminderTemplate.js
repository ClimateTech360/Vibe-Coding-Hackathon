import mongoose from 'mongoose';

const reminderTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  channel: {
    type: String,
    enum: ['sms', 'whatsapp', 'email'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  timing: {
    days: {
      type: Number,
      required: true
    },
    hours: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ReminderTemplate', reminderTemplateSchema);