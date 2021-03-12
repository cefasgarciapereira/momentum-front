import { 
    createContext, 
    useState, 
    useEffect, 
    useContext 
} from 'react';
import axios from 'axios';
const SessionContext = createContext();

//const BASE_URL = process.env.REACT_APP_ENV === 'prod'? 'https://homolog-momentum-api.herokuapp.com' : 'https://homolog-momentum-api.herokuapp.com';
//const BASE_URL = 'https://homolog-momentum-api.herokuapp.com'
const BASE_URL = 'http://localhost:9000'

const SessionProvider = ({children}) => {
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

    const fetchApi = async (endpoint, bodyParams={}, method="GET") => {
        
        if(method==="GET"){
            const response = await axios.get(`${BASE_URL}/${endpoint}`, {
                headers: { Authorization: `Bearer ${user.token}` },
                params: {...bodyParams}
            })
            return response;
        }

        if(method==="POST"){
            const response = await axios.post(`${BASE_URL}/${endpoint}`, {
                headers: { Authorization: `Bearer ${user.token}` },
                params: bodyParams,
            })
            return response;
        }
    }
    
    return(
        <SessionContext.Provider
        value={{
            user,
            error,
            login,
            logout,
            fetchApi
        }}>
            {children}
        </SessionContext.Provider>
    );
}

const useSession = () => {
    const context = useContext(SessionContext);

    if(!context){
        throw new Error('useSession must be used within an AuthProvider.');
    }

    return context;
}

export {SessionProvider, useSession};