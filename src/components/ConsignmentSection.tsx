import React, { useState } from 'react';
import { Search, Filter, Star, Heart, MapPin, SlidersHorizontal, X, Plus, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface ConsignmentItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  condition: string;
  location: string;
  seller: string;
  rating: number;
  category: string;
  description: string;
}

const mockItems: ConsignmentItem[] = [
  {
    id: '1',
    title: 'Vintage Leather Handbag',
    price: 89,
    originalPrice: 150,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
    condition: 'Excellent',
    location: 'New York, NY',
    seller: 'Sarah M.',
    rating: 4.8,
    category: 'Fashion',
    description: 'Beautiful vintage leather handbag in excellent condition'
  },
  {
    id: '2',
    title: 'Designer Watch',
    price: 299,
    originalPrice: 450,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400',
    condition: 'Like New',
    location: 'Los Angeles, CA',
    seller: 'Michael R.',
    rating: 4.9,
    category: 'Accessories',
    description: 'Luxury designer watch with original box and papers'
  },
  {
    id: '3',
    title: 'Vintage Camera',
    price: 199,
    originalPrice: 350,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
    condition: 'Good',
    location: 'Chicago, IL',
    seller: 'Jennifer L.',
    rating: 4.7,
    category: 'Electronics',
    description: 'Classic vintage camera perfect for photography enthusiasts'
  },
  {
    id: '4',
    title: 'Antique Jewelry Box',
    price: 125,
    originalPrice: 200,
    image: 'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=400',
    condition: 'Very Good',
    location: 'Boston, MA',
    seller: 'David K.',
    rating: 4.6,
    category: 'Home & Garden',
    description: 'Beautiful antique jewelry box with intricate details'
  },
  {
    id: '5',
    title: 'Designer Sunglasses',
    price: 149,
    originalPrice: 250,
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=400',
    condition: 'Excellent',
    location: 'Miami, FL',
    seller: 'Emma T.',
    rating: 4.8,
    category: 'Accessories',
    description: 'Authentic designer sunglasses with UV protection'
  },
  {
    id: '6',
    title: 'Vintage Record Player',
    price: 179,
    originalPrice: 280,
    image: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400',
    condition: 'Good',
    location: 'Seattle, WA',
    seller: 'Robert H.',
    rating: 4.7,
    category: 'Electronics',
    description: 'Classic vintage record player in working condition'
  }
];

export const ConsignmentSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [sortBy, setSortBy] = useState('price-low');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [showItemModal, setShowItemModal] = useState<ConsignmentItem | null>(null);
  const [showListingModal, setShowListingModal] = useState(false);

  const { addToCart, removeFromCart, isInCart } = useCart();

  const categories = ['All', 'Fashion', 'Accessories', 'Electronics', 'Home & Garden'];
  const conditions = ['All', 'Like New', 'Excellent', 'Very Good', 'Good'];
  const locations = ['All', 'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Boston, MA', 'Miami, FL', 'Seattle, WA'];

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesCondition = selectedCondition === 'All' || item.condition === selectedCondition;
    const matchesLocation = selectedLocation === 'All' || item.location === selectedLocation;
    const matchesPrice = item.price >= priceRange.min && item.price <= priceRange.max;
    return matchesSearch && matchesCategory && matchesCondition && matchesLocation && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedCondition('All');
    setSelectedLocation('All');
    setPriceRange({ min: 0, max: 500 });
    setSortBy('price-low');
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleAddToCart = (item: ConsignmentItem) => {
    if (isInCart(item.id)) {
      removeFromCart(item.id);
    } else {
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        condition: item.condition,
        seller: item.seller,
        category: item.category
      });
    }
  };

  const viewItemDetails = (item: ConsignmentItem) => {
    setShowItemModal(item);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Consignment Marketplace
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover unique items from trusted sellers in our curated consignment marketplace
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-lg transition-all"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-purple-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-lg transition-all min-w-32"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-purple-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-lg transition-all min-w-32"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2 px-4 py-3 border-2 border-purple-200 rounded-full bg-white hover:bg-purple-50 transition-all shadow-lg"
              >
                <SlidersHorizontal className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium">Filters</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-100 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Advanced Filters
                </h3>
                <button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="text-gray-400 hover:text-purple-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all"
                  >
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white transition-all"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange.min} - ${priceRange.max}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value)})}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                      className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={clearAllFilters}
                    className="w-full bg-gradient-to-r from-gray-400 to-gray-500 text-white py-2 px-4 rounded-lg hover:from-gray-500 hover:to-gray-600 transition-all transform hover:scale-105 font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          <div className="flex flex-wrap gap-2 mb-4">
            {searchTerm && (
              <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm('')} className="hover:text-purple-600">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedCategory !== 'All' && (
              <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('All')} className="hover:text-blue-600">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {(priceRange.min > 0 || priceRange.max < 500) && (
              <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                Price: ${priceRange.min} - ${priceRange.max}
                <button onClick={() => setPriceRange({min: 0, max: 500})} className="hover:text-green-600">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-purple-600">{filteredItems.length}</span> of <span className="font-semibold">{mockItems.length}</span> items
            </p>
            {filteredItems.length === 0 && (
              <p className="text-orange-600 font-medium">No items match your filters. Try adjusting your search criteria.</p>
            )}
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-purple-200">
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 border-2 border-pink-200"
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites.includes(item.id) ? 'fill-pink-500 text-pink-500 animate-pulse' : 'text-gray-400'}`}
                    />
                  </button>
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {item.condition}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">${item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                      )}
                    </div>
                    <span className="text-xs bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-1 rounded-full font-semibold">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{item.rating}</span>
                      <span className="text-sm text-gray-500">• {item.seller}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.location}
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 font-semibold shadow-lg">
                    <div className="flex items-center justify-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span onClick={() => viewItemDetails(item)}>View Details</span>
                    </div>
                  </button>
                  <div className="flex space-x-2 mt-2">
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className={`flex-1 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
                        isInCart(item.id)
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                          : 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white hover:from-orange-500 hover:to-yellow-600'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-1">
                        <ShoppingCart className="h-4 w-4" />
                        <span className="text-sm">{isInCart(item.id) ? 'In Cart' : 'Add to Cart'}</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 max-w-md mx-auto">
              <Search className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or clearing some filters.</p>
              <button
                onClick={clearAllFilters}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-2xl p-8 border-2 border-purple-200 shadow-xl">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Ready to Start Selling?
            </h3>
            <p className="text-gray-700 mb-6">
              Join thousands of sellers who trust us with their consignment items
            </p>
            <button className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-green-500 hover:to-emerald-600 transition-all transform hover:scale-110 shadow-xl">
              <div 
                className="flex items-center space-x-2"
                onClick={() => setShowListingModal(true)}
              >
                <Plus className="h-5 w-5" />
                <span>List Your Items</span>
              </div>
            </button>
          </div>
        </div>

        {/* Item Details Modal */}
        {showItemModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
              <button
                onClick={() => setShowItemModal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 transition-colors z-10 bg-white rounded-full p-2 shadow-lg"
              >
                <X className="h-6 w-6" />
              </button>
              
              <img 
                src={showItemModal.image} 
                alt={showItemModal.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {showItemModal.title}
                  </h2>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ${showItemModal.price}
                    </div>
                    {showItemModal.originalPrice && (
                      <div className="text-lg text-gray-500 line-through">
                        ${showItemModal.originalPrice}
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{showItemModal.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="font-semibold text-gray-700">Condition:</span>
                    <span className="ml-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      {showItemModal.condition}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Category:</span>
                    <span className="ml-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                      {showItemModal.category}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Seller:</span>
                    <span className="ml-2">{showItemModal.seller}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Location:</span>
                    <span className="ml-2">{showItemModal.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center mb-6">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-semibold">{showItemModal.rating}</span>
                  <span className="text-gray-500 ml-2">Seller Rating</span>
                </div>
                
                <div className="flex space-x-4">
                  <button 
                    onClick={() => handleAddToCart(showItemModal)}
                    className={`flex-1 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                      isInCart(showItemModal.id)
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                        : 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white hover:from-orange-500 hover:to-yellow-600'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <ShoppingCart className="h-5 w-5" />
                      <span>{isInCart(showItemModal.id) ? 'Remove from Cart' : 'Add to Cart'}</span>
                    </div>
                  </button>
                  <button 
                    onClick={() => toggleFavorite(showItemModal.id)}
                    className="px-6 py-3 border-2 border-pink-300 rounded-full hover:bg-pink-50 transition-all transform hover:scale-105"
                  >
                    <Heart 
                      className={`h-5 w-5 ${favorites.includes(showItemModal.id) ? 'fill-pink-500 text-pink-500' : 'text-pink-400'}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* List Item Modal */}
        {showListingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl">
              <button
                onClick={() => setShowListingModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                List Your Item
              </h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="Enter item title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all">
                    <option>Fashion</option>
                    <option>Accessories</option>
                    <option>Electronics</option>
                    <option>Home & Garden</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="Enter price"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                  <select className="w-full px-4 py-3 border-2 border-purple-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all">
                    <option>Like New</option>
                    <option>Excellent</option>
                    <option>Very Good</option>
                    <option>Good</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                    placeholder="Describe your item"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-3 rounded-full hover:from-green-500 hover:to-emerald-600 transition-all transform hover:scale-105 font-semibold shadow-lg"
                >
                  List Item
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};