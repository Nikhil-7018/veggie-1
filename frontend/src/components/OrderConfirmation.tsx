import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">What's Next?</h2>
            <ul className="text-left space-y-3 text-gray-600">
              <li>• You will receive an order confirmation email shortly</li>
              <li>• Our team will process your order within 24 hours</li>
              <li>• You can track your order status in your account</li>
              <li>• For any questions, please contact our support team</li>
            </ul>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/orders')}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 