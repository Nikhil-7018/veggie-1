import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { handleError, handleSuccess } from "../utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

interface LoginInfo {
  email: string;
  password: string;
}

function Login() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: '',
    password: ''
  })

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof LoginInfo;
    setLoginInfo(prev => ({
      ...prev,
      [key]: value
    }));
  }

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('email and password are required');
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      handleSuccess('Login successful!');
      localStorage.setItem('token', user.uid);
      localStorage.setItem('loggedInUser', user.email || '');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error: any) {
      handleError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
  
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={loginInfo.email}
            className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={loginInfo.password}
            className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        <button 
          type="submit" 
          className="bg-blue-500 text-white font-semibold py-3 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
  
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
    <ToastContainer />
  </div>
  );
}

export default Login;