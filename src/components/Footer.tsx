import React from 'react';
import { Package, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

interface FooterProps {
  setShowBookingManagement?: (show: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ setShowBookingManagement }) => {
  return (
    <footer className="bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-10"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-15 animate-bounce"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Package className="h-8 w-8 text-yellow-400 mr-2 animate-bounce" />
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">kalsXprezz</span>
            </div>
            <p className="text-white text-opacity-80 mb-4">
              Your trusted platform for consignment sales and flight bookings. 
              Discover unique items and book your next adventure.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-white text-opacity-60 hover:text-yellow-400 cursor-pointer transition-all transform hover:scale-125" />
              <Twitter className="h-5 w-5 text-white text-opacity-60 hover:text-pink-400 cursor-pointer transition-all transform hover:scale-125" />
              <Instagram className="h-5 w-5 text-white text-opacity-60 hover:text-purple-400 cursor-pointer transition-all transform hover:scale-125" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Consignment</h3>
            <ul className="space-y-2 text-white text-opacity-70">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Sell Items</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Browse Items</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Seller Guidelines</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Flights</h3>
            <ul className="space-y-2 text-white text-opacity-70">
              <li><a href="#" className="hover:text-pink-400 transition-colors">Search Flights</a></li>
              <li>
                <button 
                  onClick={() => setShowBookingManagement?.(true)}
                  className="hover:text-pink-400 transition-colors text-left"
                >
                  Manage Booking
                </button>
              </li>
              <li><a href="#" className="hover:text-pink-400 transition-colors">Flight Status</a></li>
              <li>
                <button 
                  onClick={() => {
                    const event = new CustomEvent('openTravelInsurance');
                    window.dispatchEvent(event);
                  }}
                  className="hover:text-pink-400 transition-colors text-left"
                >
                  Travel Insurance
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Contact</h3>
            <div className="space-y-2 text-white text-opacity-70">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-purple-400" />
                <span>hello@kalsxprezz.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-pink-400" />
                <span>+234 7011180318</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-yellow-400" />
                <span>Aba,Abia State.Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center text-white text-opacity-70 relative">
          <p>&copy; 2025 <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent font-semibold">kalsXprezz</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};