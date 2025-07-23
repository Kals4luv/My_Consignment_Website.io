import React, { useState } from 'react';
import { X, CreditCard, Shield } from 'lucide-react';
import { PaymentForm } from './PaymentForm';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  items: Array<{
    id: string;
    title: string;
    price: number;
    quantity: number;
  }>;
  onPaymentSuccess: (paymentIntent: any) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  amount,
  items,
  onPaymentSuccess
}) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  if (!isOpen) return null;

  const handleCustomerInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerInfo.name && customerInfo.email) {
      setShowPaymentForm(true);
    }
  };

  const handlePaymentSuccess = (paymentIntent: any) => {
    onPaymentSuccess(paymentIntent);
    onClose();
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    // You can show a toast notification or error message here
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition-colors z-10 bg-white rounded-full p-2 shadow-lg"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-12 w-12 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Secure Checkout
              </h2>
            </div>
          </div>

          {!showPaymentForm ? (
            <>
              {/* Order Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{item.title}</span>
                        <span className="text-gray-600 ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${amount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information Form */}
              <form onSubmit={handleCustomerInfoSubmit} className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Customer Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-blue-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 font-bold text-lg shadow-lg flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Continue to Payment</span>
                </button>
              </form>
            </>
          ) : (
            <PaymentForm
              amount={amount}
              customerInfo={customerInfo}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          )}
        </div>
      </div>
    </div>
  );
};