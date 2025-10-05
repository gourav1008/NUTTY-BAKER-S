# Cake Baker Portfolio - Setup Script
Write-Host "🍰 Cake Baker Portfolio - Setup Script" -ForegroundColor Magenta
Write-Host "=======================================" -ForegroundColor Magenta
Write-Host ""

# Install Frontend Dependencies
Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor Cyan
Set-Location -Path ".\frontend"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend installation failed. Trying with --legacy-peer-deps..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
}
Write-Host "✅ Frontend dependencies installed!" -ForegroundColor Green
Write-Host ""

# Install Backend Dependencies
Write-Host "📦 Installing Backend Dependencies..." -ForegroundColor Cyan
Set-Location -Path "..\backend"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend installation failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend dependencies installed!" -ForegroundColor Green
Write-Host ""

# Create Frontend .env if it doesn't exist
Set-Location -Path "..\frontend"
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating frontend .env file..." -ForegroundColor Cyan
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Frontend .env created!" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Frontend .env already exists" -ForegroundColor Yellow
}
Write-Host ""

# Create Backend .env if it doesn't exist
Set-Location -Path "..\backend"
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating backend .env file..." -ForegroundColor Cyan
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Backend .env created!" -ForegroundColor Green
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Edit backend/.env and add your MongoDB URI!" -ForegroundColor Yellow
    Write-Host "   - For local MongoDB: mongodb://localhost:27017/cakebaker" -ForegroundColor Yellow
    Write-Host "   - For MongoDB Atlas: Get connection string from Atlas" -ForegroundColor Yellow
} else {
    Write-Host "ℹ️  Backend .env already exists" -ForegroundColor Yellow
}
Write-Host ""

Set-Location -Path ".."

Write-Host "✨ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Edit backend/.env and add your MongoDB URI" -ForegroundColor White
Write-Host "2. Run 'cd backend && npm run seed' to populate sample data" -ForegroundColor White
Write-Host "3. Start backend: 'cd backend && npm run dev'" -ForegroundColor White
Write-Host "4. Start frontend: 'cd frontend && npm run dev'" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Happy Baking!" -ForegroundColor Magenta
