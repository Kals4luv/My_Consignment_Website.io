import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ConsignmentSection } from './components/ConsignmentSection';
import { FlightSection } from './components/FlightSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { BookingManagement } from './components/BookingManagement';
import { UserProvider } from './contexts/UserContext';

function App() {
  const [activeSection, setActiveSection] = useState<'consignment' | 'flights'>('consignment');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showBookingManagement, setShowBookingManagement] = useState(false);

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          setShowAuthModal={setShowAuthModal}
          setShowBookingManagement={setShowBookingManagement}
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
        
        <Footer />
        <Footer setShowBookingManagement={setShowBookingManagement} />
        
        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} />
        )}
        
        {showBookingManagement && (
          <BookingManagement onClose={() => setShowBookingManagement(false)} />
        )}
      </div>
    </UserProvider>
  );
}

export default App;