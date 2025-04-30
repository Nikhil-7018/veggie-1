import { useNavigate } from "react-router-dom";

const TermsAndPrivacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
          >
            ← Back to Home
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Terms & Privacy</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          {/* Terms and Conditions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Terms and Conditions</h2>
            <div className="space-y-4 text-gray-600">
              <p>Last updated: March 2024</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6">1. Acceptance of Terms</h3>
              <p>By accessing and using VeggieCart, you accept and agree to be bound by these Terms and Conditions.</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">2. User Accounts</h3>
              <p>You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your account information.</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">3. Orders and Payments</h3>
              <p>All orders are subject to availability. We reserve the right to refuse or cancel any order for any reason.</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">4. Delivery</h3>
              <p>Delivery times are estimates and not guaranteed. We are not responsible for delays beyond our control.</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">5. Returns and Refunds</h3>
              <p>Returns must be made within 7 days of delivery. Products must be in their original condition.</p>
            </div>
          </section>

          {/* Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Privacy Policy</h2>
            <div className="space-y-4 text-gray-600">
              <p>Last updated: March 2024</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">1. Information We Collect</h3>
              <p>We collect personal information that you provide when you create an account, place an order, or contact us.</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">2. How We Use Your Information</h3>
              <p>We use your information to process orders, communicate with you, and improve our services.</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">3. Information Sharing</h3>
              <p>We do not sell your personal information. We may share it with service providers who assist in our operations.</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">4. Data Security</h3>
              <p>We implement security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">5. Your Rights</h3>
              <p>You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.</p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6">6. Cookies</h3>
              <p>We use cookies to improve your experience on our website. You can control cookies through your browser settings.</p>
            </div>
          </section>

          <div className="mt-12 text-center text-gray-600">
            <p>If you have any questions about these Terms and Privacy Policy, please contact us at:</p>
            <p className="mt-2">Email: privacy@veggiecart.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPrivacy; 