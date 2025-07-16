import React, { useState } from 'react';
import { Search, Filter, Star, Heart, MapPin } from 'lucide-react';

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
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = ['All', 'Fashion', 'Accessories', 'Electronics', 'Home & Garden'];

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
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
          <div className="flex flex-col md:flex-row gap-4 mb-6">
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
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-purple-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-purple-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-lg transition-all"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Items Grid */}
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
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

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
              List Your Items
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};