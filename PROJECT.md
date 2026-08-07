# ProbMap - Public Property Damage Reporting Platform

A full-stack web application for citizens to report public property damage (potholes, street lights, drainage, etc.) with AI-powered image analysis, volunteer management, and admin analytics.

## 🏗 Architecture Overview

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   React Frontend │────▶│  Node.js/Express │────▶│    MongoDB      │
│   (Vite + MUI)   │     │  Backend API     │     │   Database      │
└─────────────────┘     └────────┬─────────┘     └─────────────────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
             ┌──────────┐ ┌──────────┐ ┌──────────┐
             │  Firebase│ │ Cloudinary│ │  Gemini  │
             │   Auth   │ │  Images   │ │   AI     │
             └──────────┘ └──────────┘ └──────────┘
```

## 🎯 Core Features

### Citizen Portal (`frontend/my-react-app`)
- **Damage Reporting**: Upload photos + GPS location (current or map selection)
- **AI Analysis**: Gemini Vision classifies damage type, severity, cost estimate
- **Issue Tracking**: View pending/history of submitted reports
- **Volunteer Portal**: Claim issues, submit resolution proofs

### Admin Dashboard (`Admin/admin`)
- **Issue Management**: Approve/reject pending reports, update status
- **Volunteer Management**: Approve/reject volunteer applications
- **Claims Review**: Verify volunteer resolution proofs
- **Analytics**: Charts, reports, leaderboards, response time analysis
- **Map Visualization**: Geographic distribution of issues

### Backend API (`backend/src`)
- **RESTful endpoints** for issues, users, volunteers, admins
- **Firebase Auth** integration with role-based access control
- **Cloudinary** for image storage
- **Gemini AI** for automated damage assessment

## 🛠 Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, Vite, MUI, React Leaflet, Chart.js, React Router |
| **Backend** | Node.js, Express 5, MongoDB/Mongoose, Firebase Admin SDK |
| **AI/ML** | Google Gemini 1.5 Flash (vision) |
| **Auth** | Firebase Authentication (Email/Password) |
| **Storage** | Cloudinary (images), MongoDB (data) |
| **DevOps** | Railway/Render deployment ready |

## 📁 Project Structure

```
ProbMap/
├── backend/                    # Node.js/Express API
│   ├── src/
│   │   ├── config.js          # Environment configuration
│   │   ├── server.js          # Express entry point
│   │   ├── database/connection.js
│   │   ├── firebase/          # Firebase Admin SDK setup
│   │   ├── middlewares/       # Auth, upload, validation
│   │   ├── models/            # Mongoose schemas
│   │   ├── controllers/       # Business logic
│   │   ├── routes/            # API route definitions
│   │   └── utils/             # Cloudinary, helpers
│   ├── package.json
│   └── .env                   # Environment variables
│
├── frontend/my-react-app/      # Citizen Portal (React + Vite)
│   ├── src/
│   │   ├── assets/components/ # Reusable UI components
│   │   ├── App.jsx            # Routes & auth guard
│   │   └── main.jsx           # Entry point
│   ├── package.json
│   └── .env
│
├── Admin/admin/                # Admin Dashboard (React + Vite)
│   ├── src/
│   │   ├── assets/Admin/      # Admin-specific components
│   │   ├── components/firebase/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── railway.json               # Railway deployment config
├── start.sh                   # Multi-service startup script
└── README.md
```

## 🔐 Authentication & Roles

| Role | Access |
|------|--------|
| **Citizen** | Submit issues, view own history, volunteer for issues |
| **Volunteer** | Claim issues, submit resolution proofs |
| **Admin** | Manage issues, volunteers, claims, view analytics |
| **Super Admin** | All admin + user management, system config |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Firebase project
- Cloudinary account
- Google AI Studio API key (Gemini)

### Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/probmap
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
GEMINI_API_KEY=your-gemini-api-key
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

**Frontend** (`frontend/my-react-app/.env`):
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
```

**Admin** (`Admin/admin/.env`):
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
```

### Installation

```bash
# Backend
cd backend && npm install && npm run start

# Frontend (Citizen Portal)
cd frontend/my-react-app && npm install && npm run dev

# Admin Dashboard
cd Admin/admin && npm install && npm run dev
```

Or run all at once:
```bash
chmod +x start.sh && ./start.sh
```

## 📡 API Endpoints

### Issues
- `POST /issue` - Create issue (citizen)
- `GET /issue/my` - Get user's issues
- `DELETE /issue/:id` - Delete own issue
- `GET /admin/pendingIssues` - Pending issues (admin)
- `GET /admin/acknowledgedIssues` - Acknowledged issues
- `GET /admin/resolvedIssues` - Resolved issues
- `PATCH /admin/update-issue/:id` - Update status (admin)

### Volunteers
- `POST /volunteer/request` - Apply as volunteer
- `GET /volunteer/admin/requests` - List requests (admin)
- `PATCH /volunteer/admin/requests/:userId` - Approve/reject (admin)
- `POST /volunteer/claim/:issueId` - Claim issue (volunteer)
- `POST /volunteer/claims/:issueId/proof` - Submit proof (volunteer)
- `GET /volunteer/admin/claims` - Review claims (admin)
- `POST /volunteer/admin/claims/:issueId/review` - Approve/reject claim (admin)

### Auth & Users
- `POST /auth/register` - Register user
- `POST /auth/login` - Login (returns Firebase custom token)
- `GET /admin/users` - All users (admin)
- `GET /admin/profile` - Admin profile

### Analytics
- `POST /admin/reports/generate` - Generate filtered report
- `GET /admin/reports/export` - Export CSV

## 🤖 AI Image Analysis

The `/analyze-image` endpoint (FastAPI microservice) uses **Gemini 1.5 Flash** to classify uploaded images:

**Output Schema:**
```json
{
  "category": "Pothole | Traffic Signals | Pipelines | Drainage | Street Light | Public Tap | Road Damage | Garbage | Others",
  "importance": "High | Medium | Low",
  "cost_estimate": "500-1000",
  "confidence": 0.85,
  "is_public_property": true
}
```

**Non-public property** (people, animals, private property) returns `is_public_property: false` with category "Others".

## 🎨 Key Components

### Frontend (Citizen)
- `Upload.jsx` - Main reporting form with camera/map/analysis
- `UserIssues.jsx` - Tabbed view (pending/history)
- `VolunteerIssues.jsx` - Claimable issues + my claims
- `mapPicker.jsx` - Leaflet map for location selection

### Admin Dashboard
- `AdminPage.jsx` - Main dashboard (needs splitting)
- `IssueCard.jsx` - Reusable issue display card
- `Chart.jsx` - Chart.js visualizations
- `Leaf.jsx` - Map visualization of issues
- `ApprovedVolunteers.jsx` - Volunteer management table

## 📊 Analytics Features

- **Category/District/Status breakdowns** with visual bars
- **Response time analysis** (average hours to acknowledge/resolve)
- **Top contributors leaderboard** with progress bars
- **Engagement levels** (High/Medium/Low activity users)
- **CSV export** for external reporting
- **Custom date range** filtering

## 🔒 Security Considerations

- Firebase ID tokens verified on every protected request
- Role-based middleware (`adminAuth`, `volunteerAuth`)
- File upload validation (type, size via multer)
- CORS restricted to known frontend origins
- Environment variables for all secrets
- **TODO**: Rate limiting, input sanitization, audit logs

## 🚧 Known Issues / Tech Debt

1. **Duplicate backend** - FastAPI (`main.py`) + Node.js both handle issues
2. **Monolithic AdminPage** - 1300+ lines, needs component extraction
3. **No tests** - Zero test coverage
4. **Committed secrets** - Firebase service account key in repo (must rotate)
5. **No CI/CD** - Manual deployment only
6. **Hardcoded URLs** - Localhost references in frontend code
7. **No Docker** - Environment setup not containerized

## 🎯 Interview Talking Points

| Topic | Details |
|-------|---------|
| **AI Integration** | Gemini Vision for automated damage classification, confidence scoring |
| **Role-based Auth** | Firebase + custom claims, 4 distinct roles with route guards |
| **Real-time Features** | Volunteer claim workflow with proof submission & admin review |
| **Analytics** | Aggregation pipelines, response time calculations, leaderboard rankings |
| **Image Pipeline** | Client → Cloudinary → Gemini → MongoDB metadata |
| **Map Integration** | Leaflet + OpenStreetMap + Nominatim reverse geocoding |
| **Scalability** | Stateless API, Cloudinary CDN, MongoDB indexes on location/status |

## 📈 Future Enhancements

- Push notifications (Firebase Cloud Messaging)
- Offline support with service workers
- Mobile app (React Native / Expo)
- WebSocket for real-time status updates
- Multi-language support
- Advanced ML: damage progression tracking from historical images

## 📝 License

MIT License - Feel free to use for portfolio/interview purposes.