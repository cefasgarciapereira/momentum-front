import React, { useState, useEffect } from 'react';
import {
    Box,
    Fab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    LinearProgress
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import FilterDialog from './FilterDialog';
import { useSession } from 'contexts/session';
import { useSnackbar } from 'notistack';
import { capitalize } from 'utils/helper';
import { useMomenutumStyles } from './styles';

export default function MomentumTable() {
    const classes = useMomenutumStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { fetchApi } = useSession();
    const [data, setData] = useState();
    const [filter, setFilter] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchApi('strategy')
            .then(response => {
                setData(response.data.strategies[0])
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
    }, [fetchApi])

    const filterTable = (query) => {
        setLoading(true);
        fetchApi('strategy/search', query)
            .then(response => {
                console.log(response.data.strategy)
                if(!response.data.strategy){
                    enqueueSnackbar('Essa estratégia não foi encontrada 😔', {variant: "info"})
                }else{
                    setData(response.data.strategy)
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
        setFilter(false)
    }

    return (
        <Box>
            {
                data &&
                <Box fullWidth display="flex" alignItems="center" style={{ gap: '1rem' }}>
                    <h2>{capitalize(data.type)}</h2>
                    <h2>{data.universe}</h2>
                    <h2>{data.date}</h2>
                </Box>
            }
            <TableContainer className={classes.container} component={Paper}>
                <Table stickyHeader aria-label="sticky table" className={classes.root}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ação</TableCell>
                            <TableCell align="left">Sinal</TableCell>
                            <TableCell align="left">Risco Budget</TableCell>
                            <TableCell align="left">Risco Parity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.response.map((row) => (
                            <TableRow key={row.signal}>
                                <TableCell component="th" scope="row">
                                    {row.stock}
                                </TableCell>
                                <TableCell align="left">{parseFloat(row.signal).toFixed(2)}</TableCell>
                                <TableCell align="left">{parseFloat(row.risk_budgeting).toFixed(2)}</TableCell>
                                <TableCell align="left">{parseFloat(row.risk_parity).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {loading && <LinearProgress />}
            </TableContainer>
            <Fab
                onClick={() => setFilter(true)}
                color="primary"
                size="small"
                aria-label="add"
                style={{ float: 'right', margin: '1rem 0' }}>
                <FilterListIcon />
            </Fab>
            <FilterDialog
                visible={filter}
                handleClose={() => setFilter(false)}
                handleSubmit={filterTable}
            />
        </Box>
    );
}