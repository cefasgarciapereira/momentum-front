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
import { useSession } from 'contexts/session';
import useDeviceDetect from 'utils/useDeviceDetect';

export default function PriceChart(props) {
    const { visible, handleClose, price } = props;
    const { fetchApi } = useSession();
    const { isMobile } = useDeviceDetect();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [options, setOptions] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetchApi('price')
            .then(res => {
                const prices = res.data.price[0].prices
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
                    newData.datasets[0].data.push(p[price])
                    newData.labels.push(`${p.Date.split('-')[0]}/${p.Date.split('-')[1]}`)
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
    }, [price, fetchApi])

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