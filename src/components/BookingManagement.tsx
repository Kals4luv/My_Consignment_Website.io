import React, { useState } from 'react';
import { X, Calendar, MapPin, Users, Plane, Clock, Star, Edit, Trash2, Download, Share2, CheckCircle, AlertCircle } from 'lucide-react';

interface Booking {
  id: string;
  bookingReference: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  passengers: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'completed';
  passengerName: string;
  email: string;
  phone: string;
  seatNumber?: string;
  gate?: string;
  terminal?: string;
}

interface BookingManagementProps {
  onClose: () => void;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    bookingReference: 'KX7B9M',
    airline: 'American Airlines',
    flightNumber: 'AA1234',
    from: 'New York (NYC)',
    to: 'Los Angeles (LAX)',
    departureDate: '2024-02-15',
    departureTime: '08:30',
    arrivalTime: '11:45',
    duration: '3h 15m',
    passengers: 1,
    totalPrice: 299,
    status: 'confirmed',
    passengerName: 'Kalu Iroegbu',
    email: 'kalu@example.com',
    phone: '+234 7011180318',
    seatNumber: '12A',
    gate: 'B7',
    terminal: 'Terminal 1'
  },
  {
    id: '2',
    bookingReference: 'PL3K8N',
    airline: 'Delta Air Lines',
    flightNumber: 'DL5678',
    from: 'Los Angeles (LAX)',
    to: 'Chicago (ORD)',
    departureDate: '2024-02-20',
    departureTime: '14:20',
    arrivalTime: '19:50',
    duration: '3h 30m',
    passengers: 2,
    totalPrice: 690,
    status: 'confirmed',
    passengerName: 'Kalu Iroegbu',
    email: 'kalu@example.com',
    phone: '+234 7011180318',
    seatNumber: '15B, 15C'
  },
  {
    id: '3',
    bookingReference: 'QR9X2V',
    airline: 'United Airlines',
    flightNumber: 'UA9012',
    from: 'Miami (MIA)',
    to: 'New York (NYC)',
    departureDate: '2024-01-10',
    departureTime: '16:45',
    arrivalTime: '19:20',
    duration: '2h 35m',
    passengers: 1,
    totalPrice: 275,
    status: 'completed',
    passengerName: 'Kalu Iroegbu',
    email: 'kalu@example.com',
    phone: '+234 7011180318'
  }
];

export const BookingManagement: React.FC<BookingManagementProps> = ({ onClose }) => {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'cancelled' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesSearch = booking.bookingReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.to.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    ));
    setShowCancelModal(false);
    setSelectedBooking(null);
  };

  const handleEditBooking = (updatedBooking: Booking) => {
    setBookings(prev => prev.map(booking => 
      booking.id === updatedBooking.id ? updatedBooking : booking
    ));
    setShowEditModal(false);
    setSelectedBooking(null);
  };

  const downloadItinerary = (booking: Booking) => {
    // Simulate download
    const itineraryData = `
      Booking Reference: ${booking.bookingReference}
      Flight: ${booking.airline} ${booking.flightNumber}
      Route: ${booking.from} → ${booking.to}
      Date: ${booking.departureDate}
      Time: ${booking.departureTime} - ${booking.arrivalTime}
      Passenger: ${booking.passengerName}
      Seat: ${booking.seatNumber || 'Not assigned'}
    `;
    
    const blob = new Blob([itineraryData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `itinerary-${booking.bookingReference}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareItinerary = (booking: Booking) => {
    const shareText = `My flight: ${booking.airline} ${booking.flightNumber} from ${booking.from} to ${booking.to} on ${booking.departureDate}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Flight Itinerary',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Flight details copied to clipboard!');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition-colors z-10 bg-white rounded-full p-2 shadow-lg"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="p-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Manage Your Bookings
          </h2>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by booking reference, airline, or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-6 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all"
            >
              <option value="all">All Bookings</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.length > 0 ? (
              filteredBookings.map(booking => (
                <div key={booking.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100 hover:border-blue-300 transition-all">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {booking.bookingReference}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">Flight:</span>
                          <div>{booking.airline}</div>
                          <div className="text-gray-600">{booking.flightNumber}</div>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Route:</span>
                          <div className="flex items-center gap-2">
                            <span>{booking.from}</span>
                            <Plane className="h-3 w-3 text-blue-500" />
                            <span>{booking.to}</span>
                          </div>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Date & Time:</span>
                          <div>{booking.departureDate}</div>
                          <div className="text-gray-600">{booking.departureTime} - {booking.arrivalTime}</div>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Details:</span>
                          <div>{booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}</div>
                          <div className="text-gray-600">${booking.totalPrice}</div>
                        </div>
                      </div>

                      {booking.seatNumber && (
                        <div className="mt-3 flex flex-wrap gap-4 text-sm">
                          <span><strong>Seat:</strong> {booking.seatNumber}</span>
                          {booking.gate && <span><strong>Gate:</strong> {booking.gate}</span>}
                          {booking.terminal && <span><strong>Terminal:</strong> {booking.terminal}</span>}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => downloadItinerary(booking)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center gap-2 text-sm font-medium"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                      
                      <button
                        onClick={() => shareItinerary(booking)}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center gap-2 text-sm font-medium"
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </button>

                      {booking.status === 'confirmed' && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowEditModal(true);
                            }}
                            className="bg-gradient-to-r from-orange-500 to-yellow-600 text-white px-4 py-2 rounded-full hover:from-orange-600 hover:to-yellow-700 transition-all transform hover:scale-105 flex items-center gap-2 text-sm font-medium"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </button>
                          
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowCancelModal(true);
                            }}
                            className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full hover:from-red-600 hover:to-pink-700 transition-all transform hover:scale-105 flex items-center gap-2 text-sm font-medium"
                          >
                            <Trash2 className="h-4 w-4" />
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Plane className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No bookings found</h3>
                <p className="text-gray-500">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'You haven\'t made any flight bookings yet.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Edit Booking Modal */}
        {showEditModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Edit Booking
              </h3>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const updatedBooking = {
                  ...selectedBooking,
                  passengerName: formData.get('passengerName') as string,
                  email: formData.get('email') as string,
                  phone: formData.get('phone') as string,
                };
                handleEditBooking(updatedBooking);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Passenger Name</label>
                    <input
                      type="text"
                      name="passengerName"
                      defaultValue={selectedBooking.passengerName}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={selectedBooking.email}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={selectedBooking.phone}
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-400 transition-all font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cancel Booking Modal */}
        {showCancelModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-60">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
              <button
                onClick={() => setShowCancelModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Cancel Booking</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to cancel booking <strong>{selectedBooking.bookingReference}</strong>?
                  This action cannot be undone.
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-400 transition-all font-medium"
                  >
                    Keep Booking
                  </button>
                  <button
                    onClick={() => handleCancelBooking(selectedBooking.id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-full hover:from-red-600 hover:to-pink-700 transition-all transform hover:scale-105 font-medium"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};