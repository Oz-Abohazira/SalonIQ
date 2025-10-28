# 💇‍♀️ SalonIQ - Modern Salon Management Platform

Welcome to SalonIQ! This is a comprehensive salon management system I built to solve the everyday challenges that salon owners and customers face. After seeing how outdated booking systems frustrated both clients and salon staff, I decided to create something better.

## 🎯 What Problem Does This Solve?

As someone who's experienced the pain of calling salons during busy hours only to be put on hold, or trying to remember when my last appointment was, I wanted to build a solution that makes salon management seamless for everyone involved.

**For Customers:**
- No more phone tag - book appointments anytime, anywhere
- Clear service descriptions and pricing upfront
- Easy profile management with appointment history

**For Salon Owners:**
- Streamlined service management
- Real-time booking oversight
- Professional admin dashboard
- Automated appointment tracking

## 🌟 Key Features

### 🎨 Client Application (Frontend)
- **Smart Service Discovery** - Browse services by category with beautiful, responsive design
- **Intelligent Address Input** - Auto-complete addresses using LocationIQ API for accurate location data
- **Seamless Booking Flow** - From service selection to appointment confirmation in just a few clicks
- **Profile Management** - Customers can update their information and view booking history
- **Mobile-First Design** - Works perfectly on phones, tablets, and desktops

### 👨‍💼 Admin Dashboard
- **Service Management** - Full CRUD operations for services with image uploads
- **Dashboard Overview** - Quick insights into bookings and business metrics
- **Secure Authentication** - JWT-based admin login system
- **Media Management** - Cloudinary integration for professional image handling

### ⚙️ Backend API
- **RESTful Architecture** - Clean, well-documented API endpoints
- **Database Integration** - MongoDB with Mongoose for reliable data storage
- **File Upload System** - Multer middleware for handling service images
- **Security First** - JWT authentication and admin middleware protection
- **Error Handling** - Comprehensive error management and validation

## 🛠️ Technology Choices & Why

I chose this tech stack based on scalability, developer experience, and performance:

**Frontend: React 18 + Vite + Tailwind CSS**
- React for component reusability and state management
- Vite for lightning-fast development and builds
- Tailwind for rapid, consistent styling

**Backend: Node.js + Express.js + MongoDB**
- Node.js for JavaScript everywhere and great npm ecosystem
- Express.js for its simplicity and robust middleware support
- MongoDB for flexible document storage perfect for salon data

**Additional Tools:**
- **LocationIQ API** - Reliable address autocomplete with generous free tier
- **Cloudinary** - Professional image optimization and CDN
- **JWT** - Stateless authentication perfect for modern web apps
- **Mongoose** - Clean MongoDB object modeling

## 🚀 Getting Started

### Prerequisites
Make sure you have these installed:
- Node.js (version 16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Oz-Abohazira/SalonIQ.git
cd SalonIQ
```

2. **Install dependencies for all applications**
```bash
# This installs dependencies for frontend, backend, and admin
npm run install:all
```

3. **Set up your environment variables**

You'll need to create `.env` files in specific directories. Here's what you need:

**Backend Environment (backend/.env)**
```env
PORT=4000


# Cloudinary credentials (sign up at cloudinary.com)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT Secret (use a random string)
JWT_SECRET=your_super_secret_jwt_key

# Admin credentials
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

**Frontend Environment (frontend/.env)**
```env
VITE_BACKEND_URL=http://localhost:4000

# For now this feature is off so it is not needed
# Get free token from locationiq.com - 
VITE_LOCATIONIQ_TOKEN=your_locationiq_token
```

**Admin Environment (admin/.env)**
```env
VITE_BACKEND_URL=http://localhost:4000
```

### Running the Development Environment

I've set up convenient scripts to run everything:

```bash
# Start the backend API server (runs on http://localhost:4000)
npm run dev:backend

# In a new terminal, start the client app (runs on http://localhost:5173)
npm run dev:frontend

# In another terminal, start the admin panel (runs on http://localhost:5174)
npm run dev:admin
```

## 📁 Project Structure

Here's how I organized the codebase:

```
SalonIQ/
├── 📱 frontend/              # Customer-facing React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Main application pages
│   │   ├── context/         # React context for state management
│   │   ├── assets/          # Images, icons, and static files
│   │   └── utils/           # Helper functions
│   └── package.json
├── ⚙️ backend/               # Express.js API server
│   ├── controllers/         # Business logic handlers
│   ├── routes/             # API route definitions
│   ├── middlewares/        # Custom middleware (auth, file upload)
│   ├── models/             # Mongoose database models
│   ├── config/             # Database and third-party service configs
│   └── package.json
├── 👨‍💼 admin/                # Admin dashboard React application
│   ├── src/
│   │   ├── components/      # Admin-specific components
│   │   ├── pages/          # Admin dashboard pages
│   │   └── assets/         # Admin panel assets
│   └── package.json
├── 📄 README.md             # You're reading it!
├── 📦 package.json          # Root package.json with convenience scripts
└── 🚫 .gitignore           # Git ignore rules for all projects
```

## 🔗 API Documentation

### Authentication Endpoints
- `POST /api/admin/login` - Admin authentication

### Service Management
- `GET /api/admin/services` - Retrieve all services
- `POST /api/admin/add-service` - Create new service (requires image upload)
- `PUT /api/admin/service/:id` - Update existing service
- `DELETE /api/admin/service/:id` - Remove service

### Booking System (Coming Soon)
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments` - Get appointment history
- `PUT /api/appointments/:id` - Update appointment status

## 🎨 Design Philosophy

I focused on creating an intuitive user experience:

- **Mobile-First**: Designed for touch devices first, then enhanced for desktop
- **Accessibility**: Proper contrast ratios, keyboard navigation, and screen reader support
- **Performance**: Optimized images, code splitting, and efficient API calls
- **Consistency**: Unified design language across all applications

## 🚧 What's Coming Next

I'm actively working on these features:

- [ ] **Payment Integration** - Stripe/PayPal for online payments
- [ ] **Email Notifications** - Appointment confirmations and reminders
- [ ] **Staff Management** - Multiple stylists and their schedules
- [ ] **Analytics Dashboard** - Revenue tracking and customer insights
- [ ] **SMS Reminders** - Twilio integration for appointment reminders
- [ ] **Calendar Integration** - Google Calendar sync for customers

## 🤝 Contributing

I'd love your help making SalonIQ better! Here's how you can contribute:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and test them thoroughly
4. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Development Guidelines
- Write clean, self-documenting code
- Add comments for complex business logic
- Test your changes across different screen sizes
- Follow the existing code style and patterns

## 🐛 Found a Bug?

If you find a bug, please open an issue with:
- A clear description of the problem
- Steps to reproduce the issue
- Your environment details (browser, OS, etc.)
- Screenshots if applicable

## 📄 License
This project is licensed under the MIT License - feel free to use it for learning, personal projects, or even commercial applications. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
Special thanks to:
- The React team for creating such an amazing framework
- The Express.js community for the robust web framework
- MongoDB for the flexible database solution
- LocationIQ for their reliable geocoding API
- Cloudinary for excellent image management
- The open-source community for endless inspiration

## 📞 Get In Touch

I'm always excited to discuss this project or potential opportunities:

- **Portfolio**: [Go To Website](https://ozabohazira.dev)
- **LinkedIn**: [linkedin.com/in/oz-abohazira](https://linkedin.com/in/oz-abohazira)
- **Email**: [ozabohaziradev@gmail.com](mailto:ozabohaziradev@gmail.com)

---

⭐ **If this project helped you or gave you ideas for your own work, I'd really appreciate a star!**

Built with ❤️ by [Oz Abohazira](https://github.com/Oz-Abohazira)
