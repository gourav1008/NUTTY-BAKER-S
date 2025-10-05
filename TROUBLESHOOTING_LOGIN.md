# Troubleshooting Admin Login

## ❌ Error: "warmup.html:1 Unchecked runtime.lastError"

### What This Error Means

This is **NOT an error with your application**. It's a browser extension trying to communicate with the page.

```
warmup.html:1 Unchecked runtime.lastError: 
Could not establish connection. Receiving end does not exist.
```

**Source:** Browser extension (usually Grammarly, LastPass, or similar)  
**Impact:** None - Your app works fine  
**Action:** Can be safely ignored

---

## ✅ How to Verify Login is Working

### Step 1: Check Network Tab

1. Open DevTools (F12)
2. Go to **Network** tab
3. Try logging in
4. Look for request to: `POST /api/auth/login`

**Expected Response:**
```json
{
  "status": "success",
  "data": {
    "_id": "...",
    "name": "Admin",
    "email": "admin@cakebaker.com",
    "role": "admin",
    "token": "jwt-token-here"
  }
}
```

### Step 2: Check Console (Filter Out Extension Errors)

1. Open DevTools (F12)
2. Go to **Console** tab
3. Type in filter box: `-warmup -extension`
4. Try logging in
5. Look for real errors (if any)

### Step 3: Check localStorage

After successful login, check:
```javascript
// In Console tab, type:
localStorage.getItem('token')
localStorage.getItem('user')
```

Should return:
- `token`: JWT string
- `user`: JSON object with user data

---

## 🔧 Solutions for Extension Error

### Solution 1: Ignore It ✅ (Recommended)
The error is harmless. Your login will work fine.

### Solution 2: Test in Incognito Mode
```
Chrome: Ctrl + Shift + N
Firefox: Ctrl + Shift + P
Edge: Ctrl + Shift + N
```
Extensions are disabled by default in incognito.

### Solution 3: Disable Specific Extensions

**Common culprits:**
- ✅ Grammarly
- ✅ LastPass / 1Password
- ✅ Honey
- ✅ Ad blockers
- ✅ React DevTools
- ✅ Redux DevTools

**How to disable:**
1. Go to `chrome://extensions`
2. Toggle off extensions one by one
3. Refresh page and test

### Solution 4: Filter Console Errors

Add this to your console filter:
```
-warmup -extension -chrome-extension
```

---

## 🐛 Real Login Issues (If Login Actually Fails)

### Issue 1: Backend Not Running

**Symptoms:**
- Network error
- "Failed to fetch"
- ERR_CONNECTION_REFUSED

**Solution:**
```bash
cd backend
npm start
```

**Verify backend is running:**
```bash
curl http://localhost:5000/api/health
# or visit in browser
```

### Issue 2: Wrong Credentials

**Symptoms:**
- "Invalid credentials" error
- 401 Unauthorized

**Solution:**
```bash
# Reset admin account
cd backend
npm run seed

# Use credentials from output:
# Email: admin@cakebaker.com
# Password: admin123
```

### Issue 3: CORS Error

**Symptoms:**
- "CORS policy" error in console
- "Access-Control-Allow-Origin" error

**Solution:**
Check backend `.env`:
```env
CLIENT_URL=http://localhost:5173
```

And backend CORS config:
```javascript
// Should allow frontend URL
cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
})
```

### Issue 4: Database Not Connected

**Symptoms:**
- "MongoError" in backend console
- "Cannot connect to database"

**Solution:**
```bash
# Check MongoDB is running
# If using MongoDB Atlas, check connection string
# If using local MongoDB:
mongod

# Or check .env:
MONGO_URI=mongodb://localhost:27017/cakebaker
```

### Issue 5: Token Not Saving

**Symptoms:**
- Login succeeds but immediately logged out
- Redirected back to login

**Solution:**
```javascript
// Check browser console for errors
// Clear localStorage
localStorage.clear();

// Check if localStorage is enabled
try {
  localStorage.setItem('test', 'test');
  localStorage.removeItem('test');
  console.log('localStorage works!');
} catch (e) {
  console.error('localStorage blocked:', e);
}
```

---

## 🔍 Debugging Checklist

### Before Login:
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Database connected
- [ ] Admin user exists (run seed)
- [ ] Browser console open

### During Login:
- [ ] Network tab shows POST request
- [ ] Request status is 200 OK
- [ ] Response contains token
- [ ] No CORS errors
- [ ] No 401/403 errors

### After Login:
- [ ] Token saved in localStorage
- [ ] User data saved in localStorage
- [ ] Redirected to /admin/dashboard
- [ ] Dashboard loads successfully
- [ ] No authentication errors

---

## 📊 Expected Login Flow

```
┌─────────────────────────────────────────────────┐
│ 1. User enters credentials                      │
│    Email: admin@cakebaker.com                   │
│    Password: admin123                           │
├─────────────────────────────────────────────────┤
│ 2. Frontend sends POST request                  │
│    URL: http://localhost:5000/api/auth/login    │
│    Body: { email, password }                    │
├─────────────────────────────────────────────────┤
│ 3. Backend validates credentials                │
│    ✓ User exists                                │
│    ✓ Password correct                           │
│    ✓ Account active                             │
├─────────────────────────────────────────────────┤
│ 4. Backend generates JWT token                  │
│    Token includes: userId, role, expiry         │
├─────────────────────────────────────────────────┤
│ 5. Backend sends response                       │
│    Status: 200 OK                               │
│    Data: { user, token }                        │
├─────────────────────────────────────────────────┤
│ 6. Frontend saves to localStorage               │
│    localStorage.setItem('token', token)         │
│    localStorage.setItem('user', userData)       │
├─────────────────────────────────────────────────┤
│ 7. Frontend updates auth state                  │
│    setUser(userData)                            │
│    setIsAuthenticated(true)                     │
├─────────────────────────────────────────────────┤
│ 8. Frontend shows success toast                 │
│    "Login successful!"                          │
├─────────────────────────────────────────────────┤
│ 9. Frontend redirects                           │
│    navigate('/admin/dashboard')                 │
├─────────────────────────────────────────────────┤
│ 10. ProtectedRoute checks auth                  │
│     ✓ Token exists                              │
│     ✓ User authenticated                        │
├─────────────────────────────────────────────────┤
│ 11. Dashboard loads                             │
│     Shows admin panel                           │
└─────────────────────────────────────────────────┘
```

---

## 🧪 Test Login Manually

### Using Browser Console:

```javascript
// Test login API directly
fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'admin@cakebaker.com',
    password: 'admin123'
  })
})
.then(res => res.json())
.then(data => console.log('Login response:', data))
.catch(err => console.error('Login error:', err));
```

### Using cURL:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@cakebaker.com","password":"admin123"}'
```

### Expected Response:

```json
{
  "status": "success",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Admin",
    "email": "admin@cakebaker.com",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 🎯 Quick Fixes Summary

| Issue | Quick Fix |
|-------|-----------|
| Extension error | Ignore it or use incognito mode |
| Backend not running | `cd backend && npm start` |
| Wrong credentials | `npm run seed` in backend |
| CORS error | Check CLIENT_URL in .env |
| Database error | Check MongoDB connection |
| Token not saving | Clear localStorage and retry |

---

## 🔐 Security Notes

### What Gets Stored:

```javascript
// localStorage after login:
{
  "token": "jwt-token-string",
  "user": "{
    \"_id\": \"...\",
    \"name\": \"Admin\",
    \"email\": \"admin@cakebaker.com\",
    \"role\": \"admin\"
  }"
}
```

### Token Structure:

```javascript
// JWT token contains:
{
  "id": "user-id",
  "role": "admin",
  "iat": 1234567890,  // issued at
  "exp": 1234567890   // expires at
}
```

### Token Validation:

Every protected API request includes:
```
Authorization: Bearer <token>
```

Backend validates:
1. Token exists
2. Token is valid (not tampered)
3. Token not expired
4. User still exists and active

---

## 📞 Still Having Issues?

### Check These:

1. **Backend Console Output**
   ```bash
   cd backend
   npm start
   # Look for errors in output
   ```

2. **Frontend Console**
   ```
   F12 → Console tab
   Filter: -warmup -extension
   ```

3. **Network Tab**
   ```
   F12 → Network tab
   Try login
   Check /api/auth/login request
   ```

4. **Database**
   ```bash
   # Check if admin user exists
   mongosh
   use cakebaker
   db.users.find({ email: 'admin@cakebaker.com' })
   ```

### Get Detailed Logs:

Add to frontend `AuthContext.jsx`:
```javascript
const login = async (credentials) => {
  console.log('🔐 Attempting login...', credentials.email);
  try {
    console.log('📤 Sending request...');
    const response = await authAPI.login(credentials);
    console.log('📥 Response received:', response);
    
    const { data } = response.data;
    console.log('✅ Login successful:', data);
    
    // ... rest of code
  } catch (error) {
    console.error('❌ Login failed:', error);
    console.error('Error details:', error.response?.data);
    // ... rest of code
  }
};
```

---

## ✅ Confirmation Login Works

If you see:
- ✅ "Login successful!" toast
- ✅ Redirected to `/admin/dashboard`
- ✅ Dashboard loads
- ✅ Can see admin content

**Then login is working!** The warmup.html error is just noise from extensions.

---

**Last Updated:** October 5, 2025  
**Status:** Extension error is harmless  
**Action:** Can be safely ignored

**Quick Test:** Try login in incognito mode - if it works there, it's definitely just an extension issue!
