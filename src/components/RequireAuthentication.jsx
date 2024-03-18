
import { useCookie } from '../cookie/useCookie';
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom';


const RequireAuthentication = () => {
    const {auth}=useAuth();   
    const location =useLocation();  
    const {set,get,remove}=useCookie('isLog');
    const status=get();

    return (
        status ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
      );
}

export default RequireAuthentication;
