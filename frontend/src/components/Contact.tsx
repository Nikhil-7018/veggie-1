import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapPin, Phone, Mail, Clock, Truck } from "lucide-react";

const Contact = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inquiryType = searchParams.get('type');

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    farmerId: "",
    deliveryPreference: "standard",
    preferredTime: "",
  });

  useEffect(() => {
    // Pre-fill message based on inquiry type
    if (inquiryType === 'shipping') {
      setFormData(prev => ({
        ...prev,
        message: "I would like to inquire about shipping information for my order. Please provide details about delivery times, costs, and tracking options."
      }));
    } else if (inquiryType === 'returns') {
      setFormData(prev => ({
        ...prev,
        message: "I would like to request a return/exchange for my order. Please provide information about the return process and any applicable policies."
      }));
    }
  }, [inquiryType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Form submitted:", formData);
    toast.success("Your message has been sent! A farmer will contact you soon.", {
      position: "top-center",
      autoClose: 3000,
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      farmerId: "",
      deliveryPreference: "standard",
      preferredTime: "",
    });
  };

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
          <h1 className="text-3xl font-bold text-gray-800">
            {inquiryType === 'shipping' ? 'Shipping Information' : 
             inquiryType === 'returns' ? 'Returns & Exchange' : 
             'Connect with Farmers'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Connect with Farmers?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Truck className="text-green-500 mt-1 mr-3" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-800">Direct Farm-to-Table Delivery</h3>
                    <p className="text-gray-600">Get fresh produce directly from the farm to your doorstep</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Clock className="text-green-500 mt-1 mr-3" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-800">Flexible Delivery Options</h3>
                    <p className="text-gray-600">Choose your preferred delivery time and method</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="text-green-500 mt-1 mr-3" size={20} />
                  <div>
                    <h3 className="font-semibold text-gray-800">Direct Communication</h3>
                    <p className="text-gray-600">Chat directly with farmers about your requirements</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="text-green-500 mr-3" size={20} />
                  <p className="text-gray-600">123 Farm Street, Agricultural Area, City</p>
                </div>
                <div className="flex items-center">
                  <Phone className="text-green-500 mr-3" size={20} />
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
                <div className="flex items-center">
                  <Mail className="text-green-500 mr-3" size={20} />
                  <p className="text-gray-600">contact@veggiecart.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact; 