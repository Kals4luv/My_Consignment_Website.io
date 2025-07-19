import React from 'react';
import { Package, Plane, ShoppingBag, Clock } from 'lucide-react';

interface HeroProps {
  activeSection: 'consignment' | 'flights';
}

export const Hero: React.FC<HeroProps> = ({ activeSection }) => {
  const heroContent = activeSection === 'consignment' ? {
    title: 'Sell Your Items on Consignment',
    subtitle: 'Turn your unused items into cash with our trusted consignment platform',
    image: 'https://images.pexels.com/photos/1566412/pexels-photo-1566412.jpeg?auto=compress&cs=tinysrgb&w=1200',
    features: [
      { icon: ShoppingBag, text: 'Easy Listing Process' },
      { icon: Package, text: 'Secure Transactions' },
      { icon: Clock, text: 'Quick Payouts' }
    ]
  } : {
    title: 'Find Your Perfect Flight',
    subtitle: 'Compare prices and book flights from hundreds of airlines worldwide',
    image: 'https://images.pexels.com/photos/1010519/pexels-photo-1010519.jpeg?auto=compress&cs=tinysrgb&w=1200',
    features: [
      { icon: Plane, text: 'Best Prices' },
      { icon: Clock, text: 'Instant Booking' },
      { icon: ShoppingBag, text: 'Flexible Options' }
    ]
  };

  return (
    <div className="relative bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-20 animate-pulse"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-300 rounded-full opacity-25 animate-bounce" style={{animationDelay: '1s'}}></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroContent.image})` }}
      ></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-pulse">
            {heroContent.title}
          </h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto text-white text-opacity-90">
            {heroContent.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-8 animate-fade-in">
            {heroContent.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-opacity-30 transition-all transform hover:scale-105">
                <feature.icon className="h-5 w-5 animate-pulse" />
                <span className="text-sm sm:text-base font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transition-all transform hover:scale-110 shadow-2xl animate-bounce hover:animate-none">
            <span onClick={() => {
              const section = activeSection === 'consignment' ? 'consignment' : 'flights';
              document.querySelector(`[data-section="${section}"]`)?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Get Started
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};