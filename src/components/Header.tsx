import React from 'react';
import { Plane, Package, User, Menu, X, ShoppingCart } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  activeSection: 'consignment' | 'flights';
  setActiveSection: (section: 'consignment' | 'flights') => void;
  setShowAuthModal: (show: boolean) => void;
  setShowBookingManagement: (show: boolean) => void;
  setShowCart: (show: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeSection, 
  setActiveSection, 
  setShowAuthModal,
  setShowBookingManagement,
  setShowCart
}) => {
  const { user, logout } = useUser();
  const { getTotalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => {
                setActiveSection('consignment');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-shrink-0 flex items-center hover:scale-105 transition-transform cursor-pointer"
            >
              <Package className="h-8 w-8 text-white mr-2 animate-bounce" />
              <span className="text-xl font-bold text-white">kalsXprezz</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => setActiveSection('consignment')}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                activeSection === 'consignment'
                  ? 'text-white border-b-2 border-white bg-white bg-opacity-20 rounded-t-lg px-3'
                  : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10 rounded px-3'
              }`}
            >
              <Package className="h-4 w-4 mr-1" />
              Consignment
            </button>
            <button
              onClick={() => setActiveSection('flights')}
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                activeSection === 'flights'
                  ? 'text-white border-b-2 border-white bg-white bg-opacity-20 rounded-t-lg px-3'
                  : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10 rounded px-3'
              }`}
            >
              <Plane className="h-4 w-4 mr-1" />
              Flights
            </button>
            {user && (
              <button
                onClick={() => setShowBookingManagement(true)}
                className="inline-flex items-center px-3 pt-1 text-sm font-medium text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10 rounded transition-colors"
              >
                <User className="h-4 w-4 mr-1" />
                My Bookings
              </button>
            )}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setShowCart(true)}
              className="relative bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-all transform hover:scale-105"
            >
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </button>
            {user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                <button
                  onClick={logout}
                  className="text-sm text-white text-opacity-80 hover:text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-300 hover:text-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-yellow-300 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b from-purple-600 to-pink-600 border-t border-white border-opacity-20">
            <button
              onClick={() => {
                setActiveSection('consignment');
                setMobileMenuOpen(false);
              }}
              className={`block px-3 py-2 text-base font-medium w-full text-left ${
                activeSection === 'consignment'
                  ? 'text-white bg-white bg-opacity-20 rounded-lg'
                  : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg'
              }`}
            >
              <Package className="h-4 w-4 inline mr-2" />
              Consignment
            </button>
            <button
              onClick={() => {
                setActiveSection('flights');
                setMobileMenuOpen(false);
              }}
              className={`block px-3 py-2 text-base font-medium w-full text-left ${
                activeSection === 'flights'
                  ? 'text-white bg-white bg-opacity-20 rounded-lg'
                  : 'text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg'
              }`}
            >
              <Plane className="h-4 w-4 inline mr-2" />
              Flights
            </button>
            {user && (
              <button
                onClick={() => {
                  setShowBookingManagement(true);
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 text-base font-medium w-full text-left text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-lg"
              >
                <User className="h-4 w-4 inline mr-2" />
                My Bookings
              </button>
            )}
          </div>
          <div className="px-4 py-3 border-t border-white border-opacity-20 bg-gradient-to-b from-pink-600 to-orange-500">
            <button
              onClick={() => {
                setShowCart(true);
                setMobileMenuOpen(false);
              }}
              className="relative bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-30 transition-all w-full flex items-center justify-center space-x-2 mb-3"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {getTotalItems() > 0 && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
          <div className="px-4 py-3 border-t border-white border-opacity-20 bg-gradient-to-b from-pink-600 to-orange-500">
            {user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <button
                    onClick={logout}
                    className="text-sm text-white text-opacity-80 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  setMobileMenuOpen(false);
                }}
                className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-300 hover:text-purple-700 transition-all transform hover:scale-105 shadow-lg w-full"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};