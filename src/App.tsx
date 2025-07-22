import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ConsignmentSection } from './components/ConsignmentSection';
import { FlightSection } from './components/FlightSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { BookingManagement } from './components/BookingManagement';
import { ShoppingCart } from './components/ShoppingCart';
import { FlightTracker } from './components/FlightTracker';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';

function App() {
  const [activeSection, setActiveSection] = useState<'consignment' | 'flights'>('consignment');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBookingManagement, setShowBookingManagement] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showFlightTracker, setShowFlightTracker] = useState(false);

  // Listen for flight tracker events from header
  React.useEffect(() => {
    const handleOpenFlightTracker = () => {
      setShowFlightTracker(true);
    };

    window.addEventListener('openFlightTracker', handleOpenFlightTracker);
    return () => window.removeEventListener('openFlightTracker', handleOpenFlightTracker);
  }, []);

  return (
    <UserProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
            setShowAuthModal={setShowAuthModal}
            setShowBookingManagement={setShowBookingManagement}
            setShowCart={setShowCart}
          />
          <Hero activeSection={activeSection} />
          
          <main data-section={activeSection}>
            {activeSection === 'consignment' ? (
              <div data-section="consignment">
                <ConsignmentSection />
              </div>
            ) : (
              <div data-section="flights">
                <FlightSection />
              </div>
            )}
          </main>
          
          <Footer setShowBookingManagement={setShowBookingManagement} />
          
          {showAuthModal && (
            <AuthModal onClose={() => setShowAuthModal(false)} />
          )}
          
          {showBookingManagement && (
            <BookingManagement onClose={() => setShowBookingManagement(false)} />
          )}
          
          {showCart && (
            <ShoppingCart onClose={() => setShowCart(false)} />
          )}
          
          {showFlightTracker && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
              <div className="relative w-full max-w-7xl max-h-[95vh] overflow-y-auto">
                <button
                  onClick={() => setShowFlightTracker(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition-colors z-10 bg-white rounded-full p-3 shadow-lg"
                >
                  <X className="h-6 w-6" />
                </button>
                <FlightTracker onClose={() => setShowFlightTracker(false)} />
              </div>
            </div>
          )}
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;