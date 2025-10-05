import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { statsAPI } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { IoLogOut, IoFastFood, IoStar, IoMail, IoEye } from 'react-icons/io5';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout, user } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await statsAPI.getDashboard();
      setStats(response.data.data);
    } catch (error) {
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" size="sm">View Site</Button>
              </Link>
              <Button variant="danger" size="sm" onClick={handleLogout} icon={<IoLogOut />}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Portfolio Items</p>
                  <p className="text-3xl font-bold mt-1">{stats?.overview?.totalPortfolioItems || 0}</p>
                </div>
                <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-full">
                  <IoFastFood className="text-primary-500 text-2xl" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Testimonials</p>
                  <p className="text-3xl font-bold mt-1">{stats?.overview?.totalTestimonials || 0}</p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
                  <IoStar className="text-yellow-500 text-2xl" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">New Messages</p>
                  <p className="text-3xl font-bold mt-1">{stats?.overview?.newContacts || 0}</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                  <IoMail className="text-blue-500 text-2xl" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total Views</p>
                  <p className="text-3xl font-bold mt-1">{stats?.overview?.totalViews || 0}</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                  <IoEye className="text-green-500 text-2xl" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/admin/portfolio">
                <Button className="w-full" variant="outline">Manage Portfolio</Button>
              </Link>
              <Link to="/admin/testimonials">
                <Button className="w-full" variant="outline">Manage Testimonials</Button>
              </Link>
              <Link to="/admin/contacts">
                <Button className="w-full" variant="outline">View Messages</Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Recent Messages</h2>
            <div className="space-y-3">
              {stats?.recentContacts?.slice(0, 3).map((contact) => (
                <div key={contact._id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="font-semibold text-sm">{contact.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{contact.occasionType}</p>
                </div>
              )) || <p className="text-gray-500">No recent messages</p>}
            </div>
          </Card>
        </div>

        {/* Most Viewed Cakes */}
        {stats?.mostViewed && stats.mostViewed.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Most Viewed Cakes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {stats.mostViewed.map((cake) => (
                <div key={cake._id} className="text-center">
                  <img
                    src={cake.images[0]?.url}
                    alt={cake.title}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                  <p className="font-semibold text-sm line-clamp-1">{cake.title}</p>
                  <p className="text-xs text-gray-500">{cake.views} views</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
