import { 
    createContext, 
    useState, 
    useEffect, 
    useContext 
} from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
const SessionContext = createContext();

//const BASE_URL = 'https://homolog-momentum-api.herokuapp.com'
const BASE_URL = process.env.NODE_ENV==='development' ? 'http://localhost:9000' : 'https://homolog-momentum-api.herokuapp.com'

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
            const decoded = jwt_decode(response.data.token);
            console.log('TOKEN', response.data.token);
            console.log("DECODED", decoded);
            setUser({...response.data.user, token: response.data.token});
            setError(false);
        })
        .catch(err => {
            console.log(err);
            try{
                setError(err.response.data.error ? err.response.data.error : `${err.name}: ${err.message}`);
            }catch(err){
                setError(`${err}`);
            }
        })
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
            
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            }

            const response = await axios.post(`${BASE_URL}/${endpoint}`, bodyParams, config)
            return response;
        }
    }

    const logout = async () => {
        setUser(null);
        localStorage.clear();
        await fetchApi('user/logout', {id: user._id}, "POST")
        window.location = "/"
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