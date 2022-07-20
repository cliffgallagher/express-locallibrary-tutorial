import { useContext } from 'react';
import {AuthContext} from '../context/auth-context';

const useAuth = async () => {
    const auth = useContext(AuthContext);
    
    const response = await fetch('catalog/enhanced', {
        headers: {
            'Authorization': `Bearer ${auth.token}`
        }
    });
    const body = await response.json();

    console.log('body in useAuth: ' + JSON.stringify(body));

    return {
        auth: auth,
        body: body
    } 
}

export default useAuth;