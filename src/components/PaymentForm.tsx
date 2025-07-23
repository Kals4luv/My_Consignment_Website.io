import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      padding: '12px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
  hidePostalCode: false,
};

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  onSuccess,
  onError,
  customerInfo
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setIsProcessing(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
        },
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      // In a real application, you would send the payment method to your server
      // to create a payment intent and confirm the payment
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          currency: 'usd',
          payment_method_id: paymentMethod.id,
          customer_info: customerInfo,
        }),
      });

      const { client_secret } = await response.json();

      // Confirm the payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(client_secret);

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        setPaymentStatus('success');
        onSuccess(paymentIntent);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Payment failed';
      setErrorMessage(errorMsg);
      setPaymentStatus('error');
      onError(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'processing':
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <CreditCard className="h-5 w-5 text-blue-600" />;
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'processing':
        return 'Processing payment...';
      case 'success':
        return 'Payment successful!';
      case 'error':
        return errorMessage;
      default:
        return '';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
      <div className="flex items-center mb-6">
        <Lock className="h-6 w-6 text-green-600 mr-2" />
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Secure Payment
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Amount */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Total Amount:</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${amount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Customer Information Display */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-700 mb-2">Billing Information</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div><strong>Name:</strong> {customerInfo.name}</div>
            <div><strong>Email:</strong> {customerInfo.email}</div>
            {customerInfo.phone && <div><strong>Phone:</strong> {customerInfo.phone}</div>}
          </div>
        </div>

        {/* Card Element */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Information
          </label>
          <div className="border-2 border-blue-200 rounded-xl p-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-start">
            <Lock className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
            <div className="text-sm text-green-800">
              <strong>Your payment is secure:</strong> We use Stripe's industry-leading encryption to protect your card details. Your information is never stored on our servers.
            </div>
          </div>
        </div>

        {/* Status Message */}
        {paymentStatus !== 'idle' && (
          <div className={`flex items-center p-4 rounded-xl ${
            paymentStatus === 'success' ? 'bg-green-50 border border-green-200' :
            paymentStatus === 'error' ? 'bg-red-50 border border-red-200' :
            'bg-blue-50 border border-blue-200'
          }`}>
            {getStatusIcon()}
            <span className={`ml-2 font-medium ${
              paymentStatus === 'success' ? 'text-green-800' :
              paymentStatus === 'error' ? 'text-red-800' :
              'text-blue-800'
            }`}>
              {getStatusMessage()}
            </span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe || isProcessing || paymentStatus === 'success'}
          className={`w-full py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 ${
            paymentStatus === 'success'
              ? 'bg-green-500 text-white cursor-not-allowed'
              : isProcessing
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
          }`}
        >
          {getStatusIcon()}
          <span>
            {paymentStatus === 'success' ? 'Payment Complete' :
             isProcessing ? 'Processing...' :
             `Pay $${amount.toFixed(2)}`}
          </span>
        </button>
      </form>

      {/* Powered by Stripe */}
      <div className="mt-4 text-center">
        <div className="text-xs text-gray-500">
          Powered by <span className="font-semibold text-blue-600">Stripe</span> • 
          <span className="ml-1">PCI DSS Compliant</span>
        </div>
      </div>
    </div>
  );
};