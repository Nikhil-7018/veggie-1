import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

// Specify the type for setIsAuthenticated as a function that takes a boolean
interface RefreshHandlerProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

function RefreshHandler({ setIsAuthenticated }: RefreshHandlerProps) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
                if (location.pathname === '/' ||
                    location.pathname === '/login' ||
                    location.pathname === '/signup'
                ) {
                    navigate('/dashboard', { replace: false });
                }
            } else {
                setIsAuthenticated(false);
                if (location.pathname !== '/login' && location.pathname !== '/signup') {
                    navigate('/login', { replace: false });
                }
            }
        });

        return () => unsubscribe();
    }, [location, navigate, setIsAuthenticated])

    return null;
}

export default RefreshHandler