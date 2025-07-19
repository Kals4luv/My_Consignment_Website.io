import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, Plane, Clock, Star, SlidersHorizontal, X, CreditCard, Download, Share2 } from 'lucide-react';

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
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedAirline, setSelectedAirline] = useState('All');
  const [maxStops, setMaxStops] = useState(2);
  const [minRating, setMinRating] = useState(0);

  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const airlines = ['All', 'American Airlines', 'Delta Air Lines', 'United Airlines', 'Southwest Airlines'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const filteredAndSortedFlights = mockFlights.filter(flight => {
    const matchesPrice = flight.price <= maxPrice;
    const matchesAirline = selectedAirline === 'All' || flight.airline === selectedAirline;
    const matchesStops = flight.stops <= maxStops;
    const matchesRating = flight.rating >= minRating;
    return matchesPrice && matchesAirline && matchesStops && matchesRating;
  }).sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'departure') return a.departureTime.localeCompare(b.departureTime);
    return 0;
  });

  const clearAllFilters = () => {
    setMaxPrice(500);
    setSelectedAirline('All');
    setMaxStops(2);
    setMinRating(0);
    setSortBy('price');
  };

  const selectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
    setShowBookingModal(true);
    setBookingStep(1);
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    } else {
      // Complete booking
      alert('Booking confirmed! You will receive a confirmation email shortly.');
      setShowBookingModal(false);
      setBookingStep(1);
    }
  };

  const downloadItinerary = () => {
    alert('Itinerary downloaded! Check your downloads folder.');
  };

  const shareItinerary = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Flight Itinerary',
        text: `Flight from ${searchParams.from} to ${searchParams.to}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Flight details copied to clipboard!');
    }
  };

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
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center space-x-2 font-semibold shadow-lg"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center space-x-2 font-semibold shadow-lg"
                >
                  <Search className="h-4 w-4" />
                  <span>Search Flights</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-blue-100 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Flight Filters
              </h3>
              <button
                onClick={() => setShowAdvancedFilters(false)}
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Price: ${maxPrice}
                </label>
                <input
                  type="range"
                  min="100"
                  max="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$100</span>
                  <span>$500</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Airline</label>
                <select
                  value={selectedAirline}
                  onChange={(e) => setSelectedAirline(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
                >
                  {airlines.map(airline => (
                    <option key={airline} value={airline}>{airline}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Stops: {maxStops === 2 ? '2+' : maxStops}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  value={maxStops}
                  onChange={(e) => setMaxStops(parseInt(e.target.value))}
                  className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Direct</span>
                  <span>1 Stop</span>
                  <span>2+ Stops</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Rating: {minRating === 0 ? 'Any' : minRating.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Any</span>
                  <span>5.0</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <button
                onClick={clearAllFilters}
                className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-2 rounded-full hover:from-gray-500 hover:to-gray-600 transition-all transform hover:scale-105 font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {filteredAndSortedFlights.length} of {mockFlights.length} flights found
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
                  <option value="departure">Departure Time</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            <div className="flex flex-wrap gap-2 mb-6">
              {maxPrice < 500 && (
                <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  Max Price: ${maxPrice}
                  <button onClick={() => setMaxPrice(500)} className="hover:text-blue-600">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedAirline !== 'All' && (
                <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  Airline: {selectedAirline}
                  <button onClick={() => setSelectedAirline('All')} className="hover:text-purple-600">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {maxStops < 2 && (
                <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  Max Stops: {maxStops === 0 ? 'Direct' : maxStops}
                  <button onClick={() => setMaxStops(2)} className="hover:text-green-600">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {minRating > 0 && (
                <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  Min Rating: {minRating.toFixed(1)}
                  <button onClick={() => setMinRating(0)} className="hover:text-yellow-600">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>

            {filteredAndSortedFlights.length > 0 ? (
              <div className="space-y-4">
                {filteredAndSortedFlights.map(flight => (
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
                          <div 
                            className="flex items-center space-x-2"
                            onClick={() => selectFlight(flight)}
                          >
                            <CreditCard className="h-4 w-4" />
                            <span>Select Flight</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 max-w-md mx-auto">
                  <Plane className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No flights found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters to see more flight options.</p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && selectedFlight && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
              <button
                onClick={() => setShowBookingModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition-colors z-10 bg-white rounded-full p-2 shadow-lg"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Book Your Flight
                  </h2>
                  <div className="flex space-x-2">
                    {[1, 2, 3].map(step => (
                      <div
                        key={step}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          step <= bookingStep
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flight Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6 border-2 border-blue-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedFlight.airline}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{selectedFlight.from} → {selectedFlight.to}</span>
                        <span>{selectedFlight.departureTime} - {selectedFlight.arrivalTime}</span>
                        <span>{selectedFlight.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${selectedFlight.price}
                      </div>
                      <div className="text-sm text-gray-600">per person</div>
                <form onSubmit={handleBooking}>
                  {bookingStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">Passenger Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input
                            type="text"
                            value={passengerInfo.firstName}
                            onChange={(e) => setPassengerInfo({...passengerInfo, firstName: e.target.value})}
                            className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input
                            type="text"
                            value={passengerInfo.lastName}
                            onChange={(e) => setPassengerInfo({...passengerInfo, lastName: e.target.value})}
                            className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={passengerInfo.email}
                          onChange={(e) => setPassengerInfo({...passengerInfo, email: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          value={passengerInfo.phone}
                          onChange={(e) => setPassengerInfo({...passengerInfo, phone: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                    </div>
                  )}
                  {bookingStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                    </div>
                  )}
                  {bookingStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold mb-4">Booking Confirmation</h3>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                        <div className="text-center">
                          <div className="text-4xl mb-4">✈️</div>
                          <h4 className="text-xl font-bold text-green-800 mb-2">Booking Confirmed!</h4>
                          <p className="text-green-700 mb-4">
                            Your flight from {selectedFlight.from} to {selectedFlight.to} has been booked successfully.
                          </p>
                          <div className="flex justify-center space-x-4">
                            <button
                              type="button"
                              onClick={downloadItinerary}
                              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center space-x-2"
                            >
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </button>
                            <button
                              type="button"
                              onClick={shareItinerary}
                              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center space-x-2"
                            >
                              <Share2 className="h-4 w-4" />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                
                  <div className="flex justify-between mt-8">
                    {bookingStep > 1 && bookingStep < 3 && (
                      <button
                        type="button"
                        onClick={() => setBookingStep(bookingStep - 1)}
                        className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-400 transition-all"
                      >
                        Back
                      </button>
                    )}
                    {bookingStep < 3 ? (
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold shadow-lg ml-auto"
                      >
                        {bookingStep === 1 ? 'Continue to Payment' : 'Complete Booking'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowBookingModal(false)}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 font-semibold shadow-lg ml-auto"
                      >
                        Close
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};