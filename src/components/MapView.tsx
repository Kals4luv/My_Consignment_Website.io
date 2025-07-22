import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { MapPin, Plane, Package, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapLocation {
  id: string;
  name: string;
  coordinates: LatLngExpression;
  type: 'consignment' | 'airport' | 'user';
  details?: {
    title?: string;
    price?: number;
    seller?: string;
    flightCode?: string;
    airline?: string;
  };
}

interface MapViewProps {
  locations: MapLocation[];
  center?: LatLngExpression;
  zoom?: number;
  showFlightPaths?: boolean;
  flightRoutes?: Array<{
    from: LatLngExpression;
    to: LatLngExpression;
    airline: string;
    flightNumber: string;
  }>;
  onLocationClick?: (location: MapLocation) => void;
}

// City coordinates for common locations
const cityCoordinates: Record<string, LatLngExpression> = {
  'New York, NY': [40.7128, -74.0060],
  'Los Angeles, CA': [34.0522, -118.2437],
  'Chicago, IL': [41.8781, -87.6298],
  'Boston, MA': [42.3601, -71.0589],
  'Miami, FL': [25.7617, -80.1918],
  'Seattle, WA': [47.6062, -122.3321],
  'NYC': [40.7128, -74.0060],
  'LAX': [34.0522, -118.2437],
  'ORD': [41.8781, -87.6298],
  'MIA': [25.7617, -80.1918],
};

export const MapView: React.FC<MapViewProps> = ({
  locations,
  center = [39.8283, -98.5795], // Center of USA
  zoom = 4,
  showFlightPaths = false,
  flightRoutes = [],
  onLocationClick
}) => {
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log('Location access denied or unavailable');
        }
      );
    }
    setMapReady(true);
  }, []);

  // Create custom icons
  const createCustomIcon = (type: string, color: string) => {
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 0C5.6 0 0 5.6 0 12.5c0 12.5 12.5 28.5 12.5 28.5s12.5-16 12.5-28.5C25 5.6 19.4 0 12.5 0z" fill="${color}"/>
          <circle cx="12.5" cy="12.5" r="6" fill="white"/>
          <text x="12.5" y="16" text-anchor="middle" font-size="8" fill="${color}">${type === 'consignment' ? '🛍️' : type === 'airport' ? '✈️' : '📍'}</text>
        </svg>
      `)}`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  };

  const consignmentIcon = createCustomIcon('consignment', '#8b5cf6');
  const airportIcon = createCustomIcon('airport', '#3b82f6');
  const userIcon = createCustomIcon('user', '#ef4444');

  const getIcon = (type: string) => {
    switch (type) {
      case 'consignment': return consignmentIcon;
      case 'airport': return airportIcon;
      case 'user': return userIcon;
      default: return consignmentIcon;
    }
  };

  if (!mapReady) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <Navigation className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Loading interactive map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-purple-200">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User location marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <div className="text-center p-2">
                <div className="flex items-center justify-center mb-2">
                  <Navigation className="h-5 w-5 text-red-500 mr-2" />
                  <span className="font-semibold">Your Location</span>
                </div>
                <p className="text-sm text-gray-600">Current position</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Location markers */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.coordinates}
            icon={getIcon(location.type)}
            eventHandlers={{
              click: () => onLocationClick?.(location),
            }}
          >
            <Popup>
              <div className="p-3 min-w-48">
                <div className="flex items-center mb-2">
                  {location.type === 'consignment' && <Package className="h-5 w-5 text-purple-500 mr-2" />}
                  {location.type === 'airport' && <Plane className="h-5 w-5 text-blue-500 mr-2" />}
                  {location.type === 'user' && <MapPin className="h-5 w-5 text-red-500 mr-2" />}
                  <h3 className="font-semibold text-lg">{location.name}</h3>
                </div>
                
                {location.details && (
                  <div className="space-y-1 text-sm">
                    {location.details.title && (
                      <p><span className="font-medium">Item:</span> {location.details.title}</p>
                    )}
                    {location.details.price && (
                      <p><span className="font-medium">Price:</span> ${location.details.price}</p>
                    )}
                    {location.details.seller && (
                      <p><span className="font-medium">Seller:</span> {location.details.seller}</p>
                    )}
                    {location.details.flightCode && (
                      <p><span className="font-medium">Flight:</span> {location.details.flightCode}</p>
                    )}
                    {location.details.airline && (
                      <p><span className="font-medium">Airline:</span> {location.details.airline}</p>
                    )}
                  </div>
                )}
                
                <button
                  onClick={() => onLocationClick?.(location)}
                  className="mt-3 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-full text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Flight path lines */}
        {showFlightPaths && flightRoutes.map((route, index) => (
          <Polyline
            key={index}
            positions={[route.from, route.to]}
            pathOptions={{
              color: '#3b82f6',
              weight: 3,
              opacity: 0.7,
              dashArray: '10, 10'
            }}
          >
            <Popup>
              <div className="text-center p-2">
                <Plane className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                <p className="font-semibold">{route.airline}</p>
                <p className="text-sm text-gray-600">{route.flightNumber}</p>
              </div>
            </Popup>
          </Polyline>
        ))}
      </MapContainer>
    </div>
  );
};

// Helper function to convert city names to coordinates
export const getCityCoordinates = (cityName: string): LatLngExpression => {
  return cityCoordinates[cityName] || [39.8283, -98.5795]; // Default to center of USA
};