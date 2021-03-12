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
import { parseDate, capitalize } from 'utils/helper';
import { useMomenutumStyles } from './styles';

export default function MomentumTable() {
    const classes = useMomenutumStyles();
    const { fetchApi } = useSession();
    const [data, setData] = useState();
    const [filter, setFilter] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchApi('strategy')
            .then(response => {
                console.log('USE EFFECT: ', response.data.strategies[0])
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
                console.log('FILTER: ', response.data.strategy)
                setData(response.data.strategy)
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
                <Box fullWidth display="flex" alignItems="center"style={{gap: '1rem'}}>
                <h2>{capitalize(data.type)}</h2>
                <h2>{data.universe}</h2>
                <h2>{parseDate(data.date)}</h2>
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
                                <TableCell align="left">{row.signal}</TableCell>
                                <TableCell align="left">{row.risk_budgeting}</TableCell>
                                <TableCell align="left">{row.risk_parity}</TableCell>
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