import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ConsignmentSection } from './components/ConsignmentSection';
import { FlightSection } from './components/FlightSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { UserProvider } from './contexts/UserContext';

function App() {
  const [activeSection, setActiveSection] = useState<'consignment' | 'flights'>('consignment');
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
          setShowAuthModal={setShowAuthModal}
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
        
        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} />
        )}
      </div>
    </UserProvider>
  );
}

export default App;