/**
 * This file contains utility functions for sending reminders via different channels
 */

// Function to send SMS reminder
export const sendSmsReminder = async (
  phone: string,
  message: string,
  config: {
    provider: string;
    apiKey: string;
    fromNumber: string;
  }
) => {
  try {
    // In a real implementation, this would call the appropriate SMS API
    console.log(`Sending SMS to ${phone} via ${config.provider}`);
    
    // Example implementation for Africa's Talking
    if (config.provider === 'africas-talking') {
      const response = await fetch('https://api.africastalking.com/version1/messaging', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apiKey': config.apiKey,
          'Accept': 'application/json'
        },
        body: new URLSearchParams({
          'username': 'sandbox', // would be your AT username in production
          'to': phone,
          'message': message,
          'from': config.fromNumber
        })
      });
      
      return await response.json();
    }
    
    // Example implementation for Twilio
    if (config.provider === 'twilio') {
      // In production, this would use Twilio's SDK or REST API
      const accountSid = 'your_account_sid'; // Would be stored securely
      const authToken = config.apiKey;
      
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`)
        },
        body: new URLSearchParams({
          'To': phone,
          'From': config.fromNumber,
          'Body': message
        })
      });
      
      return await response.json();
    }
    
    // Mock successful response for demo
    return {
      success: true,
      messageId: `sms-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'sent'
    };
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('Failed to send SMS reminder');
  }
};

// Function to send WhatsApp reminder
export const sendWhatsAppReminder = async (
  phone: string,
  message: string,
  config: {
    provider: string;
    apiKey: string;
    fromNumber: string;
  }
) => {
  try {
    // In a real implementation, this would call the appropriate WhatsApp API
    console.log(`Sending WhatsApp message to ${phone} via ${config.provider}`);
    
    // Example implementation for 360dialog
    if (config.provider === '360dialog') {
      const response = await fetch('https://waba.360dialog.io/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'D360-API-KEY': config.apiKey
        },
        body: JSON.stringify({
          'to': phone,
          'type': 'text',
          'text': {
            'body': message
          }
        })
      });
      
      return await response.json();
    }
    
    // Example implementation for Twilio
    if (config.provider === 'twilio') {
      const accountSid = 'your_account_sid'; // Would be stored securely
      const authToken = config.apiKey;
      
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`)
        },
        body: new URLSearchParams({
          'To': `whatsapp:${phone}`,
          'From': `whatsapp:${config.fromNumber}`,
          'Body': message
        })
      });
      
      return await response.json();
    }
    
    // Mock successful response for demo
    return {
      success: true,
      messageId: `wa-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'sent'
    };
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw new Error('Failed to send WhatsApp reminder');
  }
};

// Function to send email reminder
export const sendEmailReminder = async (
  email: string,
  subject: string,
  message: string,
  config: {
    provider: string;
    apiKey: string;
    fromEmail: string;
    smtpHost?: string;
    smtpPort?: number;
    smtpUser?: string;
    smtpPassword?: string;
  }
) => {
  try {
    // In a real implementation, this would call the appropriate Email API
    console.log(`Sending Email to ${email} via ${config.provider}`);
    
    // Example implementation for SendGrid
    if (config.provider === 'sendgrid') {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          'personalizations': [
            {
              'to': [
                {
                  'email': email
                }
              ]
            }
          ],
          'from': {
            'email': config.fromEmail
          },
          'subject': subject,
          'content': [
            {
              'type': 'text/plain',
              'value': message
            }
          ]
        })
      });
      
      return response.status === 202 ? { success: true } : await response.json();
    }
    
    // Example implementation for SMTP (would use a library like Nodemailer in a real backend)
    if (config.provider === 'smtp') {
      // In a real implementation, this would use a library like Nodemailer
      console.log(`SMTP Configuration: ${config.smtpHost}:${config.smtpPort}`);
      
      // Mock successful response for demo
      return {
        success: true,
        messageId: `email-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        status: 'sent'
      };
    }
    
    // Mock successful response for demo
    return {
      success: true,
      messageId: `email-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'sent'
    };
  } catch (error) {
    console.error('Error sending Email:', error);
    throw new Error('Failed to send Email reminder');
  }
};

// Process reminder template with patient and appointment data
export const processReminderTemplate = (
  template: string,
  data: {
    patient_name: string;
    doctor_name: string;
    appointment_date: string;
    appointment_time: string;
    clinic_name: string;
    clinic_phone: string;
  }
) => {
  let processed = template;
  
  // Replace all variables in the template
  Object.entries(data).forEach(([key, value]) => {
    processed = processed.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });
  
  return processed;
};

// Get appropriate reminder template based on patient preferences and timing
export const getAppropriateTemplate = (
  templates: any[],
  patientLanguage: string,
  preferredChannel: string,
  daysUntilAppointment: number
) => {
  // Filter templates by language and channel
  const filteredTemplates = templates.filter(template => 
    template.language === patientLanguage && 
    template.channel === preferredChannel
  );
  
  // Find the template with the closest timing
  let closestTemplate = null;
  let minDiff = Number.MAX_SAFE_INTEGER;
  
  filteredTemplates.forEach(template => {
    const diff = Math.abs(template.timing.days - daysUntilAppointment);
    if (diff < minDiff) {
      minDiff = diff;
      closestTemplate = template;
    }
  });
  
  return closestTemplate;
};