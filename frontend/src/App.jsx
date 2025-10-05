import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout
import Layout from './components/layout/Layout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManagePortfolio from './pages/admin/ManagePortfolio';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageContacts from './pages/admin/ManageContacts';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true
            }}
          >
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route path="services" element={<Services />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="contact" element={<Contact />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/portfolio"
                element={
                  <ProtectedRoute>
                    <ManagePortfolio />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/testimonials"
                element={
                  <ProtectedRoute>
                    <ManageTestimonials />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/contacts"
                element={
                  <ProtectedRoute>
                    <ManageContacts />
                  </ProtectedRoute>
                }
              />

              {/* 404 Page */}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold mb-4">404</h1>
                    <p className="text-xl mb-4">Page not found</p>
                    <a href="/" className="text-primary-500 hover:underline">Go back home</a>
                  </div>
                </div>
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
