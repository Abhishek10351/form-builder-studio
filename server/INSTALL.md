# Backend Installation Guide

This guide will help you set up and run the Form Builder Studio backend API server.

## 📋 Prerequisites

- **Python**: Version 3.12 or higher
- **MongoDB**: Version 4.4 or higher (local or cloud instance)
- **Git**: For cloning the repository
- **uv**: Python package manager (recommended) or pip

## 🚀 Quick Start

### 1. Clone the Repository (if not already done)

```bash
git clone https://github.com/Abhishek10351/form-builder-studio.git
cd form-builder-studio/server
```

### 2. Python Environment Setup

#### Option A: Using uv (Recommended)

**MAC/Linux:**

```bash
# Install uv if not already installed
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install dependencies
uv sync
```

**Windows:**

```powershell
# Install uv if not already installed
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# Install dependencies
uv sync
```

#### Option B: Using pip and venv

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -e .
```

### 3. Database Setup

#### MongoDB Local Installation

**Ubuntu/Debian:**

```bash
# Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package database
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod
```

**macOS:**

```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

**Windows:**

- Download MongoDB Community Server from <https://www.mongodb.com/try/download/community>
- Run the installer and follow the setup wizard
- MongoDB will start automatically as a Windows service

#### MongoDB Cloud (MongoDB Atlas)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string from "Connect" → "Connect your application"

### 4. Environment Configuration

Copy the example environment file and configure it:

```bash
# Copy example environment file
cp .env.example /.env

# Edit the environment file with your settings
nano .env
```

Required environment variables:

- `MONGODB_URI` - Your MongoDB connection string
- `SECRET_KEY` - Change from "changethis" to a secure random string
- `FIRST_SUPERUSER` - Admin email address
- `FIRST_SUPERUSER_PASSWORD` - Change from "changethis" to a secure password

### 5. Start Development Server

```bash
# Start server
fastapi dev app/main.py

# Alternative: using uv
uv run fastapi dev app/main.py --port 8000

# Or using uvicorn directly
uvicorn app.main:app --reload --port 8000
```

The API will be available at:

- **API Documentation**: <http://localhost:8000/docs>
- **Alternative Docs**: <http://localhost:8000/redoc>
- **Health Check**: <http://localhost:8000/health>

## 📦 Available Commands

```bash
# Development server (from app/ directory)
fastapi dev app/main.py

# Development server (from server/ directory)
uv run fastapi dev app/main.py

# Production server
uv run fastapi run app/main.py

# Run tests
uv run pytest

# Database initialization
uv run python -m app.initial_data

# Check code formatting
uv run ruff check

# Format code
uv run ruff format
```

## 🛠️ Tech Stack

- **Framework**: FastAPI with async/await support
- **Database**: MongoDB with AsyncIOMotorClient
- **Authentication**: JWT tokens with bcrypt password hashing
- **Validation**: Pydantic v2 with type validation
- **Configuration**: Pydantic Settings with environment variables
- **Documentation**: Auto-generated OpenAPI/Swagger docs

## 🏗️ Project Structure

```text
server/
├── app/
│   ├── api/
│   │   └── routes/            # API route definitions
│   │       ├── authentication.py  # Auth endpoints
│   │       ├── users.py       # User management
│   │       ├── forms.py       # Form CRUD operations
│   │       └── utils.py       # Utility endpoints
│   ├── core/
│   │   ├── config.py          # Application configuration
│   │   ├── security.py        # JWT and password utilities
│   │   └── db.py             # Database connection
│   ├── models/
│   │   ├── user.py           # User data models
│   │   ├── form.py           # Form data models
│   │   └── token.py          # Token models
│   ├── crud/                 # Database operations
│   ├── schemas/              # Pydantic request/response schemas
│   ├── tests/                # Unit and integration tests
│   ├── initial_data.py       # Database initialization
│   └── main.py              # FastAPI application entry point
├── pyproject.toml           # Python project configuration
├── uv.lock                  # Dependency lock file
└── README.md               # Backend-specific README
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**

    ```bash
    # Check if MongoDB is running
    mongosh --eval "db.runCommand('ping')"

    # Check MongoDB logs
    sudo journalctl -u mongod
    ```

2. **Port Already in Use**

    ```bash
    # Check what's using port 8000
    lsof -i :8000

    # Kill the process
    kill -9 <PID>

    # Or use a different port
    uvicorn app.main:app --port 8001
    ```

3. **Module Import Errors**

    ```bash
    # Reinstall dependencies
    uv sync

    # Or with pip
    pip install -e .
    ```

4. **JWT Secret Key Warning**
    - Change `SECRET_KEY` in `.env` file from "changethis"
    - Use a secure random string (at least 32 characters)

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [MongoDB Python Driver](https://pymongo.readthedocs.io/)
- [Pydantic Documentation](https://docs.pydantic.dev/)

For detailed project information, see the main [README](../README.md).
