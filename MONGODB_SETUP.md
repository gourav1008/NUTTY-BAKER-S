# 🍃 MongoDB Local Setup Guide

## Option 1: Install MongoDB Community Edition (Recommended)

### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0 or higher)
   - Platform: Windows
   - Package: MSI
3. Click **Download**

### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose **Complete** installation
3. **Important**: Check "Install MongoDB as a Service"
4. **Important**: Check "Install MongoDB Compass" (GUI tool)
5. Click **Install**

### Step 3: Verify Installation
Open PowerShell and run:
```powershell
mongod --version
```

You should see the MongoDB version information.

### Step 4: Start MongoDB Service
MongoDB should start automatically. If not:
```powershell
net start MongoDB
```

### Step 5: Update Backend .env
Edit `backend/.env` and update:
```env
MONGODB_URI=mongodb://localhost:27017/cakebaker
```

### Step 6: Test Connection
```powershell
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
📦 Database: cakebaker
```

### Step 7: Seed Database
```powershell
npm run seed
```

---

## Option 2: Use MongoDB with Docker (Alternative)

If you have Docker installed:

```powershell
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

Then use the same connection string:
```env
MONGODB_URI=mongodb://localhost:27017/cakebaker
```

---

## Option 3: Quick Fix - Use MongoDB Atlas (Cloud)

If you don't want to install MongoDB locally:

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create a **FREE** account
3. Create a **FREE** cluster (M0)
4. Click **Connect** → **Connect your application**
5. Copy the connection string
6. Update `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cakebaker?retryWrites=true&w=majority
```
(Replace username and password with your credentials)

---

## 🔧 Troubleshooting

### Error: "MongoDB service not found"
**Solution**: MongoDB didn't install as a service. Start it manually:
```powershell
mongod --dbpath C:\data\db
```

### Error: "Data directory not found"
**Solution**: Create the data directory:
```powershell
mkdir C:\data\db
mongod --dbpath C:\data\db
```

### Error: "Port 27017 already in use"
**Solution**: MongoDB is already running. Just restart your backend:
```powershell
cd backend
npm run dev
```

### Error: "Connection refused"
**Solution**: Make sure MongoDB service is running:
```powershell
net start MongoDB
```

---

## ✅ Verify Everything Works

1. **Check MongoDB is running:**
```powershell
# Should show MongoDB service as "Running"
Get-Service MongoDB
```

2. **Start backend:**
```powershell
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected: localhost
📦 Database: cakebaker
```

3. **Seed the database:**
```powershell
npm run seed
```

You should see:
```
✅ Admin user created: admin@cakebaker.com
✅ Created 4 portfolio items
✅ Created 3 testimonials
```

4. **Test the frontend:**
- Open http://localhost:5173
- Portfolio and Testimonials pages should now show data!

---

## 🎯 Quick Commands

```powershell
# Check if MongoDB is running
Get-Service MongoDB

# Start MongoDB
net start MongoDB

# Stop MongoDB
net stop MongoDB

# Start backend
cd backend
npm run dev

# Seed database
cd backend
npm run seed

# View database (using MongoDB Compass)
# Open MongoDB Compass and connect to: mongodb://localhost:27017
```

---

## 📊 Using MongoDB Compass (GUI)

MongoDB Compass was installed with MongoDB. Use it to:
1. View your database visually
2. Browse collections (Portfolio, Testimonials, Contacts)
3. Edit documents
4. Run queries

**Connection String:** `mongodb://localhost:27017`

---

## 🚀 You're All Set!

Once MongoDB is running:
1. Backend will connect automatically
2. Run seed script to add sample data
3. Your website will display cakes and testimonials
4. Admin panel will work fully

**Need help?** Check the troubleshooting section above!
