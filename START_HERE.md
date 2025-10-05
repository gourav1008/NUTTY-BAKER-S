# 🎉 Ready to Start!

## ✅ Setup Complete!

All dependencies are installed. Now follow these steps:

## Step 1: Configure MongoDB

You have two options:

### Option A: Use MongoDB Atlas (Recommended - Free & Easy)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Open `backend/.env` and replace the MONGODB_URI with your connection string

### Option B: Use Local MongoDB
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. The default URI in `backend/.env` should work: `mongodb://localhost:27017/cakebaker`

## Step 2: Update Backend Environment

Edit `backend/.env` and update:
```
MONGODB_URI=your_mongodb_connection_string_here
```

**Optional**: If you want email functionality, add your Gmail credentials:
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

## Step 3: Seed the Database (Optional but Recommended)

This creates sample data and an admin user:

```powershell
cd backend
npm run seed
```

This will create:
- ✅ Admin user (admin@cakebaker.com / admin123)
- ✅ 4 sample cakes
- ✅ 3 sample testimonials

## Step 4: Start the Servers

### Terminal 1 - Start Backend:
```powershell
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected
```

### Terminal 2 - Start Frontend:
```powershell
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Step 5: Open the Application

1. **Website**: http://localhost:5173
2. **Admin Panel**: http://localhost:5173/admin/login
   - Email: `admin@cakebaker.com`
   - Password: `admin123`

## 🎨 What You'll See

- **Home Page**: Beautiful 3D cake animation with hero section
- **Portfolio**: Browse cake gallery with filters
- **Services**: View pricing and services
- **Contact**: Working contact form
- **Admin Dashboard**: Manage cakes, testimonials, and messages

## 🐛 Troubleshooting

### "MongoDB connection error"
- Make sure MongoDB is running (if using local)
- Or use MongoDB Atlas (cloud) - it's free!
- Check your MONGODB_URI in backend/.env

### "Port 5000 already in use"
- Change PORT in backend/.env to 5001
- Update VITE_API_URL in frontend/.env to http://localhost:5001/api

### Frontend not loading
- Make sure backend is running first
- Check that VITE_API_URL in frontend/.env matches your backend port

## 📝 Quick Commands

```powershell
# Start backend
cd backend && npm run dev

# Start frontend (in new terminal)
cd frontend && npm run dev

# Seed database
cd backend && npm run seed

# Build for production
cd frontend && npm run build
```

## 🎯 Next Steps

1. Customize the content in the pages
2. Add your own cake images
3. Update business information in `frontend/src/utils/constants.js`
4. Change admin password after first login
5. Deploy to Vercel (frontend) and Render (backend)

## 🚀 You're All Set!

Enjoy your beautiful cake portfolio website! 🍰
