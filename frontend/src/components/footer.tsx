// import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import {Phone,Mail,MapPinHouse} from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-white text-black py-20 px-40">
      <div className="container mx-auto px-6 grid grid-cols-4 gap-8 text-left">
        {/* Brand & Description */}
        <div>
          <h2 className="text-2xl font-bold">Vegefoods</h2>
          <p className="mt-2 text-gray-600">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.
          </p>
          {/* <div className="flex space-x-4 mt-4">
            <FaTwitter className="text-black hover:text-gray-600 cursor-pointer" />
            <FaFacebookF className="text-black hover:text-gray-600 cursor-pointer" />
            <FaInstagram className="text-black hover:text-gray-600 cursor-pointer" />
          </div> */}
        </div>
        
        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold">Menu</h3>
          <ul className="mt-2 text-gray-600 space-y-2">
            <li><a href="#" className="hover:text-green-400">Shop</a></li>
            <li><a href="#" className="hover:text-green-400">About</a></li>
            <li><a href="#" className="hover:text-green-400">Journal</a></li>
            <li><a href="#" className="hover:text-green-400">Contact Us</a></li>
          </ul>
        </div>

        {/* Help & Policies */}
        <div>
          <h3 className="text-lg font-semibold">Help</h3>
          <ul className="mt-2 text-gray-600 space-y-2">
            <li><a href="#" className="hover:text-green-400">Shipping Information</a></li>
            <li><a href="#" className="hover:text-green-400">Returns & Exchange</a></li>
            <li><a href="#" className="hover:text-green-400">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-green-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-400">FAQs</a></li>
          </ul>
        </div>
      
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold">Have a Questions?</h3>
          <p className="mt-2 text-gray-600 flex gap-4"><Phone size={20}/>Phone Number</p>
          <p className="mt-1 text-gray-600 flex gap-4"><MapPinHouse size={20}/>Address</p>
          <p className="mt-1 text-gray-600 flex gap-4"><Mail size={20}/>Email</p>
        </div>
      </div>
      <p className="text-center text-gray-600 mt-10 text-sm">
        Copyright ©2025 All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
