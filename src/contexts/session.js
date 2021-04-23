import {
    createContext,
    useState,
    useEffect,
    useContext,
} from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
const SessionContext = createContext();

//const BASE_URL = 'https://homolog-momentum-api.herokuapp.com'
const BASE_URL = process.env.REACT_APP_ENV === 'prod' ? "https://easyquant-api.herokuapp.com/" :
    process.env.REACT_APP_ENV === 'homolog' ? "https://homolog-momentum-api.herokuapp.com" : 'http://localhost:9000'

console.log(process.env.REACT_APP_ENV)
console.log(BASE_URL)

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
                    console.log(err);
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

    const login = async (credentials) => {
        await axios.post(`${BASE_URL}/user/login`, { ...credentials })
            .then(response => {
                const decoded = jwt_decode(response.data.token);
                setUser({ ...decoded.user, token: response.data.token, refreshToken: response.data.refreshToken });
                setError(false);
            })
            .catch(err => {
                console.log(err);
                try {
                    setError(err.response.data.error ? err.response.data.error : `${err.name}: ${err.message}`);
                } catch (err) {
                    setError(`${err}`);
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

    return (
        <SessionContext.Provider
            value={{
                user,
                error,
                closeWelcomeMessage,
                cleanError,
                register,
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

    if (!context) {
        throw new Error('useSession must be used within an AuthProvider.');
    }

    return context;
}

export { SessionProvider, useSession };