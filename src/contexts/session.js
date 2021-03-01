import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const SessionContext = createContext();

//const BASE_URL = process.env.NODE_ENV === 'development' ? 'https://homolog-momentum-api.herokuapp.com' : 'https://homolog-momentum-api.herokuapp.com'
const BASE_URL = 'https://homolog-momentum-api.herokuapp.com'

export const SessionProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const cookieLogin = () => {
            try{
                const cookieUser = localStorage.getItem('@momentum:user');
                setUser(JSON.parse(cookieUser))
            }catch(err){
                console.log('Cookie Login: ',err)
            }
        }
        cookieLogin();
    },[])

    useEffect(() => {
        const remindUser = () => {
            if(user){
                try{
                    localStorage.setItem('@momentum:user', JSON.stringify(user));
                }catch(err){
                    alert(err)
                    console.log(err)
                }
            }
        }
        remindUser();
    },[user])

    const login = async (credentials) => {
        await axios.post(`${BASE_URL}/user/login`, {...credentials})
        .then(async response => {
            setUser({...response.data.user, token: response.data.token});
            setError(false);
        })
        .catch(err => {
            console.log(err);
            setError(err.response.data.error ? err.response.data.error : `${err.name}: ${err.message}`)
        })
    }

    const logout = () => {
        setUser(null);
        localStorage.clear();
    }
    
    return(
        <SessionContext.Provider
        value={{
            user,
            error,
            login,
            logout
        }}>
            {children}
        </SessionContext.Provider>
    );
}

export default SessionContext;