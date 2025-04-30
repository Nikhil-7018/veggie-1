import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-20 px-4 md:px-40">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
        {/* Brand & Description */}
        <div>
          <h2 className="text-2xl font-bold">Vegefoods</h2>
          <p className="mt-2 text-gray-600">
            Fresh, organic produce delivered straight from farm to your doorstep.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-500">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-500">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-500">
              <Instagram size={20} />
            </a>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold">Menu</h3>
          <ul className="mt-2 text-gray-600 space-y-2">
            <li><Link to="/" className="hover:text-green-500">Home</Link></li>
            <li><Link to="/shop" className="hover:text-green-500">Shop</Link></li>
            <li><Link to="/contact" className="hover:text-green-500">Contact Us</Link></li>
          </ul>
        </div>

        {/* Help & Policies */}
        <div>
          <h3 className="text-lg font-semibold">Help</h3>
          <ul className="mt-2 text-gray-600 space-y-2">
            <li><Link to="/contact?type=shipping" className="hover:text-green-500">Shipping Information</Link></li>
            <li><Link to="/contact?type=returns" className="hover:text-green-500">Returns & Exchange</Link></li>
            <li><Link to="/terms" className="hover:text-green-500">Terms & Conditions</Link></li>
            <li><Link to="/faq" className="hover:text-green-500">FAQs</Link></li>
          </ul>
        </div>
      
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold">Have a Questions?</h3>
          <div className="mt-2 text-gray-600 space-y-2">
            <p className="flex items-center gap-2">
              <Phone size={20} />
              <span>+91 70184xxxxx</span>
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={20} />
              <span>123 Farm Street, Agricultural Area, City</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail size={20} />
              <span>contact@veggiecart.com</span>
            </p>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-600 mt-10 text-sm">
        Copyright ©2025 All rights reserved | Made with ❤️ by VeggieCart
      </p>
    </footer>
  );
};

export default Footer;
