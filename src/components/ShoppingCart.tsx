import React, { useState } from 'react';
import { X, ShoppingCart as ShoppingCartIcon, Plus, Minus, Trash2, CreditCard, Package } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { StripeProvider } from './StripeProvider';
import { CheckoutModal } from './CheckoutModal';

interface ShoppingCartProps {
  onClose: () => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [showStripeCheckout, setShowStripeCheckout] = useState(false);

  const handlePaymentSuccess = (paymentIntent: any) => {
    console.log('Payment successful:', paymentIntent);
    alert('Payment successful! Your order has been confirmed.');
    clearCart();
    setShowStripeCheckout(false);
  };

  return (
    <StripeProvider>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-purple-600 transition-colors z-10 bg-white rounded-full p-2 shadow-lg"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="p-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Shopping Cart ({cartItems.length} items)
            </h2>

            {cartItems.length > 0 ? (
              <>
                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-100">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.condition} • {item.seller}</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              ${item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-purple-200 text-purple-700 p-1 rounded-full hover:bg-purple-300 transition-all"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-purple-200 text-purple-700 p-1 rounded-full hover:bg-purple-300 transition-all"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-200 text-red-700 p-2 rounded-full hover:bg-red-300 transition-all ml-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-semibold">Total:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={clearCart}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-400 transition-all font-medium"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={() => setShowStripeCheckout(true)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-full hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 font-semibold shadow-lg flex items-center justify-center space-x-2"
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>Secure Checkout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <ShoppingCartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some items to your cart to get started!</p>
                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <CheckoutModal
        isOpen={showStripeCheckout}
        onClose={() => setShowStripeCheckout(false)}
        amount={getTotalPrice()}
        items={cartItems}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </StripeProvider>
  );
};