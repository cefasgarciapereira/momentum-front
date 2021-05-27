import axios from 'axios';
import { useSession } from 'contexts/session';

const BASE_URL = process.env.REACT_APP_ENV === 'prod' ? "https://easyquant-api.herokuapp.com" :
    process.env.REACT_APP_ENV === 'homolog' ? "https://homolog-momentum-api.herokuapp.com" : 'http://localhost:9000'

const useApi = () => {
    const { user } = useSession();

    const api = axios.create({
        baseURL: BASE_URL,
        headers: { Authorization: `Bearer ${user.token}` }
    })

    return { api };
}

export default useApi;