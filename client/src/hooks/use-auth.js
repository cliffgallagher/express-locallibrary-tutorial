import {AuthContext} from '../context/auth-context';

const useAuth = () => {
    if (typeof body === 'object') {
        if (body.name === 'TokenExpiredError') {
            auth.setIsLoggedIn(false);
        }
    }
}

export default useAuth;