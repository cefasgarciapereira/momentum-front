import React, { useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    LinearProgress,
    Typography,
    Button
} from '@material-ui/core';
import { useStrategy } from 'contexts/strategy';
import { capitalize } from 'utils/helper';
import { useMomenutumStyles } from './styles';
import PriceChart from './PriceChart';

export default function MomentumTable() {
    const classes = useMomenutumStyles();
    const { momentum, loading } = useStrategy();
    const [priceChart, setPriceChart] = useState(null)

    const closePriceChart = () => {
        setPriceChart(null)
    }

    return (
        <Box>
            {
                momentum &&
                <Box fullWidth display="flex" flexDirection={{ xs: 'column', lg: 'row' }} alignItems={{ xs: 'flex-start', lg: "center" }} style={{ gap: '1rem' }}>
                    <Typography variant="h4">{capitalize(momentum.type)}</Typography>
                    <Typography variant="h4">{momentum.universe}</Typography>
                    <Typography variant="h4">{momentum.date}</Typography>
                </Box>
            }
            <TableContainer className={classes.container} component={Paper}>
                <Table stickyHeader aria-label="sticky table" className={classes.root}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ação</TableCell>
                            <TableCell align="left">Sinal</TableCell>
                            <TableCell align="left">Peso por Risk Parity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {momentum && momentum.response.map((row) => (
                            <TableRow key={row.signal}>
                                <TableCell component="th" scope="row">
                                    <Button 
                                    onClick={() => setPriceChart(row.stock)}
                                    variant="outlined" 
                                    color="primary" 
                                    style={{ width: 100 }}>
                                        {row.stock}
                                    </Button>
                                </TableCell>
                                <TableCell align="left">{parseFloat(row.signal).toFixed(2)}</TableCell>
                                <TableCell align="left">{parseFloat(row.risk_parity * 100).toFixed(2)}%</TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
                {loading && <LinearProgress />}
                <PriceChart 
                price={priceChart}
                visible={priceChart} 
                handleClose={closePriceChart} />
            </TableContainer>
        </Box>
    );
}