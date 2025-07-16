import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, Plane, Clock, Star } from 'lucide-react';

interface Flight {
  id: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
  from: string;
  to: string;
  date: string;
  logo: string;
  rating: number;
}

const mockFlights: Flight[] = [
  {
    id: '1',
    airline: 'American Airlines',
    departureTime: '08:30',
    arrivalTime: '11:45',
    duration: '3h 15m',
    price: 299,
    stops: 0,
    from: 'NYC',
    to: 'LAX',
    date: '2024-01-15',
    logo: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4.2
  },
  {
    id: '2',
    airline: 'Delta Air Lines',
    departureTime: '14:20',
    arrivalTime: '17:50',
    duration: '3h 30m',
    price: 345,
    stops: 0,
    from: 'NYC',
    to: 'LAX',
    date: '2024-01-15',
    logo: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4.5
  },
  {
    id: '3',
    airline: 'United Airlines',
    departureTime: '09:15',
    arrivalTime: '13:30',
    duration: '4h 15m',
    price: 275,
    stops: 1,
    from: 'NYC',
    to: 'LAX',
    date: '2024-01-15',
    logo: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4.1
  },
  {
    id: '4',
    airline: 'Southwest Airlines',
    departureTime: '16:45',
    arrivalTime: '21:20',
    duration: '4h 35m',
    price: 259,
    stops: 1,
    from: 'NYC',
    to: 'LAX',
    date: '2024-01-15',
    logo: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4.0
  }
];

export const FlightSection: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    from: 'New York (NYC)',
    to: 'Los Angeles (LAX)',
    departureDate: '2024-01-15',
    returnDate: '',
    passengers: '1 Adult',
    tripType: 'one-way'
  });

  const [showResults, setShowResults] = useState(true);
  const [sortBy, setSortBy] = useState('price');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const sortedFlights = [...mockFlights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Find Your Perfect Flight
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Compare prices from hundreds of airlines and book the best deals
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-100">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                  <input
                    type="text"
                    value={searchParams.from}
                    onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
                  <input
                    type="text"
                    value={searchParams.to}
                    onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pink-400" />
                  <input
                    type="date"
                    value={searchParams.departureDate}
                    onChange={(e) => setSearchParams({...searchParams, departureDate: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border-2 border-pink-200 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400" />
                  <select
                    value={searchParams.passengers}
                    onChange={(e) => setSearchParams({...searchParams, passengers: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border-2 border-orange-200 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  >
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                    <option>4 Adults</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tripType"
                    value="one-way"
                    checked={searchParams.tripType === 'one-way'}
                    onChange={(e) => setSearchParams({...searchParams, tripType: e.target.value})}
                    className="form-radio h-4 w-4 text-purple-600"
                  />
                  <span className="ml-2 text-sm">One-way</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tripType"
                    value="round-trip"
                    checked={searchParams.tripType === 'round-trip'}
                    onChange={(e) => setSearchParams({...searchParams, tripType: e.target.value})}
                    className="form-radio h-4 w-4 text-purple-600"
                  />
                  <span className="ml-2 text-sm">Round-trip</span>
                </label>
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center space-x-2 font-semibold shadow-lg"
              >
                <Search className="h-4 w-4" />
                <span>Search Flights</span>
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {showResults && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {mockFlights.length} flights found
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border-2 border-purple-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-lg transition-all"
                >
                  <option value="price">Price</option>
                  <option value="duration">Duration</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {sortedFlights.map(flight => (
                <div key={flight.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-102 border-2 border-transparent hover:border-purple-200">
                  <div className="flex flex-col lg:flex-row items-center justify-between">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <img 
                        src={flight.logo} 
                        alt={flight.airline}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{flight.airline}</h4>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{flight.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-8 mb-4 lg:mb-0">
                      <div className="text-center">
                        <div className="text-lg font-semibold">{flight.departureTime}</div>
                        <div className="text-sm text-gray-600">{flight.from}</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                          <div className="w-16 h-px bg-gradient-to-r from-blue-300 to-purple-300"></div>
                          <Plane className="h-4 w-4 text-purple-600 animate-pulse" />
                          <div className="w-16 h-px bg-gradient-to-r from-purple-300 to-pink-300"></div>
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {flight.duration}
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold">{flight.arrivalTime}</div>
                        <div className="text-sm text-gray-600">{flight.to}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">${flight.price}</div>
                        <div className="text-sm text-gray-600">per person</div>
                      </div>
                      <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold shadow-lg">
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};