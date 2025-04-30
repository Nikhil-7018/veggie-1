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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to Veggie Cart</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={loginInfo.email}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={loginInfo.password}
                onChange={handleChange}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-green-600 hover:text-green-500">
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