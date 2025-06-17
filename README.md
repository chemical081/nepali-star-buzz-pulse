
# Nepali Star News Website

A full-stack news website with separate frontend, backend, and database components.

## Project Structure

```
/
├── frontend/            # React frontend application
├── backend/             # Node.js/Express API backend
├── database/            # Database scripts and migrations
└── docker-compose.yml   # Docker configuration for all services
```

## Quick Start

### Prerequisites
- Docker and Docker Compose

### Running the Application

1. Clone the repository
2. Run `docker-compose up --build`
3. Access the application at http://localhost:3000
4. Access the backend API at http://localhost:5000

## Development Setup

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Backend Development
```bash
cd backend
npm install
npm run dev
```

## Production Deployment

For production deployment:

1. Update environment variables in docker-compose.yml
2. Replace JWT_SECRET with a secure key
3. Run `docker-compose -f docker-compose.prod.yml up -d`

## Admin Login

Default admin credentials:
- Username: admin
- Password: admin123

## License

[MIT](LICENSE)
