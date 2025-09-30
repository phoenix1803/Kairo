# Kairo - NEP Timetable System

AI-powered timetable management system for educational institutions with black and white theme design.

## Features

- **Student Portal**: Search timetables by enrollment number with offline PWA support
- **Faculty Portal**: Personal schedules, workload tracking, and leave management  
- **Admin Dashboard**: Comprehensive management with AI-powered constraint solving
- **AI Integration**: Natural language constraint authoring using Gemini AI
- **Smart Optimization**: OR-Tools CP-SAT solver for optimal schedule generation
- **What-If Simulations**: Compare scenarios and analyze alternatives
- **Real-time Updates**: WebSocket-based progress tracking
- **Export Options**: PDF, Excel, and iCal format support
- **Offline Capability**: PWA with service worker caching
- **Black & White Theme**: Clean, accessible monochrome design

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kairo-timetable-system
```

2. Copy environment configuration:
```bash
cp .env.example .env
```

3. Edit `.env` file with your configuration:
- Add your Gemini API key for AI features
- Configure SMTP settings for email notifications
- Adjust database credentials if needed

4. Start the application:
```bash
docker-compose up -d
```

5. Access the application:
- Frontend: http://localhost
- API Documentation: http://localhost/api/docs
- Admin Dashboard: http://localhost/admin

## Architecture

### Technology Stack

**Frontend:**
- Next.js 14 with App Router
- TypeScript + TailwindCSS
- PWA with offline support
- Zustand for state management

**Backend:**
- FastAPI with async/await
- SQLAlchemy with PostgreSQL
- OR-Tools for constraint solving
- Gemini AI for natural language processing

**Infrastructure:**
- Docker Compose deployment
- Nginx reverse proxy
- Redis for caching and queues
- PostgreSQL 16 database

### Project Structure

```
├── frontend/                 # Next.js application
│   ├── app/                 # App router pages
│   ├── components/          # Reusable UI components
│   └── public/              # Static assets
├── backend/                 # FastAPI application
│   ├── app/                 # Application code
│   ├── models/              # Database models
│   └── api/                 # API endpoints
├── docker-compose.yml       # Container orchestration
└── nginx.conf              # Reverse proxy config
```

## Usage

### Student Portal

1. Navigate to `/student`
2. Enter enrollment number
3. View timetable in week or day format
4. Install PWA for offline access
5. Export to PDF or iCal

### Faculty Portal

1. Navigate to `/faculty`
2. Enter faculty code
3. View personal schedule and workload
4. Request leave and find substitutes

### Admin Dashboard

1. Navigate to `/admin`
2. Upload institutional data via CSV
3. Define constraints using AI or forms
4. Generate optimized timetables
5. Run what-if simulations
6. Send notifications to users

## API Documentation

Interactive API documentation is available at `/api/docs` when the backend is running.

### Key Endpoints

- `GET /api/v1/students/{enrollment}/timetable` - Get student timetable
- `POST /api/v1/timetables/generate` - Generate optimized timetable
- `POST /api/v1/constraints/natural-language` - Process AI constraints
- `GET /api/v1/faculty/{code}/schedule` - Get faculty schedule

## Development

### Local Development

1. Install dependencies:
```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && pip install -r requirements.txt
```

2. Start development servers:
```bash
# Frontend (port 3000)
cd frontend && npm run dev

# Backend (port 8000)  
cd backend && uvicorn app.main:app --reload
```

3. Start supporting services:
```bash
docker-compose up postgres redis -d
```

### Database Migrations

```bash
cd backend
alembic revision --autogenerate -m "Description"
alembic upgrade head
```

## Configuration

### Environment Variables

See `.env.example` for all available configuration options.

### Gemini AI Setup

1. Get API key from Google AI Studio
2. Add to `.env` file: `GEMINI_API_KEY=your-key-here`
3. Natural language constraint processing will be enabled

### Email Notifications

Configure SMTP settings in `.env`:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## Deployment

### Production Deployment

1. Update environment variables for production
2. Configure SSL certificates in nginx
3. Set up proper database backups
4. Deploy using Docker Compose:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Scaling

The system supports horizontal scaling:
- Multiple backend instances behind nginx
- Redis for shared session storage
- PostgreSQL with read replicas


## License

This project is licensed under the MIT License - see LICENSE file for details.
