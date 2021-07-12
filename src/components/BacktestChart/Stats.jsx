import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    LinearProgress,
} from '@material-ui/core';
import { useStrategy } from 'contexts/strategy';
import { useStatsStyles } from './styles';

export default function Stats() {
    const { backtest, loading } = useStrategy();
    const classes = useStatsStyles();

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Índice</TableCell>
                            <TableCell align="left">Mínimo</TableCell>
                            <TableCell align="left">Máximo</TableCell>
                            <TableCell align="left">Média</TableCell>
                            <TableCell align="left">Mediana</TableCell>
                            <TableCell align="left">Desvio Padrão</TableCell>
                            <TableCell align="left">Retorno por unidade de risco</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {backtest && backtest.stats.map((row) => (
                            <TableRow key={row.Max}>
                                <TableCell component="th" scope="row">
                                    {row.index}
                                </TableCell>
                                <TableCell align="left">{parseFloat(row.Min).toFixed(2)}</TableCell>
                                <TableCell align="left">{parseFloat(row.Max).toFixed(2)}</TableCell>
                                <TableCell align="left">{parseFloat(row.Média).toFixed(2)}</TableCell>
                                <TableCell align="left">{parseFloat(row.Mediana).toFixed(2)}</TableCell>
                                <TableCell align="left">{parseFloat(row['Desvio Padrão']).toFixed(2)}</TableCell>
                                <TableCell align="left">{parseFloat(row.Sharpe).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {loading && <LinearProgress />}
            </TableContainer>
        </Paper>

    );
}