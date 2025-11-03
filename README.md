# Hospital Management System

## Overview
A comprehensive full-stack Hospital Management System web application built with modern technologies. This system enables seamless management of patients, doctors, appointments, and billing with role-based access control for Admin, Doctor, and Receptionist.

## Tech Stack
- **Frontend**: React.js with responsive design
- **Backend**: Node.js with Express.js
- **Database**: Oracle SQL Plus
- **Authentication**: JWT (JSON Web Tokens)
- **Tools**: Postman, VS Code, Oracle SQL Developer

## Project Architecture

```
hospital/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login/
│   │   │   │   ├── AdminLogin.jsx
│   │   │   │   ├── DoctorLogin.jsx
│   │   │   │   └── ReceptionistLogin.jsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── DoctorDashboard.jsx
│   │   │   │   └── ReceptionistDashboard.jsx
│   │   │   ├── Forms/
│   │   │   │   ├── PatientForm.jsx
│   │   │   │   ├── DoctorForm.jsx
│   │   │   │   ├── AppointmentForm.jsx
│   │   │   │   └── BillingForm.jsx
│   │   │   ├── Tables/
│   │   │   │   ├── PatientTable.jsx
│   │   │   │   ├── DoctorTable.jsx
│   │   │   │   ├── AppointmentTable.jsx
│   │   │   │   └── BillingTable.jsx
│   │   │   └── Common/
│   │   │       ├── Header.jsx
│   │   │       ├── Sidebar.jsx
│   │   │       └── Footer.jsx
│   │   ├── pages/
│   │   ├── utils/
│   │   │   ├── validation.js
│   │   │   ├── apiClient.js
│   │   │   └── auth.js
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── .env.example
├── server/                          # Node.js Backend
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── patients.js
│   │   │   ├── doctors.js
│   │   │   ├── appointments.js
│   │   │   └── billing.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── patientController.js
│   │   │   ├── doctorController.js
│   │   │   ├── appointmentController.js
│   │   │   └── billingController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── validation.js
│   │   │   └── errorHandler.js
│   │   ├── db/
│   │   │   └── connection.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   └── validators.js
│   │   ├── config/
│   │   │   └── config.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── database/                        # Oracle SQL Scripts
│   ├── schema.sql
│   ├── tables/
│   │   ├── CREATE_PATIENT.sql
│   │   ├── CREATE_DOCTOR.sql
│   │   ├── CREATE_APPOINTMENT.sql
│   │   ├── CREATE_BILLING.sql
│   │   └── CREATE_LOGIN.sql
│   └── procedures/
│       └── sample_procedures.sql
├── docs/                            # Documentation
│   ├── API_ENDPOINTS.md
│   ├── DATABASE_SCHEMA.md
│   ├── SETUP_GUIDE.md
│   └── USER_GUIDE.md
└── README.md
```

## Features

### Admin
- View and manage all doctors, patients, appointments, and billing records
- Add/edit/delete doctors and patients
- View comprehensive reports and analytics
- Manage user roles and permissions

### Doctor
- View assigned appointments
- Update patient diagnosis
- Access patient medical history
- View consultations and billing

### Receptionist
- Register new patients
- Schedule appointments
- Manage appointment availability
- Process billing inquiries

### Common Features
- Real-time form validation
- Search, filter, and pagination in tables
- User authentication with JWT
- Secure role-based access control
- Data persistence in Oracle SQL
- Error handling and logging

## Database Schema

### Tables

#### PATIENT
```sql
CREATE TABLE PATIENT (
  PATIENT_ID NUMBER PRIMARY KEY,
  NAME VARCHAR2(100) NOT NULL,
  AGE NUMBER(3) NOT NULL,
  GENDER VARCHAR2(10),
  CONTACT VARCHAR2(15) NOT NULL,
  ADDRESS VARCHAR2(255),
  CREATED_DATE DATE DEFAULT SYSDATE
);
```

#### DOCTOR
```sql
CREATE TABLE DOCTOR (
  DOCTOR_ID NUMBER PRIMARY KEY,
  NAME VARCHAR2(100) NOT NULL,
  SPECIALIZATION VARCHAR2(100),
  CONTACT VARCHAR2(15) NOT NULL,
  AVAILABILITY VARCHAR2(100),
  CREATED_DATE DATE DEFAULT SYSDATE
);
```

#### APPOINTMENT
```sql
CREATE TABLE APPOINTMENT (
  APPOINTMENT_ID NUMBER PRIMARY KEY,
  PATIENT_ID NUMBER REFERENCES PATIENT(PATIENT_ID),
  DOCTOR_ID NUMBER REFERENCES DOCTOR(DOCTOR_ID),
  APPOINTMENT_DATE DATE NOT NULL,
  TIME_SLOT VARCHAR2(50),
  STATUS VARCHAR2(20),
  DIAGNOSIS VARCHAR2(500),
  CREATED_DATE DATE DEFAULT SYSDATE
);
```

#### BILLING
```sql
CREATE TABLE BILLING (
  BILL_ID NUMBER PRIMARY KEY,
  PATIENT_ID NUMBER REFERENCES PATIENT(PATIENT_ID),
  APPOINTMENT_ID NUMBER REFERENCES APPOINTMENT(APPOINTMENT_ID),
  TOTAL_AMOUNT NUMBER(10,2),
  PAYMENT_STATUS VARCHAR2(20),
  DATE_ISSUED DATE DEFAULT SYSDATE
);
```

#### LOGIN
```sql
CREATE TABLE LOGIN (
  USER_ID NUMBER PRIMARY KEY,
  USERNAME VARCHAR2(50) NOT NULL UNIQUE,
  PASSWORD VARCHAR2(255) NOT NULL,
  ROLE VARCHAR2(20) NOT NULL,
  CREATED_DATE DATE DEFAULT SYSDATE
);
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/register` - User registration (Admin only)

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create new doctor (Admin only)
- `PUT /api/doctors/:id` - Update doctor (Admin only)
- `DELETE /api/doctors/:id` - Delete doctor (Admin only)

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create appointment (Receptionist/Doctor)
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Billing
- `GET /api/billing` - Get all bills
- `GET /api/billing/:id` - Get bill by ID
- `POST /api/billing` - Create bill
- `PUT /api/billing/:id` - Update bill payment status
- `DELETE /api/billing/:id` - Delete bill

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Oracle SQL Plus
- Git

### Frontend Setup (React)

1. Navigate to client folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Backend Setup (Node.js)

1. Navigate to server folder:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
PORT=5000
DB_HOST=localhost
DB_PORT=1521
DB_NAME=orcl
DB_USER=your_oracle_user
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start server:
```bash
npm start
```

Server runs on `http://localhost:5000`

### Database Setup (Oracle SQL)

1. Connect to Oracle SQL Plus:
```sql
sqlplus username/password@database
```

2. Run schema scripts from `/database` folder:
```sql
@database/schema.sql
@database/tables/CREATE_PATIENT.sql
@database/tables/CREATE_DOCTOR.sql
@database/tables/CREATE_APPOINTMENT.sql
@database/tables/CREATE_BILLING.sql
@database/tables/CREATE_LOGIN.sql
```

3. Insert sample data (optional):
```sql
INSERT INTO LOGIN VALUES (1, 'admin', 'hashed_password', 'ADMIN');
INSERT INTO LOGIN VALUES (2, 'doctor1', 'hashed_password', 'DOCTOR');
INSERT INTO LOGIN VALUES (3, 'receptionist1', 'hashed_password', 'RECEPTIONIST');
COMMIT;
```

## Usage

### Admin Login
1. Navigate to `http://localhost:3000/admin-login`
2. Enter username: `admin` and password
3. Access admin dashboard
4. Manage all system entities

### Doctor Login
1. Navigate to `http://localhost:3000/doctor-login`
2. Enter doctor credentials
3. Access doctor dashboard
4. View and manage appointments

### Receptionist Login
1. Navigate to `http://localhost:3000/receptionist-login`
2. Enter receptionist credentials
3. Access receptionist dashboard
4. Register patients and schedule appointments

## Testing with Postman

1. Import API endpoints to Postman
2. Set authorization headers:
```
Authorization: Bearer <JWT_TOKEN>
```

3. Test endpoints:
   - Login to get JWT token
   - Use token for authenticated requests
   - Test CRUD operations on all entities

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- SQL injection prevention
- CORS configuration
- Environment variable management

## Error Handling

- Centralized error handler middleware
- Consistent error response format
- Validation error messages
- Database operation error logging
- HTTP status codes adherence

## Logging

- Request/response logging
- Error logging with timestamps
- Database query logging
- User action tracking

## Performance Optimization

- Database query optimization
- Pagination for large datasets
- Search and filter functionality
- Lazy loading in frontend
- Caching strategies

## Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd client
npm run build
# Upload build folder to hosting service
```

### Backend Deployment (Heroku/AWS/DigitalOcean)
```bash
cd server
# Configure environment variables
# Push to hosting service
```

### Database Deployment
- Use Oracle Cloud or on-premise Oracle database
- Ensure proper backup and recovery procedures

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Submit pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository or contact the development team.

## Project Status

Active Development - v1.0.0

---

**Last Updated**: November 2025
**Author**: bhushhhhann
**Repository**: https://github.com/bhushhhhann/hospital
