import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ConsignmentSection } from './components/ConsignmentSection';
import { FlightSection } from './components/FlightSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { BookingManagement } from './components/BookingManagement';
import { ShoppingCart } from './components/ShoppingCart';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';

function App() {
  const [activeSection, setActiveSection] = useState<'consignment' | 'flights'>('consignment');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBookingManagement, setShowBookingManagement] = useState(false);
  const [showCart, setShowCart] = useState(false);

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
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;