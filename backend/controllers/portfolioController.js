import Portfolio from '../models/Portfolio.js';

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
export const getPortfolioItems = async (req, res) => {
  try {
    const { category, featured, search, sort = '-createdAt', limit = 50, page = 1 } = req.query;

    // Build query
    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const items = await Portfolio.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Portfolio.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: items.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: items
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get single portfolio item
// @route   GET /api/portfolio/:id
// @access  Public
export const getPortfolioItem = async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'Portfolio item not found'
      });
    }

    // Increment views
    item.views += 1;
    await item.save();

    res.status(200).json({
      status: 'success',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Create portfolio item
// @route   POST /api/portfolio
// @access  Private/Admin
export const createPortfolioItem = async (req, res) => {
  try {
    const { title, description, category, price, tags, featured, servings, preparationTime } = req.body;

    // Handle uploaded images
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        alt: title
      }));
    } else if (req.body.images) {
      // If images are provided as URLs in the body
      images = JSON.parse(req.body.images);
    }

    const item = await Portfolio.create({
      title,
      description,
      category,
      price,
      images,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim())) : [],
      featured: featured === 'true' || featured === true,
      servings,
      preparationTime
    });

    res.status(201).json({
      status: 'success',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private/Admin
export const updatePortfolioItem = async (req, res) => {
  try {
    let item = await Portfolio.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'Portfolio item not found'
      });
    }

    // Handle new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        alt: req.body.title || item.title
      }));
      req.body.images = [...(item.images || []), ...newImages];
    }

    // Handle tags
    if (req.body.tags && typeof req.body.tags === 'string') {
      req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
    }

    item = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: item
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private/Admin
export const deletePortfolioItem = async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'Portfolio item not found'
      });
    }

    await item.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Portfolio item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get portfolio categories
// @route   GET /api/portfolio/categories/list
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Portfolio.distinct('category');
    
    res.status(200).json({
      status: 'success',
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
