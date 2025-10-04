# 🏗️ Form Builder Studio

A modern, full-stack form builder application that enables users to create, customize, and manage forms with an intuitive drag-and-drop interface.

![Form Builder Studio](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.116-009688?style=for-the-badge&logo=fastapi)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?style=for-the-badge&logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python)

## ✨ Features

### 🎨 Form Builder
- **Drag & Drop Interface**: Intuitive form creation with visual components
- **Real-time Preview**: See your forms as you build them
- **Custom Styling**: Tailwind CSS integration for beautiful designs
- **Responsive Design**: Forms that work on all devices

### 🔐 Authentication & Security
- **JWT Authentication**: Secure token-based authentication
- **User Management**: Complete user registration and profile management
- **Password Security**: bcrypt hashing for secure password storage
- **CORS Protection**: Configurable cross-origin request handling

### 🚀 Modern Tech Stack
- **Frontend**: Next.js 15 with React 19, TypeScript, and Tailwind CSS
- **Backend**: FastAPI with async/await, Pydantic validation
- **Database**: MongoDB with async operations
- **State Management**: Redux Toolkit for predictable state updates
- **UI Components**: Radix UI primitives with custom styling

### 📊 Developer Experience
- **Type Safety**: Full TypeScript support across the stack
- **Auto Documentation**: OpenAPI/Swagger docs generated automatically
- **Hot Reload**: Fast development with Turbopack and FastAPI auto-reload
- **Code Quality**: ESLint, Prettier, and Ruff for consistent code style

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and **npm**
- **Python** 3.12+ and **uv** (or pip)
- **MongoDB** 4.4+ (local or cloud)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/Abhishek10351/form-builder-studio.git
cd form-builder-studio
```

### 2. Environment Setup

Both backend and frontend need their own environment configuration:

**Backend Environment:**

```bash
cd server
cp .env.example .env
# Edit server/.env with your backend settings
```

**Frontend Environment:**

```bash
cd client
cp .env.example .env.local
# Edit client/.env.local with your frontend settings
```

**Required backend changes:**

- Change `SECRET_KEY` from "changethis" to a secure random string
- Change `FIRST_SUPERUSER_PASSWORD` from "changethis" to a secure password
- Update `MONGODB_URI` if using a different MongoDB setup

### 3. Backend Setup

```bash
cd server

# Install dependencies
uv sync

# Start backend server
cd app
fastapi dev main.py
```

Backend will be available at: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Alternative Docs: http://localhost:8000/redoc

### 4. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Copy example environment file
cp .env.example .env.local

# Start frontend server
npm run dev
```

Frontend will be available at: http://localhost:3000

## 📁 Project Structure

```text
form-builder-studio/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/          # Utilities and API
│   │   └── store/        # Redux store
│   ├── public/           # Static assets
│   ├── .env.local        # Frontend environment
│   └── INSTALL.md        # Frontend setup guide
├── server/                # FastAPI Backend
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── core/         # Core functionality
│   │   ├── models/       # Data models
│   │   ├── crud/         # Database operations
│   │   └── schemas/      # Pydantic schemas
│   ├── .env              # Backend environment
│   └── INSTALL.md        # Backend setup guide
└── README.md            # This file
```

## 🛠️ Development

### Frontend Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend Commands

```bash
# Development server (from app/ directory)
cd app && fastapi dev main.py

# Production server
cd app && uv run fastapi run app/main.py

# Run tests
uv run pytest

# Code linting and formatting
uv run ruff check
uv run ruff format
```


## 🔗 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

### Users
- `GET /users/me` - Get user profile
- `PUT /users/me` - Update profile

### Forms (Coming Soon)
- `GET /forms` - List forms
- `POST /forms` - Create form
- `GET /forms/{id}` - Get form
- `PUT /forms/{id}` - Update form
- `DELETE /forms/{id}` - Delete form

### Utility
- `GET /ping` - Health check

## 🌐 Environment Variables

### Backend (server/.env)

```bash
# Required
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=form_builder_studio
SECRET_KEY=your-secret-key
FIRST_SUPERUSER=admin@example.com
FIRST_SUPERUSER_PASSWORD=secure-password

# Optional
PROJECT_NAME="Form Builder Studio"
ACCESS_TOKEN_EXPIRE_MINUTES=11520  # 8 days
ENVIRONMENT=local
FRONTEND_HOST=http://localhost:3000
BACKEND_CORS_ORIGINS=http://localhost:3000
```

### Frontend (client/.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME="Form Builder Studio"
NEXT_PUBLIC_TOKEN_KEY=access_token
```

## 🧪 Testing

### Backend Tests
```bash
cd server
uv run pytest                 # Run all tests
uv run pytest --cov=app      # With coverage
uv run pytest -v             # Verbose output
```

### Frontend Tests (Coming Soon)
```bash
cd client
npm run test                  # Run tests
npm run test:watch           # Watch mode
npm run test:coverage        # With coverage
```

## 🚀 Deployment

### Production Environment

1. **Set production environment variables**
2. **Use production MongoDB instance**
3. **Configure HTTPS and security headers**
4. **Set up monitoring and logging**

### Deployment Options

- **Docker**: Use provided Dockerfiles
- **Cloud Platforms**: Vercel (frontend), Railway/Render (backend)
- **VPS**: Nginx + PM2/systemd
- **Container Orchestration**: Kubernetes

## 🔒 Security Features

- JWT token authentication with 8-day expiration
- bcrypt password hashing
- CORS protection
- Input validation with Pydantic
- Environment-based configuration
- Secure HTTP headers

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Ensure all tests pass and code is formatted
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Setup

1. Follow the Quick Start guide above
2. Install development dependencies
3. Run tests to ensure everything works
4. Make your changes
5. Test your changes thoroughly

## 📚 Documentation

- [Frontend Installation Guide](./client/INSTALL.md)
- [Backend Installation Guide](./server/INSTALL.md)
- [API Documentation](http://localhost:8000/docs) (when running)
- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Ensure MongoDB is running: `mongosh --eval "db.runCommand('ping')"`
   - Check connection string in .env file

2. **Port Already in Use**
   - Backend: `lsof -i :8000` and kill the process
   - Frontend: `lsof -i :3000` and kill the process

3. **Environment Variables Not Loading**
   - Ensure .env file is in the correct location
   - Restart development servers after changes

4. **JWT Token Issues**
   - Change SECRET_KEY to a secure random string
   - Clear browser storage and re-login

### Getting Help

- Check the [Issues](https://github.com/Abhishek10351/form-builder-studio/issues) page
- Review the installation guides in `/client/INSTALL.md` and `/server/INSTALL.md`
- Join our community discussions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) for the amazing Python web framework
- [Next.js](https://nextjs.org/) for the excellent React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for the accessible UI primitives
- [MongoDB](https://www.mongodb.com/) for the flexible document database

---

**Happy Building! 🚀**

Made with ❤️ by [Abhishek10351](https://github.com/Abhishek10351)
