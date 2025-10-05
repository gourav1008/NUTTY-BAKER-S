# 🍰 Cake Baker Portfolio Website

A modern, full-stack MERN application showcasing a cake baker's portfolio with stunning 3D animations and interactive design.

## 🚀 Features

- **3D Interactive Hero Section** with React Three Fiber
- **Responsive Design** - Works on all devices
- **Admin Dashboard** with JWT authentication
- **Dynamic Portfolio** with filters and modal views
- **Contact Form** with email notifications
- **Testimonials Management**
- **Dark/Light Mode Toggle**
- **Smooth Animations** with Framer Motion
- **SEO Optimized** with React Helmet

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM v6
- React Three Fiber (3D animations)
- Tailwind CSS
- Framer Motion
- Axios
- React Helmet

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Nodemailer
- Multer (file uploads)
- bcryptjs

## 📦 Project Structure

```
cake-baker-portfolio/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── portfolioController.js
│   │   ├── testimonialController.js
│   │   ├── contactController.js
│   │   └── statsController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Portfolio.js
│   │   ├── Testimonial.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── portfolio.js
│   │   ├── testimonials.js
│   │   ├── contact.js
│   │   └── stats.js
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3D/
│   │   │   │   ├── CakeModel.jsx
│   │   │   │   └── FloatingElements.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Layout.jsx
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Loader.jsx
│   │   │   └── admin/
│   │   │       ├── Sidebar.jsx
│   │   │       └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Login.jsx
│   │   │       ├── ManagePortfolio.jsx
│   │   │       └── ManageTestimonials.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com

# Frontend URL
CLIENT_URL=http://localhost:5173
```

4. Start the server:
```bash
npm start
# or for development with nodemon
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔐 Default Admin Credentials

After first run, create an admin user by running the seed script or use:
- Email: `admin@cakebaker.com`
- Password: `admin123`

**⚠️ Change these credentials immediately in production!**

## 📧 Email Configuration

For Gmail:
1. Enable 2-Factor Authentication
2. Generate an App Password
3. Use the App Password in `EMAIL_PASS`

## 🚀 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `VITE_API_URL=your_backend_url/api`
4. Deploy

### Backend (Render)

1. Push code to GitHub
2. Create new Web Service in Render
3. Set environment variables (all from .env)
4. Deploy

### Database (MongoDB Atlas)

1. Create cluster
2. Add database user
3. Whitelist IP addresses
4. Copy connection string to `MONGODB_URI`

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color palette:
```js
colors: {
  primary: '#FF6B9D',
  secondary: '#C44569',
  accent: '#FFC6C7',
  // ... add more
}
```

### 3D Models
Replace or modify 3D components in `src/components/3D/`

### Content
Update text content in respective page components

## 📱 API Endpoints

### Public Routes
- `POST /api/contact` - Send contact message
- `GET /api/portfolio` - Get all portfolio items
- `GET /api/portfolio/:id` - Get single item
- `GET /api/testimonials` - Get all testimonials

### Protected Routes (Admin)
- `POST /api/auth/login` - Admin login
- `POST /api/portfolio` - Create portfolio item
- `PUT /api/portfolio/:id` - Update portfolio item
- `DELETE /api/portfolio/:id` - Delete portfolio item
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial
- `GET /api/stats` - Get dashboard statistics

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the developer.

## 🎉 Acknowledgments

- React Three Fiber community
- Tailwind CSS team
- MERN Stack developers

---

**Built with ❤️ and lots of 🍰**
