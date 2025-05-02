import { Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './components/Cart';
import Dashboard from './components/Dashboard';
import { ReactElement, useState, useEffect } from 'react';
import RefreshHandler from './RefreshHandler';
import AddProduct from './components/Addproduct';
import Shop from './components/shop';
import Contact from './components/Contact';
import TermsAndPrivacy from './components/TermsAndPrivacy';
import FAQ from './components/FAQ';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import About from './components/About';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // This useEffect hook sets the document title when the app loads
  // It runs only once when the component mounts (empty dependency array [])
  useEffect(() => {
    document.title = "Veggie Cart";
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const PrivateRoute = ({ element }: { element: ReactElement }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className='App'>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
    <Routes>
      {/* Public Routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      {/* Redirect to dashboard if authenticated, else to login */}
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
      />

      {/* Private Routes */}
      <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
      <Route path='/cart' element={<PrivateRoute element={<Cart />} />} />
      <Route path='/addProduct' element={<PrivateRoute element={<AddProduct />} />} />
      <Route path='/shop' element={<PrivateRoute element={<Shop />} />} />
      <Route path='/contact' element={<PrivateRoute element={<Contact />} />} />
      <Route path='/terms' element={<PrivateRoute element={<TermsAndPrivacy />} />} />
      <Route path='/privacy' element={<PrivateRoute element={<TermsAndPrivacy />} />} />
      <Route path='/faq' element={<PrivateRoute element={<FAQ />} />} />
      <Route path='/about' element={<PrivateRoute element={<About />} />} />
      <Route path='/checkout' element={<PrivateRoute element={<Checkout />} />} />
      <Route path='/order-confirmation' element={<PrivateRoute element={<OrderConfirmation />} />} />
    </Routes>
  </div>
  );
}

export default App;