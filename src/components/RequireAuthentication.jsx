
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom';


const RequireAuthentication = () => {
    const {auth}=useAuth();   
    const location =useLocation();  
    
    return (
        auth?.name ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
      );
}

export default RequireAuthentication;
