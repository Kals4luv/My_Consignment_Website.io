import React, { useState, useEffect } from 'react';
import { Plane, Clock, MapPin, Calendar, Users, AlertCircle, CheckCircle, Navigation, Wifi, Battery, Signal } from 'lucide-react';

interface FlightStatus {
  id: string;
  flightNumber: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  actualDeparture?: string;
  actualArrival?: string;
  estimatedArrival?: string;
  status: 'scheduled' | 'boarding' | 'departed' | 'in-flight' | 'delayed' | 'arrived' | 'cancelled';
  gate?: string;
  terminal?: string;
  aircraft: string;
  altitude?: number;
  speed?: number;
  progress: number;
  delay?: number;
  weather: {
    departure: string;
    arrival: string;
  };
  passengers: number;
  distance: number;
  remainingTime?: string;
}

interface FlightTrackerProps {
  flightNumber?: string;
  onClose?: () => void;
}

const mockFlightData: FlightStatus[] = [
  {
    id: '1',
    flightNumber: 'AA1234',
    airline: 'American Airlines',
    from: 'New York (JFK)',
    to: 'Los Angeles (LAX)',
    departureTime: '08:30',
    arrivalTime: '11:45',
    actualDeparture: '08:35',
    estimatedArrival: '11:50',
    status: 'in-flight',
    gate: 'B7',
    terminal: 'Terminal 1',
    aircraft: 'Boeing 737-800',
    altitude: 35000,
    speed: 520,
    progress: 65,
    delay: 5,
    weather: {
      departure: 'Clear, 72°F',
      arrival: 'Partly Cloudy, 78°F'
    },
    passengers: 156,
    distance: 2475,
    remainingTime: '1h 25m'
  },
  {
    id: '2',
    flightNumber: 'DL5678',
    airline: 'Delta Air Lines',
    from: 'Chicago (ORD)',
    to: 'Miami (MIA)',
    departureTime: '14:20',
    arrivalTime: '17:50',
    status: 'boarding',
    gate: 'A12',
    terminal: 'Terminal 2',
    aircraft: 'Airbus A320',
    progress: 0,
    weather: {
      departure: 'Overcast, 65°F',
      arrival: 'Sunny, 85°F'
    },
    passengers: 142,
    distance: 1197
  },
  {
    id: '3',
    flightNumber: 'UA9012',
    airline: 'United Airlines',
    from: 'San Francisco (SFO)',
    to: 'Seattle (SEA)',
    departureTime: '16:45',
    arrivalTime: '19:20',
    actualArrival: '19:15',
    status: 'arrived',
    gate: 'C5',
    terminal: 'Terminal 3',
    aircraft: 'Boeing 757-200',
    progress: 100,
    weather: {
      departure: 'Foggy, 58°F',
      arrival: 'Rainy, 52°F'
    },
    passengers: 189,
    distance: 679
  }
];

export const FlightTracker: React.FC<FlightTrackerProps> = ({ flightNumber, onClose }) => {
  const [selectedFlight, setSelectedFlight] = useState<FlightStatus | null>(null);
  const [searchTerm, setSearchTerm] = useState(flightNumber || '');
  const [flights, setFlights] = useState<FlightStatus[]>(mockFlightData);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto-refresh flight data every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate real-time updates
      setFlights(prev => prev.map(flight => {
        if (flight.status === 'in-flight' && flight.progress < 100) {
          const newProgress = Math.min(flight.progress + Math.random() * 5, 100);
          const newAltitude = flight.altitude ? flight.altitude + (Math.random() - 0.5) * 1000 : undefined;
          const newSpeed = flight.speed ? flight.speed + (Math.random() - 0.5) * 20 : undefined;
          
          return {
            ...flight,
            progress: newProgress,
            altitude: Math.max(0, newAltitude || 0),
            speed: Math.max(0, newSpeed || 0),
            remainingTime: newProgress >= 100 ? '0m' : `${Math.floor((100 - newProgress) * 2)}m`
          };
        }
        return flight;
      }));
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="h-5 w-5 text-blue-500" />;
      case 'boarding': return <Users className="h-5 w-5 text-orange-500" />;
      case 'departed': return <Plane className="h-5 w-5 text-purple-500" />;
      case 'in-flight': return <Navigation className="h-5 w-5 text-green-500" />;
      case 'delayed': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'arrived': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled': return <AlertCircle className="h-5 w-5 text-red-600" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'boarding': return 'bg-orange-100 text-orange-800';
      case 'departed': return 'bg-purple-100 text-purple-800';
      case 'in-flight': return 'bg-green-100 text-green-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      case 'arrived': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFlights = flights.filter(flight =>
    flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (time: string) => {
    return new Date(`2024-01-01 ${time}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-6xl mx-auto">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Flight Tracker
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600">
                {autoRefresh ? 'Live Updates' : 'Paused'}
              </span>
            </div>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                autoRefresh 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {autoRefresh ? 'Pause' : 'Resume'}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
            <input
              type="text"
              placeholder="Search by flight number, airline, or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-lg"
            />
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>

        {/* Flight List */}
        <div className="space-y-4">
          {filteredFlights.map(flight => (
            <div 
              key={flight.id} 
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-100 hover:border-blue-300 transition-all cursor-pointer transform hover:scale-102"
              onClick={() => setSelectedFlight(flight)}
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {flight.flightNumber}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${getStatusColor(flight.status)}`}>
                      {getStatusIcon(flight.status)}
                      {flight.status.charAt(0).toUpperCase() + flight.status.slice(1)}
                    </span>
                    {flight.delay && flight.delay > 0 && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                        +{flight.delay}min delay
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Airline:</span>
                      <div>{flight.airline}</div>
                      <div className="text-gray-600">{flight.aircraft}</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Route:</span>
                      <div className="flex items-center gap-2">
                        <span>{flight.from}</span>
                        <Plane className="h-3 w-3 text-blue-500" />
                        <span>{flight.to}</span>
                      </div>
                      <div className="text-gray-600">{flight.distance} miles</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Schedule:</span>
                      <div>{formatTime(flight.departureTime)} - {formatTime(flight.arrivalTime)}</div>
                      {flight.estimatedArrival && (
                        <div className="text-gray-600">Est: {formatTime(flight.estimatedArrival)}</div>
                      )}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Gate & Terminal:</span>
                      <div>{flight.gate || 'TBD'}</div>
                      <div className="text-gray-600">{flight.terminal || 'TBD'}</div>
                    </div>
                  </div>

                  {/* Progress Bar for In-Flight */}
                  {flight.status === 'in-flight' && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">Flight Progress</span>
                        <span className="text-sm text-gray-600">{Math.round(flight.progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 relative"
                          style={{ width: `${flight.progress}%` }}
                        >
                          <div className="absolute right-0 top-0 h-3 w-6 bg-white rounded-full flex items-center justify-center transform translate-x-3">
                            <Plane className="h-2 w-2 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{flight.from.split('(')[1]?.replace(')', '')}</span>
                        <span>{flight.remainingTime} remaining</span>
                        <span>{flight.to.split('(')[1]?.replace(')', '')}</span>
                      </div>
                    </div>
                  )}

                  {/* Live Flight Data */}
                  {flight.status === 'in-flight' && (
                    <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="font-semibold text-gray-700">Altitude</div>
                        <div className="text-lg font-bold text-blue-600">{flight.altitude?.toLocaleString()}'</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="font-semibold text-gray-700">Speed</div>
                        <div className="text-lg font-bold text-purple-600">{flight.speed} mph</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="font-semibold text-gray-700">ETA</div>
                        <div className="text-lg font-bold text-green-600">{flight.remainingTime}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFlights.length === 0 && (
          <div className="text-center py-12">
            <Plane className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No flights found</h3>
            <p className="text-gray-500">Try searching with a different flight number or airline.</p>
          </div>
        )}

        {/* Detailed Flight Modal */}
        {selectedFlight && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
              <button
                onClick={() => setSelectedFlight(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition-colors z-10 bg-white rounded-full p-2 shadow-lg"
              >
                ✕
              </button>
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {selectedFlight.flightNumber}
                  </h2>
                  <p className="text-xl text-gray-700">{selectedFlight.airline}</p>
                  <div className="flex items-center justify-center mt-4">
                    <span className={`px-4 py-2 rounded-full text-lg font-semibold flex items-center gap-2 ${getStatusColor(selectedFlight.status)}`}>
                      {getStatusIcon(selectedFlight.status)}
                      {selectedFlight.status.charAt(0).toUpperCase() + selectedFlight.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Flight Route Visualization */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedFlight.from.split('(')[1]?.replace(')', '')}</div>
                      <div className="text-sm text-gray-600">{selectedFlight.from.split('(')[0]}</div>
                      <div className="text-lg font-semibold mt-2">{formatTime(selectedFlight.departureTime)}</div>
                      {selectedFlight.actualDeparture && (
                        <div className="text-sm text-green-600">Actual: {formatTime(selectedFlight.actualDeparture)}</div>
                      )}
                    </div>
                    
                    <div className="flex-1 mx-8">
                      <div className="relative">
                        <div className="w-full h-1 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full"></div>
                        {selectedFlight.status === 'in-flight' && (
                          <div 
                            className="absolute top-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                            style={{ width: `${selectedFlight.progress}%` }}
                          ></div>
                        )}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="bg-white rounded-full p-3 shadow-lg">
                            <Plane className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-4">
                        <div className="text-sm text-gray-600">{selectedFlight.distance} miles</div>
                        {selectedFlight.remainingTime && (
                          <div className="text-sm font-semibold text-purple-600">{selectedFlight.remainingTime} remaining</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{selectedFlight.to.split('(')[1]?.replace(')', '')}</div>
                      <div className="text-sm text-gray-600">{selectedFlight.to.split('(')[0]}</div>
                      <div className="text-lg font-semibold mt-2">{formatTime(selectedFlight.arrivalTime)}</div>
                      {selectedFlight.estimatedArrival && (
                        <div className="text-sm text-orange-600">Est: {formatTime(selectedFlight.estimatedArrival)}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Flight Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-4 border-2 border-blue-100">
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                      <Plane className="h-5 w-5 mr-2 text-blue-500" />
                      Aircraft Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Type:</span> {selectedFlight.aircraft}</div>
                      <div><span className="font-medium">Passengers:</span> {selectedFlight.passengers}</div>
                      {selectedFlight.altitude && (
                        <div><span className="font-medium">Altitude:</span> {selectedFlight.altitude.toLocaleString()} ft</div>
                      )}
                      {selectedFlight.speed && (
                        <div><span className="font-medium">Speed:</span> {selectedFlight.speed} mph</div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border-2 border-purple-100">
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                      <MapPin className="h-5 w-5 mr-2 text-purple-500" />
                      Gate & Terminal
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Gate:</span> {selectedFlight.gate || 'TBD'}</div>
                      <div><span className="font-medium">Terminal:</span> {selectedFlight.terminal || 'TBD'}</div>
                      {selectedFlight.delay && selectedFlight.delay > 0 && (
                        <div className="text-red-600">
                          <span className="font-medium">Delay:</span> {selectedFlight.delay} minutes
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 border-2 border-green-100">
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-green-500" />
                      Weather
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Departure:</span> {selectedFlight.weather.departure}</div>
                      <div><span className="font-medium">Arrival:</span> {selectedFlight.weather.arrival}</div>
                    </div>
                  </div>
                </div>

                {/* Live Updates Section */}
                {selectedFlight.status === 'in-flight' && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                    <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                      <Signal className="h-5 w-5 mr-2 text-green-500" />
                      Live Flight Data
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{Math.round(selectedFlight.progress)}%</div>
                        <div className="text-sm text-gray-600">Complete</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{selectedFlight.altitude?.toLocaleString()}'</div>
                        <div className="text-sm text-gray-600">Altitude</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{selectedFlight.speed}</div>
                        <div className="text-sm text-gray-600">mph</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{selectedFlight.remainingTime}</div>
                        <div className="text-sm text-gray-600">Remaining</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};