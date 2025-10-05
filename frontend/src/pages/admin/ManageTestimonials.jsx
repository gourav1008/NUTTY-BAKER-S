import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { testimonialAPI } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import { IoArrowBack, IoAdd, IoTrash, IoCheckmark, IoClose, IoStar } from 'react-icons/io5';
import toast from 'react-hot-toast';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    message: '',
    occasion: 'Other',
    isApproved: true,
    featured: false
  });
  const { logout } = useAuth();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await testimonialAPI.getAll({ approved: 'all' });
      setTestimonials(response.data.data);
    } catch (error) {
      toast.error('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await testimonialAPI.update(editingTestimonial._id, formData);
        toast.success('Testimonial updated successfully');
      } else {
        await testimonialAPI.create(formData);
        toast.success('Testimonial created successfully');
      }
      setModalOpen(false);
      resetForm();
      fetchTestimonials();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await testimonialAPI.delete(id);
      toast.success('Testimonial deleted successfully');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to delete testimonial');
    }
  };

  const handleToggleApproval = async (id) => {
    try {
      await testimonialAPI.toggleApproval(id);
      toast.success('Approval status updated');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to update approval status');
    }
  };

  const openEditModal = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      email: testimonial.email || '',
      rating: testimonial.rating,
      message: testimonial.message,
      occasion: testimonial.occasion,
      isApproved: testimonial.isApproved,
      featured: testimonial.featured
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setEditingTestimonial(null);
    setFormData({
      name: '',
      email: '',
      rating: 5,
      message: '',
      occasion: 'Other',
      isApproved: true,
      featured: false
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/dashboard">
                <Button variant="ghost" size="sm" icon={<IoArrowBack />}>
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Manage Testimonials</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {testimonials.length} total testimonials
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                resetForm();
                setModalOpen(true);
              }}
              icon={<IoAdd />}
            >
              Add Testimonial
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        ) : testimonials.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              No testimonials yet
            </p>
            <Button onClick={() => setModalOpen(true)}>Add Your First Testimonial</Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="p-6 relative">
                  {/* Status badges */}
                  <div className="flex gap-2 mb-4">
                    {testimonial.isApproved ? (
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        Approved
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                        Pending
                      </span>
                    )}
                    {testimonial.featured && (
                      <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <IoStar key={i} className="text-yellow-400 w-5 h-5" />
                    ))}
                  </div>

                  {/* Message */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4 italic line-clamp-3">
                    "{testimonial.message}"
                  </p>

                  {/* Author */}
                  <div className="mb-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.occasion}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditModal(testimonial)}
                      className="flex-1"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant={testimonial.isApproved ? 'ghost' : 'secondary'}
                      onClick={() => handleToggleApproval(testimonial._id)}
                      icon={testimonial.isApproved ? <IoClose /> : <IoCheckmark />}
                    >
                      {testimonial.isApproved ? 'Unapprove' : 'Approve'}
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(testimonial._id)}
                      icon={<IoTrash />}
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          resetForm();
        }}
        title={editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="input"
                placeholder="Customer name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input"
                placeholder="customer@email.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Rating *</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                className="input"
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Occasion</label>
              <select
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                className="input"
              >
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Message *</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows="4"
              className="textarea"
              placeholder="Customer testimonial..."
            />
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.isApproved}
                onChange={(e) => setFormData({ ...formData, isApproved: e.target.checked })}
                className="w-4 h-4 text-primary-500"
              />
              <span className="text-sm">Approved</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-primary-500"
              />
              <span className="text-sm">Featured</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingTestimonial ? 'Update' : 'Create'} Testimonial
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setModalOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageTestimonials;
