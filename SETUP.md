# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

### Frontend
```bash
cd frontend
npm install
```

If you encounter any errors, try:
```bash
npm install --legacy-peer-deps
```

### Backend
```bash
cd backend
npm install
```

## Step 2: Create Environment Files

### Frontend Environment (.env)
Create `frontend/.env` with:
```
VITE_API_URL=http://localhost:5000/api
```

### Backend Environment (.env)
Create `backend/.env` with:
```
PORT=5000
NODE_ENV=development

# MongoDB - Use MongoDB Atlas or local MongoDB
MONGODB_URI=mongodb://localhost:27017/cakebaker
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cakebaker?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d

# Email (Optional - for contact form)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com

# Frontend URL
CLIENT_URL=http://localhost:5173

# Admin Credentials
ADMIN_EMAIL=admin@cakebaker.com
ADMIN_PASSWORD=admin123
```

## Step 3: Seed the Database (Optional)

```bash
cd backend
npm run seed
```

This will create:
- Admin user (admin@cakebaker.com / admin123)
- Sample portfolio items
- Sample testimonials

## Step 4: Start the Servers

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Backend will run on: http://localhost:5000

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

Frontend will run on: http://localhost:5173

## Step 5: Access the Application

- **Website**: http://localhost:5173
- **Admin Login**: http://localhost:5173/admin/login
  - Email: admin@cakebaker.com
  - Password: admin123

## Troubleshooting

### Issue: "Cannot find module vite"
**Solution**: Run `npm install` in the frontend directory

### Issue: "MongoDB connection error"
**Solution**: 
- Make sure MongoDB is running locally, OR
- Use MongoDB Atlas and update MONGODB_URI in backend/.env

### Issue: "Port already in use"
**Solution**: 
- Change PORT in backend/.env to a different port (e.g., 5001)
- Update VITE_API_URL in frontend/.env accordingly

### Issue: Email not sending
**Solution**: 
- Email is optional for development
- For Gmail: Enable 2FA and create an App Password
- Update EMAIL_USER and EMAIL_PASS in backend/.env

## Quick Commands Reference

```bash
# Install all dependencies
cd frontend && npm install && cd ../backend && npm install

# Start both servers (use 2 terminals)
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm run dev

# Seed database
cd backend && npm run seed

# Build for production
cd frontend && npm run build
```

## Default Admin Credentials

⚠️ **IMPORTANT**: Change these after first login!

- Email: admin@cakebaker.com
- Password: admin123

## Need Help?

Check the main README.md for detailed documentation.
