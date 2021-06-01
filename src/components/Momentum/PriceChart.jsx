import { useState, useEffect } from 'react';
import {
    Box,
    DialogTitle,
    Dialog,
    IconButton,
    DialogContent,
    Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Line } from '@reactchartjs/react-chart.js';
import { useDeviceDetect, useApi } from 'utils/hooks';

export default function PriceChart(props) {
    const { visible, handleClose, price } = props;
    const { api } = useApi();
    const { isMobile } = useDeviceDetect();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [options, setOptions] = useState(null)

    useEffect(() => {
        setLoading(true)
        api.post('/ticker/search', { ticker: price })
        .then(res => {
            console.log(res);
            const prices = res.data.prices[0].response
            let newData = {
                labels: [],
                datasets: [
                    {
                        label: 'Price',
                        data: [],
                        fill: false,
                        backgroundColor: 'rgb(200, 0, 0)',
                        borderColor: 'rgba(200, 0, 0, 0.2)',
                    }
                ],
            }

            prices.forEach(p => {
                if (p[price] !== null) {
                    newData.datasets[0].data.push(p[price])
                    newData.labels.push(`${p.index.split('-')[0]}/${p.index.split('-')[1]}`)
                }
            })

            setData(newData)
            setOptions({
                scales: {
                    yAxes: [
                        {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            id: 'y-axis-1',
                        }
                    ],
                },
            })
            setLoading(false)
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
        // eslint-disable-next-line
    }, [price])

    return (
        <Dialog
            fullWidth
            maxWidth="xl"
            open={visible}>
            <DialogTitle>
                <Box style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    Histórico de preços
                    <IconButton
                        onClick={handleClose}
                        aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Typography variant="h4">{price}</Typography>
                {
                    loading ?
                        <Typography variant="h4">Gerando o gráfico</Typography> :
                        <Line data={data} options={options} height={isMobile ? 200 : 100} />
                }
            </DialogContent>
        </Dialog>
    );
}