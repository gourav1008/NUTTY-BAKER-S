# Admin Panel Access Guide

## 🔐 How to Access the Admin Panel

---

## Quick Start

### Step 1: Start the Application

```bash
# Terminal 1 - Start Backend
cd backend
npm start

# Terminal 2 - Start Frontend
cd frontend
npm run dev
```

### Step 2: Navigate to Admin Login

Open your browser and go to:
```
http://localhost:5173/admin/login
```

### Step 3: Login with Default Credentials

**Default Admin Credentials:**
```
Email:    admin@cakebaker.com
Password: admin123
```

⚠️ **Important:** Change the password after first login!

---

## 📋 Admin Routes Available

### Public Route (No Authentication Required)
- **`/admin/login`** - Admin login page

### Protected Routes (Authentication Required)
- **`/admin/dashboard`** - Main admin dashboard
- **`/admin/portfolio`** - Manage cake portfolio
- **`/admin/testimonials`** - Manage client testimonials
- **`/admin/contacts`** - View contact messages

---

## 🎯 Admin Panel Features

### 1. Dashboard (`/admin/dashboard`)
```
┌─────────────────────────────────────────┐
│         Admin Dashboard                 │
├─────────────────────────────────────────┤
│                                         │
│  Statistics Overview:                   │
│  • Total Portfolio Items                │
│  • Total Testimonials                   │
│  • Pending Messages                     │
│  • Recent Activity                      │
│                                         │
│  Quick Actions:                         │
│  [Manage Portfolio]                     │
│  [Manage Testimonials]                  │
│  [View Messages]                        │
│                                         │
└─────────────────────────────────────────┘
```

### 2. Manage Portfolio (`/admin/portfolio`)
- ✅ View all cakes
- ✅ Add new cake
- ✅ Edit existing cake
- ✅ Delete cake
- ✅ Upload images (up to 5 per cake)
- ✅ Set categories, pricing, servings

### 3. Manage Testimonials (`/admin/testimonials`)
- ✅ View all testimonials
- ✅ Approve/reject testimonials
- ✅ Edit testimonials
- ✅ Delete testimonials
- ✅ Feature testimonials

### 4. View Contacts (`/admin/contacts`)
- ✅ View all contact messages
- ✅ Mark as read/unread
- ✅ Reply to messages
- ✅ Delete messages
- ✅ Filter by status

---

## 🔒 Authentication Flow

```
┌─────────────────────────────────────────────────────┐
│ User navigates to /admin/login                      │
│ ↓                                                   │
│ Enters email and password                           │
│ ↓                                                   │
│ Frontend sends credentials to backend               │
│ ↓                                                   │
│ Backend validates credentials                       │
│ ↓                                                   │
│ ┌─────────────┐         ┌──────────────┐           │
│ │ Valid       │    OR   │ Invalid      │           │
│ └─────────────┘         └──────────────┘           │
│       ↓                        ↓                    │
│ Returns JWT token        Returns error              │
│       ↓                        ↓                    │
│ Token stored in          Shows error message        │
│ localStorage                                        │
│       ↓                                             │
│ Redirects to /admin/dashboard                       │
│       ↓                                             │
│ ProtectedRoute checks authentication                │
│       ↓                                             │
│ Dashboard loads                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🛡️ Protected Route System

The `ProtectedRoute` component protects admin pages:

```javascript
// How it works:
1. Check if user is authenticated
2. If loading → Show loader
3. If not authenticated → Redirect to /admin/login
4. If authenticated → Show requested page
```

### What Gets Checked:
- ✅ Valid JWT token in localStorage
- ✅ Token not expired
- ✅ User has admin role

---

## 🔑 Creating Admin Account

### Method 1: Using Seed Script (Recommended)

```bash
cd backend
npm run seed
```

This creates:
- **Email:** `admin@cakebaker.com`
- **Password:** `admin123` (or from .env)
- **Role:** admin

### Method 2: Using Environment Variables

Create/edit `.env` file in backend:
```env
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
```

Then run seed:
```bash
npm run seed
```

### Method 3: Manual Registration (If Already Logged In)

Once logged in as admin, you can create additional admins:
```
POST /api/auth/register
Headers: Authorization: Bearer <token>
Body: {
  "name": "New Admin",
  "email": "newadmin@example.com",
  "password": "securepassword",
  "role": "admin"
}
```

---

## 🚀 First Time Setup

### Complete Setup Process:

1. **Clone/Setup Project**
   ```bash
   git clone <repository>
   cd cake-baker-portfolio
   ```

2. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Configure Environment**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your settings
   ```

4. **Seed Database**
   ```bash
   npm run seed
   ```

5. **Start Application**
   ```bash
   # Terminal 1
   cd backend
   npm start
   
   # Terminal 2
   cd frontend
   npm run dev
   ```

6. **Access Admin Panel**
   - Open: `http://localhost:5173/admin/login`
   - Login with credentials from seed output
   - Change password immediately!

---

## 🔐 Security Best Practices

### 1. Change Default Password
```
1. Login with default credentials
2. Go to Profile/Settings
3. Update password
4. Use strong password (min 8 chars, mixed case, numbers, symbols)
```

### 2. Secure Your .env File
```env
# Never commit these to git!
JWT_SECRET=your-very-long-random-secret-key
ADMIN_EMAIL=your-secure-email@domain.com
ADMIN_PASSWORD=your-very-secure-password
```

### 3. Token Expiration
- Tokens expire after 30 days (configurable)
- Logout and login again if expired
- Automatic redirect to login on expiration

---

## 🐛 Troubleshooting

### Issue 1: Can't Access Admin Login Page

**Problem:** Page not found  
**Solution:**
```bash
# Check frontend is running
cd frontend
npm run dev

# Check URL is correct
http://localhost:5173/admin/login
```

### Issue 2: Login Fails with "Invalid Credentials"

**Problem:** Wrong email/password  
**Solution:**
```bash
# Re-run seed to reset admin account
cd backend
npm run seed

# Use credentials shown in output
```

### Issue 3: Redirected to Login After Successful Login

**Problem:** Token not being saved  
**Solution:**
```javascript
// Check browser console for errors
// Clear localStorage
localStorage.clear();

// Try login again
```

### Issue 4: "Unauthorized" Error

**Problem:** Token expired or invalid  
**Solution:**
```bash
# Logout and login again
# Or clear localStorage and login
localStorage.removeItem('token');
localStorage.removeItem('user');
```

### Issue 5: Backend Not Running

**Problem:** Can't connect to API  
**Solution:**
```bash
# Check backend is running
cd backend
npm start

# Check port (default: 5000)
# Backend should be at: http://localhost:5000
```

---

## 📱 Admin Panel Navigation

### From Navbar (When Logged In)
```
┌─────────────────────────────────────┐
│  Logo    Home  Portfolio  Contact  │
│                      [Dashboard] →  │
└─────────────────────────────────────┘
```

### Dashboard Quick Actions
```
┌─────────────────────────────┐
│  Quick Actions              │
├─────────────────────────────┤
│  [Manage Portfolio]         │
│  [Manage Testimonials]      │
│  [View Messages]            │
│  [Logout]                   │
└─────────────────────────────┘
```

---

## 🎯 Admin Capabilities

### Portfolio Management
- ✅ Create new cake entries
- ✅ Upload multiple images
- ✅ Set pricing and details
- ✅ Categorize cakes
- ✅ Feature cakes on homepage
- ✅ Edit existing entries
- ✅ Delete entries

### Testimonial Management
- ✅ Review submitted testimonials
- ✅ Approve/reject reviews
- ✅ Edit testimonial content
- ✅ Feature on homepage
- ✅ Delete testimonials

### Contact Management
- ✅ View all inquiries
- ✅ Mark as read/unread
- ✅ Respond to messages
- ✅ Track message status
- ✅ Delete old messages

### Analytics & Stats
- ✅ View total items
- ✅ Track pending items
- ✅ Monitor activity
- ✅ View statistics

---

## 🔄 Session Management

### Token Storage
```javascript
// Token stored in localStorage
localStorage.setItem('token', 'jwt-token-here');
localStorage.setItem('user', JSON.stringify(userData));
```

### Auto-Logout Scenarios
- ✅ Token expires (30 days)
- ✅ Manual logout
- ✅ Invalid token detected
- ✅ 401 Unauthorized response

### Staying Logged In
- Token persists across browser sessions
- Automatic token refresh (if implemented)
- Remember login state

---

## 📊 Admin Dashboard Overview

```
╔═══════════════════════════════════════════════════╗
║              ADMIN DASHBOARD                      ║
╠═══════════════════════════════════════════════════╣
║                                                   ║
║  Welcome, Admin!                                  ║
║                                                   ║
║  ┌──────────┐  ┌──────────┐  ┌──────────┐       ║
║  │    25    │  │    18    │  │     5    │       ║
║  │  Cakes   │  │ Reviews  │  │ Messages │       ║
║  └──────────┘  └──────────┘  └──────────┘       ║
║                                                   ║
║  Recent Activity:                                 ║
║  • New message from John Doe                      ║
║  • Testimonial submitted by Sarah                 ║
║  • Portfolio item updated                         ║
║                                                   ║
║  Quick Actions:                                   ║
║  [+ Add New Cake]  [View Messages]               ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
```

---

## 🎓 Quick Reference

### URLs
```
Login:        http://localhost:5173/admin/login
Dashboard:    http://localhost:5173/admin/dashboard
Portfolio:    http://localhost:5173/admin/portfolio
Testimonials: http://localhost:5173/admin/testimonials
Contacts:     http://localhost:5173/admin/contacts
```

### Default Credentials
```
Email:    admin@cakebaker.com
Password: admin123
```

### API Endpoints
```
Login:  POST /api/auth/login
Me:     GET  /api/auth/me
Logout: Clear localStorage
```

---

## ✅ Checklist for First Login

- [ ] Backend is running (`npm start`)
- [ ] Frontend is running (`npm run dev`)
- [ ] Database is seeded (`npm run seed`)
- [ ] Navigate to `/admin/login`
- [ ] Enter default credentials
- [ ] Successfully login
- [ ] Redirected to dashboard
- [ ] Change password
- [ ] Explore admin features

---

## 🆘 Need Help?

### Check These First:
1. ✅ Both backend and frontend running?
2. ✅ Database seeded with admin user?
3. ✅ Using correct URL and credentials?
4. ✅ Browser console for errors?
5. ✅ Network tab for API calls?

### Common Commands:
```bash
# Reset everything
cd backend
npm run seed

# Check if backend is running
curl http://localhost:5000/api/health

# Clear browser data
localStorage.clear();
```

---

**Last Updated:** October 5, 2025  
**Version:** 1.0.0  
**Status:** Production Ready

**Quick Start:** Run `npm run seed` in backend, then login at `/admin/login` with `admin@cakebaker.com` / `admin123`
