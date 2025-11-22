# AuraPay 💳

**The Future of Digital Finance** - A next-generation fintech application built with modern web technologies, offering seamless transactions, intelligent card management, and secure banking—all in one elegant platform.

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-Private-red)

## ✨ Features

### 🏦 Core Banking Features
- **User Authentication** - Secure login/signup with Better Auth
- **Real-time Balance Management** - Track and manage your account balance
- **Top-up Functionality** - Add funds to your account with simulated payment processing
- **Transaction History** - Complete record of all financial activities

### 💳 Card Management
- **Virtual & Physical Cards** - Support for both card types
- **Custom Card Naming** - Personalize your cards with custom names
- **Card Controls** - Block/unblock cards instantly
- **Card Balance Tracking** - Monitor individual card balances
- **Secure Card Details** - CVV and card number protection

### 👨‍💼 Admin Portal
- **User Management** - Comprehensive admin dashboard
- **Transaction Monitoring** - Oversee all platform transactions
- **Analytics & Insights** - Smart analytics for business intelligence

### 🎨 User Experience
- **Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- **Dark Mode Support** - Built-in theme switching
- **Real-time Updates** - Instant feedback on all operations
- **Mobile Responsive** - Optimized for all device sizes
- **Animated Landing Page** - Stunning video background with smooth animations

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Component Library**: [Radix UI](https://www.radix-ui.com/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

### Backend
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **Password Hashing**: [@node-rs/bcrypt](https://github.com/napi-rs/node-rs)
- **API**: Next.js API Routes

### Development Tools
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Linting**: [ESLint](https://eslint.org/)
- **Package Manager**: pnpm (recommended)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 20.x or higher
- **pnpm** (recommended) or npm/yarn
- **PostgreSQL** database

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd aurapay
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/aurapay"
   
   # Better Auth
   BETTER_AUTH_SECRET="your-secret-key-here"
   BETTER_AUTH_URL="http://localhost:3000"
   
   # Add other required environment variables
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
aurapay/
├── app/                      # Next.js App Router
│   ├── (admin)/             # Admin portal routes
│   ├── (auth)/              # Authentication routes
│   ├── (user)/              # User dashboard routes
│   ├── api/                 # API routes
│   │   ├── admin/          # Admin API endpoints
│   │   ├── auth/           # Auth API endpoints
│   │   ├── balance/        # Balance management
│   │   ├── cards/          # Card management
│   │   ├── profile/        # User profile
│   │   └── change-password/ # Password management
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/              # React components
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions
│   ├── auth.ts             # Auth configuration
│   ├── auth-client.ts      # Auth client utilities
│   └── utils.ts            # Helper functions
├── prisma/                  # Database schema & migrations
│   ├── schema.prisma       # Prisma schema
│   └── migrations/         # Database migrations
├── public/                  # Static assets
└── package.json            # Dependencies & scripts
```

## 🗄️ Database Schema

### Models
- **User** - User accounts with balance, profile info, and role
- **Session** - User sessions for authentication
- **Account** - OAuth and credential accounts
- **Card** - Virtual and physical cards with balance and status
- **Transaction** - Transaction history (deposits, withdrawals, transfers, payments)
- **Verification** - Email/phone verification tokens

## 🔐 Authentication

AuraPay uses [Better Auth](https://www.better-auth.com/) for secure authentication with the following features:
- Email/password authentication
- Session management
- Password hashing with bcrypt
- Secure token handling

### User Roles
- **User** - Standard user with access to dashboard and card management
- **Admin** - Administrative access to user management and analytics

## 🎨 UI Components

Built with [Radix UI](https://www.radix-ui.com/) primitives for accessibility and customization:
- Dialogs & Modals
- Dropdowns & Menus
- Forms & Inputs
- Cards & Layouts
- Tooltips & Popovers
- And many more...

## 📱 Key Pages

### Public
- **Landing Page** (`/`) - Animated hero section with video background
- **Login** (`/login`) - User authentication
- **Sign Up** (`/signup`) - New user registration

### User Dashboard
- **Dashboard** - Account overview with balance and recent transactions
- **Cards** - Manage virtual and physical cards
- **Transactions** - View transaction history
- **Top-up** - Add funds to account
- **Profile** - Manage user profile and settings

### Admin Portal
- **Admin Login** (`/admin/login`) - Secure admin authentication
- **Admin Dashboard** - User management and analytics
- **User Management** - View and manage all users
- **Transaction Monitoring** - Oversee platform transactions

## 🧪 Development

### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Prisma commands
npx prisma studio          # Open Prisma Studio
npx prisma generate        # Generate Prisma Client
npx prisma migrate dev     # Create and apply migrations
npx prisma db push         # Push schema changes without migrations
```

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Consistent component structure
- Modular and reusable components

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

### Other Platforms
- **Railway** - Easy PostgreSQL hosting
- **Render** - Full-stack deployment
- **AWS/GCP/Azure** - Enterprise deployment

### Environment Variables
Make sure to set all required environment variables in your deployment platform:
- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`

## 🔒 Security Features

- **Password Hashing** - Secure password storage with bcrypt
- **Session Management** - Secure session handling
- **SQL Injection Protection** - Prisma ORM prevents SQL injection
- **XSS Protection** - React's built-in XSS protection
- **CSRF Protection** - Better Auth CSRF tokens
- **Environment Variables** - Sensitive data in environment variables

## 🤝 Contributing

This is a private project. If you have access and would like to contribute:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Better Auth](https://www.better-auth.com/) - Authentication for TypeScript

## 📞 Support

For support, please contact the development team.

---

**Built with ❤️ using Next.js and modern web technologies**

*© 2025 AuraPay. Powered by next-generation fintech.*
