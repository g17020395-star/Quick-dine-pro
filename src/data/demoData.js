// Demo data for Hot meals — used when no Supabase connection is configured

export const DEMO_RESTAURANTS = [
  {
    id: 'r1',
    name: 'Spice Garden',
    description: 'Authentic South Indian cuisine with a modern twist. Famous for our biriyani and traditional thali meals.',
    image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    address: '123 MG Road, Koramangala',
    city: 'Bangalore',
    latitude: 12.9352,
    longitude: 77.6245,
    rating: 4.5,
    cuisine_type: 'South Indian',
    is_veg: false,
    is_active: true,
    avg_prep_time: 25
  },
  {
    id: 'r2',
    name: 'Green Leaf Restaurant',
    description: 'Pure vegetarian restaurant serving North & South Indian favorites. Loved for our paneer dishes.',
    image_url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop',
    address: '456 Brigade Road',
    city: 'Bangalore',
    latitude: 12.9716,
    longitude: 77.5946,
    rating: 4.2,
    cuisine_type: 'North Indian',
    is_veg: true,
    is_active: true,
    avg_prep_time: 20
  },
  {
    id: 'r3',
    name: 'The Coastal Kitchen',
    description: 'Fresh seafood and coastal delicacies. Specializing in Mangalorean and Kerala cuisine.',
    image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
    address: '789 Indiranagar Double Road',
    city: 'Bangalore',
    latitude: 12.9784,
    longitude: 77.6408,
    rating: 4.7,
    cuisine_type: 'Coastal',
    is_veg: false,
    is_active: true,
    avg_prep_time: 30
  },
  {
    id: 'r4',
    name: 'Tandoori Nights',
    description: 'Premium Mughlai and tandoor dishes prepared by expert chefs. A royal dining experience.',
    image_url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop',
    address: '321 Whitefield Main Road',
    city: 'Bangalore',
    latitude: 12.9698,
    longitude: 77.7500,
    rating: 4.3,
    cuisine_type: 'Mughlai',
    is_veg: false,
    is_active: true,
    avg_prep_time: 35
  },
  {
    id: 'r5',
    name: 'Fresh Bowl Cafe',
    description: 'Healthy bowls, salads, and smoothies. Perfect for health-conscious diners.',
    image_url: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop',
    address: '567 HSR Layout',
    city: 'Bangalore',
    latitude: 12.9121,
    longitude: 77.6446,
    rating: 4.1,
    cuisine_type: 'Healthy',
    is_veg: true,
    is_active: true,
    avg_prep_time: 15
  },
  {
    id: 'r6',
    name: 'Dragon Wok',
    description: 'Indo-Chinese fusion cuisine with fiery flavors. Known for our Szechuan specialties.',
    image_url: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&h=400&fit=crop',
    address: '890 Electronic City',
    city: 'Bangalore',
    latitude: 12.8440,
    longitude: 77.6568,
    rating: 4.0,
    cuisine_type: 'Chinese',
    is_veg: false,
    is_active: true,
    avg_prep_time: 20
  }
]

export const DEMO_MENU_ITEMS = {
  r1: [
    { id: 'm1', restaurant_id: 'r1', name: 'Chicken Biriyani', description: 'Aromatic basmati rice cooked with tender chicken and signature spices', price: 280, image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop', category: 'Biriyani', is_veg: false, is_available: true },
    { id: 'm2', restaurant_id: 'r1', name: 'Mutton Biriyani', description: 'Slow-cooked mutton biriyani with saffron rice and raita', price: 350, image_url: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=300&fit=crop', category: 'Biriyani', is_veg: false, is_available: true },
    { id: 'm3', restaurant_id: 'r1', name: 'Veg Biriyani', description: 'Mixed vegetables in fragrant basmati rice with herbs', price: 220, image_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop', category: 'Biriyani', is_veg: true, is_available: true },
    { id: 'm4', restaurant_id: 'r1', name: 'Masala Dosa', description: 'Crispy rice crepe with spiced potato filling', price: 120, image_url: 'https://images.unsplash.com/photo-1668236543090-82eb5eace30b?w=400&h=300&fit=crop', category: 'South Indian', is_veg: true, is_available: true },
    { id: 'm5', restaurant_id: 'r1', name: 'Butter Chicken', description: 'Creamy tomato gravy with tender chicken pieces', price: 300, image_url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop', category: 'Main Course', is_veg: false, is_available: true },
    { id: 'm6', restaurant_id: 'r1', name: 'Paneer Tikka', description: 'Grilled cottage cheese with bell peppers and onions', price: 240, image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop', category: 'Starters', is_veg: true, is_available: true },
    { id: 'm7', restaurant_id: 'r1', name: 'Gulab Jamun', description: 'Soft milk dumplings soaked in rose-flavored sugar syrup', price: 80, image_url: 'https://images.unsplash.com/photo-1666190215127-e1a2d91e2562?w=400&h=300&fit=crop', category: 'Desserts', is_veg: true, is_available: true },
    { id: 'm8', restaurant_id: 'r1', name: 'Mango Lassi', description: 'Refreshing yogurt drink blended with alphonso mango', price: 90, image_url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400&h=300&fit=crop', category: 'Beverages', is_veg: true, is_available: true },
  ],
  r2: [
    { id: 'm9', restaurant_id: 'r2', name: 'Paneer Butter Masala', description: 'Rich and creamy paneer in buttery tomato gravy', price: 260, image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop', category: 'Main Course', is_veg: true, is_available: true },
    { id: 'm10', restaurant_id: 'r2', name: 'Dal Makhani', description: 'Slow-cooked black lentils in creamy butter sauce', price: 200, image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop', category: 'Main Course', is_veg: true, is_available: true },
    { id: 'm11', restaurant_id: 'r2', name: 'Chole Bhature', description: 'Spiced chickpea curry with fluffy fried bread', price: 160, image_url: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&h=300&fit=crop', category: 'Main Course', is_veg: true, is_available: true },
    { id: 'm12', restaurant_id: 'r2', name: 'Veg Thali', description: 'Complete meal with dal, sabzi, roti, rice, and dessert', price: 220, image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop', category: 'Thali', is_veg: true, is_available: true },
    { id: 'm13', restaurant_id: 'r2', name: 'Aloo Gobi', description: 'Potatoes and cauliflower in aromatic spices', price: 180, image_url: 'https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=400&h=300&fit=crop', category: 'Main Course', is_veg: true, is_available: true },
    { id: 'm14', restaurant_id: 'r2', name: 'Naan Basket', description: 'Assorted naan — butter, garlic, and plain', price: 120, image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop', category: 'Breads', is_veg: true, is_available: true },
  ],
  r3: [
    { id: 'm15', restaurant_id: 'r3', name: 'Fish Curry', description: 'Traditional Kerala-style fish curry with coconut milk', price: 320, image_url: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop', category: 'Main Course', is_veg: false, is_available: true },
    { id: 'm16', restaurant_id: 'r3', name: 'Prawn Masala', description: 'Juicy prawns in spicy Mangalorean masala', price: 380, image_url: 'https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=400&h=300&fit=crop', category: 'Main Course', is_veg: false, is_available: true },
    { id: 'm17', restaurant_id: 'r3', name: 'Fish Fry', description: 'Crispy fried fish with coastal spice marination', price: 280, image_url: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400&h=300&fit=crop', category: 'Starters', is_veg: false, is_available: true },
    { id: 'm18', restaurant_id: 'r3', name: 'Appam & Stew', description: 'Lacy rice crepes with vegetable coconut stew', price: 180, image_url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop', category: 'South Indian', is_veg: true, is_available: true },
  ],
  r4: [
    { id: 'm19', restaurant_id: 'r4', name: 'Tandoori Chicken', description: 'Clay oven roasted chicken with yogurt and spice marinade', price: 320, image_url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop', category: 'Tandoor', is_veg: false, is_available: true },
    { id: 'm20', restaurant_id: 'r4', name: 'Seekh Kebab', description: 'Minced lamb skewers grilled in tandoor', price: 300, image_url: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop', category: 'Tandoor', is_veg: false, is_available: true },
    { id: 'm21', restaurant_id: 'r4', name: 'Mughlai Biriyani', description: 'Royal biriyani with saffron, nuts, and slow-cooked meat', price: 380, image_url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop', category: 'Biriyani', is_veg: false, is_available: true },
    { id: 'm22', restaurant_id: 'r4', name: 'Paneer Tikka Masala', description: 'Tandoor-grilled paneer in rich onion-tomato gravy', price: 280, image_url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop', category: 'Main Course', is_veg: true, is_available: true },
  ],
  r5: [
    { id: 'm23', restaurant_id: 'r5', name: 'Quinoa Buddha Bowl', description: 'Quinoa with roasted veggies, avocado, and tahini dressing', price: 280, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', category: 'Bowls', is_veg: true, is_available: true },
    { id: 'm24', restaurant_id: 'r5', name: 'Acai Smoothie Bowl', description: 'Acai blend topped with granola, fruits, and honey', price: 240, image_url: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop', category: 'Bowls', is_veg: true, is_available: true },
    { id: 'm25', restaurant_id: 'r5', name: 'Grilled Chicken Salad', description: 'Mixed greens with grilled chicken, cherry tomatoes, and feta', price: 260, image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop', category: 'Salads', is_veg: false, is_available: true },
    { id: 'm26', restaurant_id: 'r5', name: 'Green Detox Smoothie', description: 'Spinach, banana, almond milk, and chia seeds', price: 160, image_url: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400&h=300&fit=crop', category: 'Beverages', is_veg: true, is_available: true },
  ],
  r6: [
    { id: 'm27', restaurant_id: 'r6', name: 'Chilli Chicken', description: 'Crispy fried chicken tossed in spicy chilli sauce', price: 260, image_url: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop', category: 'Starters', is_veg: false, is_available: true },
    { id: 'm28', restaurant_id: 'r6', name: 'Hakka Noodles', description: 'Stir-fried noodles with vegetables and soy sauce', price: 200, image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', category: 'Main Course', is_veg: true, is_available: true },
    { id: 'm29', restaurant_id: 'r6', name: 'Manchurian', description: 'Crispy veg balls in tangy Manchurian sauce', price: 220, image_url: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop', category: 'Starters', is_veg: true, is_available: true },
    { id: 'm30', restaurant_id: 'r6', name: 'Fried Rice', description: 'Wok-tossed rice with eggs, vegetables, and soy sauce', price: 180, image_url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop', category: 'Main Course', is_veg: false, is_available: true },
  ]
}

export const DEMO_ORDERS = [
  {
    id: 'o1',
    customer_id: 'c1',
    customer_name: 'Rahul Sharma',
    customer_phone: '9876543210',
    restaurant_id: 'r1',
    items: [
      { name: 'Chicken Biriyani', quantity: 2, price: 280 },
      { name: 'Mango Lassi', quantity: 2, price: 90 }
    ],
    total_amount: 740,
    status: 'pending',
    time_slot: '12:30 PM',
    table_number: 4,
    guests: 2,
    payment_status: 'paid',
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  },
  {
    id: 'o2',
    customer_id: 'c2',
    customer_name: 'Priya Patel',
    customer_phone: '9876543211',
    restaurant_id: 'r1',
    items: [
      { name: 'Masala Dosa', quantity: 1, price: 120 },
      { name: 'Paneer Tikka', quantity: 1, price: 240 },
      { name: 'Gulab Jamun', quantity: 2, price: 80 }
    ],
    total_amount: 520,
    status: 'accepted',
    time_slot: '1:00 PM',
    table_number: 7,
    guests: 3,
    payment_status: 'paid',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  },
  {
    id: 'o3',
    customer_id: 'c3',
    customer_name: 'Amit Kumar',
    customer_phone: '9876543212',
    restaurant_id: 'r1',
    items: [
      { name: 'Butter Chicken', quantity: 1, price: 300 },
      { name: 'Veg Biriyani', quantity: 1, price: 220 }
    ],
    total_amount: 520,
    status: 'completed',
    time_slot: '11:30 AM',
    table_number: 2,
    guests: 2,
    payment_status: 'paid',
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  },
  {
    id: 'o4',
    customer_id: 'c4',
    customer_name: 'Sneha Reddy',
    customer_phone: '9876543213',
    restaurant_id: 'r1',
    items: [
      { name: 'Mutton Biriyani', quantity: 3, price: 350 }
    ],
    total_amount: 1050,
    status: 'rejected',
    time_slot: '2:00 PM',
    table_number: 10,
    guests: 4,
    payment_status: 'refund_pending',
    created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString()
  }
]

export const DEMO_USERS = {
  super_admin: {
    email: 'admin@quickdine.pro',
    password: 'admin123',
    profile: { id: 'sa1', full_name: 'Platform Admin', phone: '9999999999', role: 'super_admin', restaurant_id: null }
  },
  restaurant_admin: {
    email: 'spicegarden@quickdine.pro',
    password: 'hotel123',
    profile: { id: 'ra1', full_name: 'Rajesh Kumar', phone: '9888888888', role: 'restaurant_admin', restaurant_id: 'r1' }
  },
  customer: {
    email: 'customer@example.com',
    password: 'customer123',
    profile: { id: 'c1', full_name: 'Rahul Sharma', phone: '10 digits...', role: 'customer', restaurant_id: null }
  }
}
