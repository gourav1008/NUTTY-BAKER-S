// Categories
export const CAKE_CATEGORIES = [
  'All',
  'Wedding Cakes',
  'Birthday Cakes',
  'Cupcakes',
  'Custom Cakes',
  'Desserts',
  'Other'
];

// Occasion types
export const OCCASION_TYPES = [
  'Wedding',
  'Birthday',
  'Anniversary',
  'Corporate Event',
  'Custom Order',
  'General Inquiry',
  'Other'
];

// Contact status
export const CONTACT_STATUS = {
  NEW: 'new',
  READ: 'read',
  REPLIED: 'replied',
  ARCHIVED: 'archived'
};

// Rating stars
export const RATING_OPTIONS = [1, 2, 3, 4, 5];

// Services data
export const SERVICES = [
  {
    id: 1,
    title: 'Custom Cakes',
    description: 'Personalized cakes designed to match your vision and theme perfectly.',
    icon: '🎂',
    features: ['Custom designs', 'Any size', 'Flavor options', 'Dietary accommodations'],
    priceRange: '$80 - $500+'
  },
  {
    id: 2,
    title: 'Wedding Cakes',
    description: 'Elegant multi-tier wedding cakes that make your special day unforgettable.',
    icon: '💒',
    features: ['Multi-tier designs', 'Tasting sessions', 'Delivery & setup', 'Fresh flowers'],
    priceRange: '$300 - $1000+'
  },
  {
    id: 3,
    title: 'Birthday Cakes',
    description: 'Fun and creative birthday cakes for all ages and celebrations.',
    icon: '🎉',
    features: ['Character designs', 'Photo cakes', 'Themed decorations', 'Quick turnaround'],
    priceRange: '$50 - $200'
  },
  {
    id: 4,
    title: 'Cupcakes & Desserts',
    description: 'Delicious cupcakes and desserts perfect for parties and events.',
    icon: '🧁',
    features: ['Variety of flavors', 'Custom decorations', 'Bulk orders', 'Dessert tables'],
    priceRange: '$30 - $150'
  },
  {
    id: 5,
    title: 'Corporate Events',
    description: 'Professional catering for corporate events and business celebrations.',
    icon: '🏢',
    features: ['Logo cakes', 'Branded desserts', 'Large quantities', 'Timely delivery'],
    priceRange: '$100 - $500+'
  },
  {
    id: 6,
    title: 'Cake Decorating Classes',
    description: 'Learn the art of cake decorating with hands-on workshops.',
    icon: '👩‍🍳',
    features: ['Beginner to advanced', 'Small groups', 'All materials included', 'Take home your creation'],
    priceRange: '$75 - $150 per class'
  }
];

// Pricing tiers
export const PRICING_TIERS = [
  {
    name: 'Basic',
    price: '$50 - $100',
    description: 'Perfect for small celebrations',
    features: [
      'Single tier cake',
      'Basic decoration',
      'Choice of 3 flavors',
      'Serves 10-15 people',
      'Standard delivery'
    ],
    popular: false
  },
  {
    name: 'Premium',
    price: '$150 - $300',
    description: 'Ideal for special occasions',
    features: [
      'Multi-tier option',
      'Custom design',
      'Choice of all flavors',
      'Serves 25-50 people',
      'Priority delivery',
      'Tasting session'
    ],
    popular: true
  },
  {
    name: 'Luxury',
    price: '$400+',
    description: 'Ultimate celebration experience',
    features: [
      'Multi-tier masterpiece',
      'Fully customized design',
      'Premium ingredients',
      'Serves 50+ people',
      'White-glove delivery & setup',
      'Multiple tasting sessions',
      'Dedicated consultation'
    ],
    popular: false
  }
];

// Social media links
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/cakebaker',
  facebook: 'https://facebook.com/cakebaker',
  pinterest: 'https://pinterest.com/cakebaker',
  whatsapp: 'https://wa.me/1234567890',
  email: 'mailto:hello@cakebaker.com'
};

// Business info
export const BUSINESS_INFO = {
  name: 'Sweet Creations Bakery',
  tagline: 'Crafting Sweet Memories, One Cake at a Time',
  phone: '+1 (555) 123-4567',
  email: 'hello@cakebaker.com',
  address: '123 Baker Street, Sweet City, SC 12345',
  hours: {
    weekday: '9:00 AM - 6:00 PM',
    weekend: '10:00 AM - 4:00 PM'
  },
  coordinates: {
    lat: 40.7128,
    lng: -74.0060
  }
};

// About timeline
export const TIMELINE = [
  {
    year: '2015',
    title: 'The Beginning',
    description: 'Started baking from home, sharing creations with friends and family.'
  },
  {
    year: '2017',
    title: 'First Shop',
    description: 'Opened our first small bakery in downtown Sweet City.'
  },
  {
    year: '2019',
    title: 'Award Winner',
    description: 'Won "Best Wedding Cake" at the National Baking Competition.'
  },
  {
    year: '2021',
    title: 'Expansion',
    description: 'Expanded to a larger location with a full team of talented bakers.'
  },
  {
    year: '2023',
    title: 'Going Digital',
    description: 'Launched online ordering and nationwide shipping.'
  }
];

// FAQ data
export const FAQS = [
  {
    question: 'How far in advance should I order?',
    answer: 'We recommend ordering at least 2-3 weeks in advance for custom cakes, and 4-6 weeks for wedding cakes. However, we can accommodate rush orders based on availability.'
  },
  {
    question: 'Do you offer tasting sessions?',
    answer: 'Yes! We offer complimentary tasting sessions for wedding cake orders over $300. For other custom orders, tastings are available for a small fee that is credited toward your final order.'
  },
  {
    question: 'What flavors do you offer?',
    answer: 'We offer a wide variety including vanilla, chocolate, red velvet, lemon, carrot cake, and many more. We can also create custom flavors upon request.'
  },
  {
    question: 'Do you accommodate dietary restrictions?',
    answer: 'Absolutely! We can create gluten-free, vegan, sugar-free, and nut-free options. Please let us know your requirements when ordering.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Cancellations made 7+ days before the event receive a full refund. Cancellations within 3-7 days receive a 50% refund. Unfortunately, we cannot refund orders cancelled within 72 hours of the event date.'
  }
];

export default {
  CAKE_CATEGORIES,
  OCCASION_TYPES,
  CONTACT_STATUS,
  RATING_OPTIONS,
  SERVICES,
  PRICING_TIERS,
  SOCIAL_LINKS,
  BUSINESS_INFO,
  TIMELINE,
  FAQS
};
