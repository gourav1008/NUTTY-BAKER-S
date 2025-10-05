import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioAPI } from '../../utils/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import { IoArrowBack, IoAdd, IoTrash, IoEye } from 'react-icons/io5';
import { CAKE_CATEGORIES } from '../../utils/constants';
import toast from 'react-hot-toast';

const ManagePortfolio = () => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCake, setEditingCake] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Custom Cakes',
    price: '',
    servings: '',
    preparationTime: '2-3 days',
    tags: '',
    featured: false,
    images: [{ url: '', alt: '' }]
  });

  useEffect(() => {
    fetchCakes();
  }, []);

  const fetchCakes = async () => {
    try {
      setLoading(true);
      const response = await portfolioAPI.getAll({});
      setCakes(response.data.data);
    } catch (error) {
      toast.error('Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (editingCake) {
        await portfolioAPI.update(editingCake._id, submitData);
        toast.success('Cake updated successfully');
      } else {
        await portfolioAPI.create(submitData);
        toast.success('Cake created successfully');
      }
      setModalOpen(false);
      resetForm();
      fetchCakes();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this cake?')) return;
    try {
      await portfolioAPI.delete(id);
      toast.success('Cake deleted successfully');
      fetchCakes();
    } catch (error) {
      toast.error('Failed to delete cake');
    }
  };

  const openEditModal = (cake) => {
    setEditingCake(cake);
    setFormData({
      title: cake.title,
      description: cake.description,
      category: cake.category,
      price: cake.price.toString(),
      servings: cake.servings,
      preparationTime: cake.preparationTime,
      tags: cake.tags.join(', '),
      featured: cake.featured,
      images: cake.images.length > 0 ? cake.images : [{ url: '', alt: '' }]
    });
    setModalOpen(true);
  };

  const resetForm = () => {
    setEditingCake(null);
    setFormData({
      title: '',
      description: '',
      category: 'Custom Cakes',
      price: '',
      servings: '',
      preparationTime: '2-3 days',
      tags: '',
      featured: false,
      images: [{ url: '', alt: '' }]
    });
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, { url: '', alt: '' }]
    });
  };

  const updateImage = (index, field, value) => {
    const newImages = [...formData.images];
    newImages[index][field] = value;
    setFormData({ ...formData, images: newImages });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages.length > 0 ? newImages : [{ url: '', alt: '' }] });
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
                <h1 className="text-2xl font-bold">Manage Portfolio</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {cakes.length} total cakes
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
              Add Cake
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
        ) : cakes.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              No cakes in portfolio yet
            </p>
            <Button onClick={() => setModalOpen(true)}>Add Your First Cake</Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cakes.map((cake) => (
              <motion.div
                key={cake._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={cake.images[0]?.url}
                      alt={cake.title}
                      className="w-full h-full object-cover"
                    />
                    {cake.featured && (
                      <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-semibold">
                        Featured
                      </span>
                    )}
                    <div className="absolute bottom-2 left-2 bg-primary-500 text-white px-3 py-1 rounded-full font-bold">
                      ${cake.price}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-primary-500 font-semibold mb-1">
                      {cake.category}
                    </div>
                    <h3 className="font-bold mb-2 line-clamp-1">{cake.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {cake.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <IoEye /> {cake.views} views
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditModal(cake)}
                        className="flex-1"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(cake._id)}
                        icon={<IoTrash />}
                      />
                    </div>
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
        title={editingCake ? 'Edit Cake' : 'Add Cake'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="input"
                placeholder="Elegant Wedding Cake"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input"
              >
                {CAKE_CATEGORIES.filter(cat => cat !== 'All').map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows="3"
              className="textarea"
              placeholder="Describe the cake..."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Price ($) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="input"
                placeholder="99.99"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Servings</label>
              <input
                type="text"
                value={formData.servings}
                onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                className="input"
                placeholder="10-15 servings"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Prep Time</label>
              <input
                type="text"
                value={formData.preparationTime}
                onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                className="input"
                placeholder="2-3 days"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="input"
              placeholder="wedding, elegant, floral"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Images (URLs)</label>
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={image.url}
                  onChange={(e) => updateImage(index, 'url', e.target.value)}
                  className="input flex-1"
                  placeholder="https://example.com/image.jpg"
                  required={index === 0}
                />
                {formData.images.length > 1 && (
                  <Button
                    type="button"
                    variant="danger"
                    size="sm"
                    onClick={() => removeImage(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addImageField}>
              + Add Image
            </Button>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-primary-500"
            />
            <span className="text-sm">Featured (show on homepage)</span>
          </label>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingCake ? 'Update' : 'Create'} Cake
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

export default ManagePortfolio;
