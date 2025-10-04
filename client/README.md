# Form Builder Studio - Frontend

Modern Next.js application providing an intuitive drag-and-drop form builder interface.

## About

This frontend delivers a responsive, type-safe React application with form building capabilities, user authentication, and real-time preview functionality using the latest Next.js and React features.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env.local

# Start development server
npm run dev
```

🌐 **Application**: <http://localhost:3000>  
⚡ **Powered by**: Next.js 15 + Turbopack

## Documentation

- 📖 **[Detailed Setup Guide](./INSTALL.md)** - Complete installation instructions
- 🏠 **[Main Project README](../README.md)** - Project overview and full documentation  
- 🔧 **[Backend README](../server/README.md)** - API server setup

## Tech Stack

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Redux Toolkit**: Predictable state management
- **Radix UI**: Accessible component primitives

## Key Features

- Drag-and-drop form builder (planned)
- Real-time form preview
- JWT authentication integration
- Responsive design with dark mode
- Server and client components
- Type-safe API integration

## Available Scripts

- `npm run dev` - Development server with Turbopack
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Code linting

## Project Structure

```text
client/
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── (auth)/     # Authentication pages
│   │   └── dashboard/  # Main application
│   ├── components/     # React components
│   │   ├── ui/        # Base UI components
│   │   └── forms/     # Form builder components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utilities and API client
│   └── store/         # Redux store configuration
├── public/            # Static assets
└── INSTALL.md        # Detailed setup guide
```

## Contributing

Please refer to the main project [README](../README.md) for contribution guidelines.
