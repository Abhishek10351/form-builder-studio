# Frontend Installation Guide

This guide will help you set up and run the Form Builder Studio frontend application.

## 📋 Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: For cloning the repository

## 🚀 Quick Start

### 1. Clone the Repository (if not already done)

```bash
git clone https://github.com/Abhishek10351/form-builder-studio.git
cd form-builder-studio/client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file and configure it:

```bash
# Copy example environment file
cp .env.example .env.local

# Edit with your backend URL
nano .env.local
```

Required variables:
- `NEXT_PUBLIC_API_URL` - Your backend API URL (default: http://localhost:8000)

Optional variables:
- `NEXT_PUBLIC_APP_NAME` - Application name for branding
- `NEXT_PUBLIC_TOKEN_KEY` - JWT token storage key

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **React**: Version 19.1.0
- **TypeScript**: For type safety
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## 🏗️ Project Structure

```
client/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication routes
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   ├── loading.tsx        # Global loading UI
│   │   ├── error.tsx          # Global error UI
│   │   └── not-found.tsx      # 404 page
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components
│   │   ├── forms/            # Form-related components
│   │   └── layout/           # Layout components
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility libraries
│   │   ├── api.ts           # API configuration
│   │   ├── auth.ts          # Authentication utilities
│   │   └── utils.ts         # General utilities
│   └── store/               # Redux store setup
├── public/                  # Static assets
├── components.json          # shadcn/ui configuration
├── tailwind.config.ts       # Tailwind configuration
└── next.config.ts          # Next.js configuration
```

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS v4 with custom animations and utilities. Configuration is in `tailwind.config.ts`.

### ESLint

ESLint is configured for Next.js with TypeScript. Run `npm run lint` to check for issues.

### TypeScript

TypeScript configuration is in `tsconfig.json` with strict mode enabled.

## 🌐 Environment Variables

### Required Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:8000)

### Optional Variables

- `NEXT_PUBLIC_TOKEN_KEY` - JWT token storage key (default: access_token)
- `NEXT_PUBLIC_APP_NAME` - Application name for branding
- `NEXT_PUBLIC_APP_VERSION` - Application version

### Environment Files

- `.env.local` - Local development (not committed)
- `.env.example` - Example environment file (create this for your team)

## 📱 Features

- **Authentication**: JWT-based with Redux state management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Builder**: Drag-and-drop form creation interface
- **Real-time Preview**: Live form preview as you build
- **Form Management**: Save, edit, and organize forms
- **Dark Mode**: Built-in theme switching
- **Error Handling**: Comprehensive error boundaries and user feedback

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's running on port 3000
   lsof -i :3000
   # Kill the process if needed
   kill -9 <PID>
   ```

2. **Module Not Found Errors**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build Errors**
   ```bash
   # Check TypeScript errors
   npx tsc --noEmit
   # Check ESLint issues
   npm run lint
   ```

### Performance Optimization

- Enable Turbopack for faster development: `npm run dev`
- Use `next/image` for optimized images
- Implement code splitting with dynamic imports
- Use React.memo for expensive components

### Browser Compatibility

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

## 🔐 Security

- All API calls use JWT authentication
- Environment variables for sensitive data
- CORS protection
- XSS protection with Next.js built-ins
- Content Security Policy headers

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Hook Form Documentation](https://react-hook-form.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run lint`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.