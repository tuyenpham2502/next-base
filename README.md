# Next Base - Next.js Application with Clean Architecture

A Next.js project built with Clean Architecture, integrated with modern technologies like React Query, Axios, and TypeScript.

## 🛠 Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack React Query
- **HTTP Client**: Axios
- **Validation**: Zod
- **Date Handling**: Day.js
- **Linting**: ESLint with TypeScript config
- **Code Formatting**: Prettier
- **Git Hooks**: Husky with Commitlint

## ⚡ Key Features

- ✅ **Clean Architecture**: Clear separation between presentation, application, domain and infrastructure layers
- ✅ **Authentication**: Complete login/registration system
- ✅ **User Management**: CRUD operations for users
- ✅ **Type Safety**: TypeScript strict mode with Zod validation
- ✅ **Modern UI**: Responsive design with Tailwind CSS
- ✅ **Configuration Management**: Environment variables with validation
- ✅ **Error Handling**: Centralized error management
- ✅ **Code Quality**: ESLint + Prettier + Husky pre-commit hooks

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── application/           # Application Layer
│   ├── dto/              # Data Transfer Objects
│   ├── exceptions/       # Custom exceptions
│   ├── repositories/     # Repository interfaces
│   └── services/         # Application services
├── domain/               # Domain Layer
│   └── models/          # Domain models/entities
├── infrastructure/       # Infrastructure Layer
│   ├── hooks/           # Custom React hooks
│   ├── http/            # HTTP client setup
│   ├── repositories/    # Repository implementations
│   └── services/        # Infrastructure services
├── presentation/         # Presentation Layer
│   ├── components/      # Reusable components
│   ├── features/        # Feature-specific components
│   ├── hooks/           # Presentation hooks
│   └── layouts/         # Layout components
├── shared/              # Shared utilities
│   ├── constants/       # App constants
│   ├── enums/          # TypeScript enums
│   ├── helpers/        # Utility functions
│   └── types/          # Shared type definitions
└── di/                  # Dependency Injection
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm

### Installation

1. **Clone repository**

```bash
git clone <repository-url>
cd next-base
```

2. **Install dependencies**

```bash
yarn install
# or
npm install
```

3. **Install Git hooks**

```bash
yarn prepare
```

4. **Create environment file**

```bash
cp .env.example .env.local
```

### Running the Project

```bash
# Development server with Turbopack
yarn dev

# Build production
yarn build

# Start production server
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🧪 Useful Scripts

```bash
# Linting and formatting
yarn check          # Run all checks (lint, type, format)
yarn fix            # Automatically fix all issues

yarn check:lint     # Check ESLint
yarn check:type     # Check TypeScript
yarn check:format   # Check Prettier

yarn fix:lint       # Fix ESLint issues
yarn fix:format     # Format code with Prettier
```

## 🔧 Configuration

### Environment Variables

The project uses `@t3-oss/env-nextjs` to manage environment variables in a type-safe way.

- Copy `.env.example` to `.env.local`
- Update values according to development/production environment
- Add validation schema in `src/env.ts`

### ESLint & Prettier

- **ESLint**: Configured with `eslint.config.mjs`
- **Prettier**: Configured with `.prettierrc` and `.prettierignore`
- **Husky**: Pre-commit hooks automatically run linting

## 📖 API Reference

### Authentication Endpoints

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user info

### User Management

- `GET /api/users` - Get users list
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🏗 Architecture and Patterns

### Clean Architecture

The project follows Clean Architecture principles with these layers:

- **Presentation Layer** (`presentation/`): React components, hooks, layouts
- **Application Layer** (`application/`): Business logic, DTOs, repositories interfaces
- **Domain Layer** (`domain/`): Core business models and entities
- **Infrastructure Layer** (`infrastructure/`): External concerns like HTTP, storage

### Dependency Injection

Uses React Context to implement Dependency Injection pattern in `src/di/`.

### Repository Pattern

Separates data access logic with Repository pattern:

- Interfaces in `application/repositories/`
- Implementations in `infrastructure/repositories/`

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Create Pull Request

## 📝 Commit Convention

The project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat: add user management
fix: resolve login validation
docs: update API documentation
```

## 📄 License

This project uses MIT License - see [LICENSE](LICENSE) file for more details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [TanStack Query](https://tanstack.com/query/) - Data fetching
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) - Architecture pattern
