# Form Builder Studio - Backend

FastAPI backend server providing secure REST APIs for the Form Builder Studio application.

## About

This backend provides authentication, user management, and form CRUD operations using modern Python async frameworks. It features JWT authentication, MongoDB integration, and auto-generated API documentation.

## Quick Start

```bash
# Install dependencies
uv sync

# Copy environment file and configure
cp ../.env.example ../.env

# Initialize database
uv run python -m app.initial_data

# Start development server
fastapi dev app/main.py
```

🌐 **API Server**: <http://localhost:8000>  
📚 **API Docs**: <http://localhost:8000/docs>

## Documentation

- 📖 **[Detailed Setup Guide](./INSTALL.md)** - Complete installation instructions
- 🏠 **[Main Project README](../README.md)** - Project overview and full documentation
- 🎨 **[Frontend README](../client/README.md)** - Frontend application setup

## Tech Stack

- **FastAPI**: Modern async Python web framework
- **MongoDB**: Document database with async operations  
- **JWT**: Secure token-based authentication
- **Pydantic**: Data validation and serialization
- **bcrypt**: Password hashing

## API Features

- User authentication and registration
- JWT token management with refresh
- Form CRUD operations (planned)
- Auto-generated OpenAPI documentation
- Async database operations
- Type-safe request/response handling

## Project Structure

```text
server/
├── app/
│   ├── api/routes/      # API endpoints
│   ├── core/           # Configuration & security
│   ├── models/         # MongoDB data models
│   ├── crud/           # Database operations
│   ├── schemas/        # Pydantic schemas
│   └── main.py        # Application entry point
├── pyproject.toml     # Dependencies & config
└── INSTALL.md        # Detailed setup guide
```

## Contributing

Please refer to the main project [README](../README.md) for contribution guidelines.
