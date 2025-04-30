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
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    // <div className="App">
    //   <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
    //   <Routes>
    //     <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/signup" element={<Signup />} />
    //     <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
    //     <Route path="/cart" element={<Cart />} />
    //     <Route path="/addProduct" element={<AddProduct />} />
    //     <Route path="/shop" element={<Shop />} />
    //   </Routes>
    // </div>
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
    </Routes>
  </div>
  );
}

export default App;