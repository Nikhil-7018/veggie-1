import '../index.css';
import { Phone, Mail, Truck, ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user || '');
  }, []);

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser');
      setLoggedInUser('');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 bg-white shadow-md z-50" id="hero">
      <div className="flex">
        {/* Logo Container */}
        <div className="flex-shrink-0 flex -mt-4">
          <a href="#">
            <img className="h-30 w-30" src="/images/logo.jpg" alt="Logo" />
          </a>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center bg-lime-700 px-8 py-2 text-white">
            <div className="flex items-center gap-2">
              <Phone size={20} />
              <span>+91 1234567890</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={20} />
              <span>contact@veggiecart.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck size={20} />
              <span>Delivery in 24 hours & Free Returns</span>
            </div>
          </div>

          {/* Main Navigation Bar */}
          <nav className="flex justify-between items-center px-8 py-4">
            <div className="font-bold text-2xl text-green-500">
              <Link to="/">VEGEFOODS</Link>
            </div>
            <div className="flex space-x-10 text-gray-800 font-medium">
              <a href="#" onClick={() => scrollToSection("hero")} className="hover:text-green-500">Home</a>
              <Link to='/shop' className="hover:text-green-500">Shop</Link>
              <Link to="/addProduct" className="hover:text-green-500">AddProducts</Link>
              <Link to="/contact" className="hover:text-green-500">Contact</Link>
              <Link to="/cart">
                <div className="flex font-bold hover:text-green-500"> 
                  Cart
                  <ShoppingBasket size={25} />
                </div>
              </Link>
              {loggedInUser && (
                <button 
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-purple-800 transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
