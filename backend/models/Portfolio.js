import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Wedding Cakes', 'Birthday Cakes', 'Cupcakes', 'Custom Cakes', 'Desserts', 'Other']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Cake image'
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  servings: {
    type: String,
    default: 'Varies'
  },
  preparationTime: {
    type: String,
    default: '2-3 days'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search and filtering
portfolioSchema.index({ title: 'text', description: 'text', tags: 'text' });
portfolioSchema.index({ category: 1, featured: -1 });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
