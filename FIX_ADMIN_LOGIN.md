# Fix Admin Login - Complete Guide

## 🔧 Quick Fix (Run These Commands)

```bash
# Step 1: Go to backend folder
cd backend

# Step 2: Run diagnostic script
npm run diagnose

# Step 3: If issues found, run seed
npm run seed

# Step 4: Try logging in
# Email: admin@cakebaker.com
# Password: admin123
```

---

## 🎯 Most Common Issues & Solutions

### Issue 1: Admin User Doesn't Exist

**Symptoms:**
- "Invalid credentials" error
- Can't login with any password

**Solution:**
```bash
cd backend
npm run seed
```

### Issue 2: JWT_SECRET Missing

**Symptoms:**
- Server crashes on login
- "JWT_SECRET is not defined" error

**Solution:**
Create/edit `.env` file in backend:
```env
JWT_SECRET=your-super-secret-key-min-32-characters-long
JWT_EXPIRE=7d
MONGODB_URI=mongodb://localhost:27017/cakebaker
ADMIN_EMAIL=admin@cakebaker.com
ADMIN_PASSWORD=admin123
```

### Issue 3: Wrong Password

**Symptoms:**
- "Invalid credentials" despite correct email

**Solution:**
```bash
cd backend
npm run seed  # This resets password to admin123
```

### Issue 4: Database Not Connected

**Symptoms:**
- "MongoDB connection error"
- Can't reach database

**Solution:**
Check MongoDB is running:
```bash
# For local MongoDB
mongod

# Or check connection string in .env
MONGODB_URI=mongodb://localhost:27017/cakebaker
```

---

## 📋 Step-by-Step Diagnostic

### Step 1: Run Diagnostic Script

```bash
cd backend
npm run diagnose
```

This will check:
- ✅ Environment variables
- ✅ Database connection
- ✅ Admin user exists
- ✅ Password verification
- ✅ JWT configuration

### Step 2: Check Output

**If you see:**
```
✅ Admin user found
✅ Password verification successful
✅ JWT_SECRET is configured
```
→ Everything is working! Try logging in.

**If you see:**
```
❌ Admin user not found
```
→ Run: `npm run seed`

**If you see:**
```
❌ Password verification failed
```
→ Script will auto-fix it

**If you see:**
```
❌ JWT_SECRET is missing
```
→ Add to .env file

---

## 🔐 Manual Password Reset

If you need to manually reset the password:

```javascript
// In MongoDB shell or Compass
use cakebaker

// Update password (will be hashed automatically on next login attempt)
db.users.updateOne(
  { email: 'admin@cakebaker.com' },
  { $set: { password: '$2a$10$...' } }  // Use hashed password
)

// Or just re-seed
```

Better: Just run `npm run seed`

---

## 🧪 Test Login Manually

### Using cURL:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cakebaker.com","password":"admin123"}'
```

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "...",
    "name": "Admin",
    "email": "admin@cakebaker.com",
    "role": "admin",
    "token": "eyJhbGc..."
  }
}
```

### Using Browser Console:

```javascript
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@cakebaker.com',
    password: 'admin123'
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## ✅ Verification Checklist

- [ ] Backend running (`npm run dev`)
- [ ] Frontend running (`npm run dev`)
- [ ] Database connected (check backend console)
- [ ] Admin user exists (`npm run diagnose`)
- [ ] JWT_SECRET in .env
- [ ] Correct email: `admin@cakebaker.com`
- [ ] Correct password: `admin123`
- [ ] No CORS errors in browser console
- [ ] Network request shows 200 OK

---

## 🚀 Complete Reset (Nuclear Option)

If nothing works, do a complete reset:

```bash
# 1. Stop all servers
# Press Ctrl+C in both terminals

# 2. Clear database
cd backend
mongosh
use cakebaker
db.dropDatabase()
exit

# 3. Re-seed
npm run seed

# 4. Clear browser data
# In browser console:
localStorage.clear()

# 5. Restart servers
npm run dev  # In backend
npm run dev  # In frontend (new terminal)

# 6. Try login
# Go to: http://localhost:5173/admin/login
# Email: admin@cakebaker.com
# Password: admin123
```

---

## 📞 Still Not Working?

### Check These:

1. **Backend Console** - Any errors?
2. **Browser Console** - Any errors?
3. **Network Tab** - What's the response?
4. **Database** - Is MongoDB running?

### Get Detailed Logs:

Add to `backend/controllers/authController.js` line 59:

```javascript
export const login = async (req, res) => {
  console.log('🔐 Login attempt:', req.body.email);  // ADD THIS
  try {
    const { email, password } = req.body;
    console.log('📧 Email:', email);  // ADD THIS
    console.log('🔑 Password received:', password ? 'Yes' : 'No');  // ADD THIS
    
    // ... rest of code
```

---

## 🎯 Expected Login Flow

```
1. User enters credentials
   ↓
2. POST /api/auth/login
   ↓
3. Backend finds user by email
   ↓
4. Backend compares password
   ↓
5. Backend generates JWT token
   ↓
6. Frontend receives token
   ↓
7. Token saved to localStorage
   ↓
8. Redirect to /admin/dashboard
   ↓
9. ProtectedRoute checks token
   ↓
10. Dashboard loads
```

---

## 📝 Default Credentials

```
Email:    admin@cakebaker.com
Password: admin123
```

**Change these after first login!**

---

**Created:** 2025-10-05
**Status:** Ready to Use
**Run:** `npm run diagnose` in backend folder
