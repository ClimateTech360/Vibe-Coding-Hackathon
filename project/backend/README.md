# HealthTech Reminder System Backend

This is the backend server for the HealthTech appointment reminder system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthtech
JWT_SECRET=your_jwt_secret_key_here
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Appointments
- GET /api/appointments
- GET /api/appointments/:id
- POST /api/appointments
- PATCH /api/appointments/:id
- DELETE /api/appointments/:id

### Patients
- GET /api/patients
- GET /api/patients/:id
- POST /api/patients
- PATCH /api/patients/:id
- DELETE /api/patients/:id

### Reminders
- GET /api/reminders/templates
- POST /api/reminders/templates
- GET /api/reminders/logs
- POST /api/reminders/logs

### Authentication
- POST /api/auth/login