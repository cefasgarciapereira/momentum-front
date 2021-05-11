import {
    createContext,
    useState,
    useEffect,
    useContext,
} from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import { parseError } from 'utils/helper';
const SessionContext = createContext();

const BASE_URL = process.env.REACT_APP_ENV === 'prod' ? "https://easyquant-api.herokuapp.com" :
    process.env.REACT_APP_ENV === 'homolog' ? "https://homolog-momentum-api.herokuapp.com" : 'http://localhost:9000'

console.log("Enviorment: ", process.env.REACT_APP_ENV)

const SessionProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    const register = async (newUser) => {
        if (newUser.password === newUser.password_confirmation) {
            await axios.post(`${BASE_URL}/user/register`, { ...newUser })
                .then(response => {
                    const decoded = jwt_decode(response.data.token);
                    setUser({ ...decoded.user, token: response.data.token, refreshToken: response.data.refreshToken });
                    setError(false);
                })
                .catch(err => {
                    try {
                        setError(err.response.data.error ? err.response.data.error : `${err.name}: ${err.message}`);
                    } catch (err) {
                        setError(`${err}`);
                    }
                })
        } else {
            setError('As senhas não coincidem.')
        }
    }

    const registerWithCloseFriends = async (newUser) => {
        console.log(newUser)
        if (newUser.password === newUser.password_confirmation) {
            try{
                const response = await axios.post(`${BASE_URL}/user/registerWithCloseFriends`, { ...newUser })
                const decoded = jwt_decode(response.data.token);
                setUser({ 
                    ...decoded.user, 
                    token: response.data.token, 
                 });
                return response
            }catch(err){
                throw new Error(parseError(err));
            }
        }else{
            throw new Error("As senhas não coincidem");
        }
    }

    const registerAndSubscribe = async (newUser) => {
        console.log(newUser)
        if (newUser.password === newUser.password_confirmation) {
            try{
                const response = await axios.post(`${BASE_URL}/user/registerAndSubscribe`, { ...newUser })
                const decoded = jwt_decode(response.data.token);
                setUser({ 
                    ...decoded.user, 
                    token: response.data.token, 
                 });
                return response
            }catch(err){
                throw new Error(parseError(err));
            }
        }else{
            throw new Error("As senhas não coincidem");
        }
    }

    const login = async (credentials) => {
        await axios.post(`${BASE_URL}/user/login`, { ...credentials })
            .then(response => {
                const decoded = jwt_decode(response.data.token);
                setUser({ ...decoded.user, token: response.data.token, refreshToken: response.data.refreshToken });
                setError(false);
            })
            .catch(err => {
                console.log(err);
                if(err.response.data.error.message){
                    setError(err.response.data.error.message);
                }
                else if (err.response.data.error) {
                    setError(err.response.data.error);
                } else {
                    setError(`Um erro inesperado ocorreu durante o login: ${error}`)
                }
            })
    }

    const fetchApi = async (endpoint, bodyParams = {}, method = "GET") => {
        if (user) {
            if (method === "GET") {
                const response = await axios.get(`${BASE_URL}/${endpoint}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                    params: { ...bodyParams }
                })
                return response;
            }

            if (method === "POST") {

                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                }

                const response = await axios.post(`${BASE_URL}/${endpoint}`, bodyParams, config)
                return response;
            }
        }

        if (!user) {
            throw new Error('A user must be logged to call this action.');
        }
    }

    const closeWelcomeMessage = async () => {
        await fetchApi('user/hideMessage', { user: user }, "POST")
        setUser({ ...user, welcome_message: false })
    }

    const logout = async () => {
        setUser(null);
        localStorage.clear();
        window.location = "/"
    }

    const cleanError = () => {
        setError(null)
    }

    useEffect(() => {
        const cookieLogin = () => {
            try {
                const cookieUser = localStorage.getItem('@momentum:user');
                setUser(JSON.parse(cookieUser))
            } catch (err) {
                console.log('Cookie Login: ', err)
            }
        }
        cookieLogin();
    }, [])

    useEffect(() => {
        const isAuthenticated = () => {
            if (user) {

                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                }

                //check if user has a valid token
                axios.post(`${BASE_URL}/user/isAuthenticated`, { user: user }, config)
                    .then(() => console.log('User is logged.'))
                    .catch(err => {

                        if (err && err.response && (err.response.status === 403)) {
                            console.log('User is not authenticated.')
                            logout()
                        }

                        //get a new valid token
                        axios.post(`${BASE_URL}/user/refreshToken`, { user: user }, config)
                            .then(res => {
                                console.log(res.data)
                                setUser({ ...user, token: res.data.token, refreshToken: res.data.refreshToken })
                            })
                            .catch(err => {
                                console.log('Error when refreshing token')
                                console.log(err)
                                setUser(null);
                                localStorage.clear();
                            })
                    })
            }
        }

        const remindUser = () => {
            if (user) {
                try {
                    localStorage.setItem('@momentum:user', JSON.stringify(user));
                } catch (err) {
                    console.log(err)
                }
            }
        }
        remindUser();
        isAuthenticated();
    }, [user])


    const requestNewPassword = async (email) => {
        const res = await axios.post(`${BASE_URL}/user/requestNewPassword`, { email: email, env: process.env.REACT_APP_ENV })
        return res;
    }

    const resetPassword = async (params) => {
        const res = await axios.post(`${BASE_URL}/user/resetPassword`, {
            token: params.token,
            email: params.email,
            newPassword: params.newPassword
        })
        return res;
    }

    return (
        <SessionContext.Provider
            value={{
                user,
                error,
                closeWelcomeMessage,
                cleanError,
                register,
                registerWithCloseFriends,
                registerAndSubscribe,
                login,
                logout,
                fetchApi,
                requestNewPassword,
                resetPassword
            }}>
            {children}
        </SessionContext.Provider>
    );
}

const useSession = () => {
    const context = useContext(SessionContext);

    if (!context) {
        throw new Error('useSession must be used within an AuthProvider.');
    }

    return context;
}

export { SessionProvider, useSession };