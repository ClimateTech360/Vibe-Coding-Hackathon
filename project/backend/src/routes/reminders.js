import express from 'express';
import ReminderTemplate from '../models/ReminderTemplate.js';
import ReminderLog from '../models/ReminderLog.js';

const router = express.Router();

// Get all reminder templates
router.get('/templates', async (req, res) => {
  try {
    const templates = await ReminderTemplate.find();
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create reminder template
router.post('/templates', async (req, res) => {
  const template = new ReminderTemplate(req.body);
  try {
    const newTemplate = await template.save();
    res.status(201).json(newTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get reminder logs
router.get('/logs', async (req, res) => {
  try {
    const logs = await ReminderLog.find()
      .populate('appointment')
      .populate('patient');
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create reminder log
router.post('/logs', async (req, res) => {
  const log = new ReminderLog(req.body);
  try {
    const newLog = await log.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;