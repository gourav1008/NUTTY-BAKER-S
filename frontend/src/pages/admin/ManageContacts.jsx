import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { contactAPI } from '../../utils/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import Modal from '../../components/common/Modal';
import { IoArrowBack, IoMail, IoCall, IoCalendar, IoTrash } from 'react-icons/io5';
import toast from 'react-hot-toast';

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, [filter]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await contactAPI.getAll(params);
      setContacts(response.data.data);
    } catch (error) {
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await contactAPI.updateStatus(id, { status });
      toast.success('Status updated successfully');
      fetchContacts();
      if (selectedContact?._id === id) {
        setSelectedContact({ ...selectedContact, status });
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await contactAPI.delete(id);
      toast.success('Message deleted successfully');
      setModalOpen(false);
      fetchContacts();
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const openContactModal = async (contact) => {
    try {
      const response = await contactAPI.getOne(contact._id);
      setSelectedContact(response.data.data);
      setModalOpen(true);
    } catch (error) {
      toast.error('Failed to load contact details');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'read':
        return 'bg-gray-100 text-gray-700';
      case 'replied':
        return 'bg-green-100 text-green-700';
      case 'archived':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
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
                <h1 className="text-2xl font-bold">Manage Messages</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {contacts.length} messages
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom py-3">
          <div className="flex gap-2 overflow-x-auto">
            {['all', 'new', 'read', 'replied', 'archived'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === status
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        ) : contacts.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No messages found
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card
                  className={`p-6 cursor-pointer hover:shadow-xl transition-shadow ${
                    contact.status === 'new' ? 'border-l-4 border-primary-500' : ''
                  }`}
                  onClick={() => openContactModal(contact)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{contact.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(contact.status)}`}>
                          {contact.status}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                          {contact.occasionType}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-1">
                          <IoMail className="w-4 h-4" />
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="flex items-center gap-1">
                            <IoCall className="w-4 h-4" />
                            {contact.phone}
                          </div>
                        )}
                        {contact.eventDate && (
                          <div className="flex items-center gap-1">
                            <IoCalendar className="w-4 h-4" />
                            {new Date(contact.eventDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                        {contact.message}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 ml-4">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Message Details"
        size="lg"
      >
        {selectedContact && (
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Name</label>
                <p className="text-lg font-medium">{selectedContact.name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Email</label>
                <p className="text-lg">{selectedContact.email}</p>
              </div>
              {selectedContact.phone && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Phone</label>
                  <p className="text-lg">{selectedContact.phone}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Occasion</label>
                <p className="text-lg">{selectedContact.occasionType}</p>
              </div>
              {selectedContact.eventDate && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Event Date</label>
                  <p className="text-lg">{new Date(selectedContact.eventDate).toLocaleDateString()}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Received</label>
                <p className="text-lg">{new Date(selectedContact.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 block mb-2">Message</label>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
            </div>

            {/* Status Actions */}
            <div>
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 block mb-2">Update Status</label>
              <div className="flex gap-2">
                {['read', 'replied', 'archived'].map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={selectedContact.status === status ? 'primary' : 'outline'}
                    onClick={() => handleStatusUpdate(selectedContact._id, status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <a
                href={`mailto:${selectedContact.email}`}
                className="flex-1"
              >
                <Button variant="secondary" className="w-full" icon={<IoMail />}>
                  Reply via Email
                </Button>
              </a>
              <Button
                variant="danger"
                onClick={() => handleDelete(selectedContact._id)}
                icon={<IoTrash />}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageContacts;
