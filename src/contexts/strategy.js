import {
    createContext,
    useState,
    useEffect,
    useContext
} from 'react';
import { useSession } from 'contexts/session';
import { useApi } from 'utils/hooks';
import { useSnackbar } from 'notistack';

const StrategyContext = createContext();

const initialFilter = {
    type: "momentum",
    universe: 'IBRA',
    look_back: 6,
    port_size: 10
}

const StrategyProvider = ({ children }) => {
    const { user } = useSession();
    const { api } = useApi();
    const { enqueueSnackbar } = useSnackbar();
    const [momentum, setMomentum] = useState();
    const [filter, setFilter] = useState(initialFilter);
    const [backtest, setBacktest] = useState();
    const [loading, setLoading] = useState(false);

    const filterMomentum = () => {
        setLoading(true);
        api.get('/strategy/search', {
            params: {...filter}
        })
        .then(response => {
            if (!response.data.strategy) {
                enqueueSnackbar('Essa estratégia não foi encontrada 😔', { variant: "info" })
            } else {
                setMomentum(response.data.strategy)
            }
            setLoading(false);
        })
        .catch(err => {
            console.log(err)
            setLoading(false);
        })
    }

    const filterBacktest = () => {
        setLoading(true);
        api.get('/backtest/search', {
            params: {...filter}
        })
        .then(response => {
            if (!response.data.backtest) {
                enqueueSnackbar('Esse backtest não foi encontrada 😔', { variant: "info" })
            } else {
                setBacktest(response.data.backtest)
            }
            setLoading(false);
        })
        .catch(err => {
            console.log(err)
            setLoading(false);
        })
    }

    const applyFilter = () => {
        filterMomentum();
        filterBacktest();
    }

    useEffect(() => {
        applyFilter()
        // eslint-disable-next-line
    }, [user])

    return (
        <StrategyContext.Provider
            value={{
                momentum,
                backtest,
                loading,
                filter,
                setFilter,
                applyFilter
            }}>
            {children}
        </StrategyContext.Provider>
    );
}

const useStrategy = () => {
    const context = useContext(StrategyContext);

    if (!context) {
        throw new Error('useStrategy must be used within an StrategyProvider.');
    }

    return context;
}

export { StrategyProvider, useStrategy };