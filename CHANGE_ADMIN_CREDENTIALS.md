# How to Change Admin Email & Password

## 🔐 Three Methods Available

---

## Method 1: Via Environment Variables (Before First Run)

### Step 1: Edit `.env` File

```bash
cd backend
```

Edit or create `.env` file:
```env
# Admin Default Credentials
ADMIN_EMAIL=your-new-email@example.com
ADMIN_PASSWORD=your-secure-password
```

### Step 2: Run Seed Script

```bash
npm run seed
```

This will create admin with your custom credentials.

---

## Method 2: Via Dashboard (After Login)

### Step 1: Login to Admin Panel

```
http://localhost:5173/admin/login
```

### Step 2: Go to Profile/Settings

(Note: Profile page needs to be created - see below)

### Step 3: Change Password

- Enter current password
- Enter new password
- Confirm new password
- Click "Update Password"

---

## Method 3: Directly in Database

### Using MongoDB Shell:

```bash
mongosh
use cakebaker

# Change email
db.users.updateOne(
  { email: 'admin@cakebaker.com' },
  { $set: { email: 'newemail@example.com' } }
)

# Change password (requires hashing)
# Better to use Method 1 or 2
```

---

## 📝 Quick Steps (Recommended)

### For New Setup:

1. **Edit `.env` file:**
   ```env
   ADMIN_EMAIL=myemail@example.com
   ADMIN_PASSWORD=MySecurePass123!
   ```

2. **Run seed:**
   ```bash
   cd backend
   npm run seed
   ```

3. **Login with new credentials:**
   - Email: myemail@example.com
   - Password: MySecurePass123!

### For Existing Setup:

1. **Login with current credentials**
2. **Use Profile page to change password**
3. **Email change requires database update**

---

## 🔒 Password Requirements

- ✅ Minimum 6 characters
- ✅ Mix of uppercase and lowercase (recommended)
- ✅ Include numbers (recommended)
- ✅ Include special characters (recommended)
- ❌ Avoid common passwords

---

## ⚠️ Important Notes

1. **Email Change:** Requires database update or re-seeding
2. **Password Change:** Can be done via dashboard after login
3. **Security:** Always use strong passwords
4. **Backup:** Keep credentials in a secure password manager

---

## 🛠️ Need Profile Page?

I can create a Profile page component for changing password from dashboard.
Would you like me to create it?

---

**Quick Command:**
```bash
# Change credentials and re-seed
cd backend
# Edit .env file first
npm run seed
```
