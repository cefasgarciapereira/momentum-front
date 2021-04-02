import { useState, useEffect } from 'react'
import { Paper, Typography } from '@material-ui/core'
import { Line } from '@reactchartjs/react-chart.js'
import { useStrategy } from 'contexts/strategy';
import useDeviceDetect from 'utils/useDeviceDetect';

export default function MultiAxisLine() {
  const { backtest, loading } = useStrategy();
  const { isMobile } = useDeviceDetect();
  const [data, setData] = useState(null);

  useEffect(() => {
    let newData = {
      labels: [],
      datasets: [
        {
          label: 'Equally Weighted',
          data: [],
          fill: false,
          backgroundColor: 'rgb(0, 0, 200)',
          borderColor: 'rgba(0, 0, 200, 0.2)',
          yAxisID: 'y-axis-1',
        },
        {
          label: 'IBOV',
          data: [],
          fill: false,
          backgroundColor: 'rgb(0, 200, 0)',
          borderColor: 'rgba(0, 200, 0, 0.2)',
          yAxisID: 'y-axis-2',
        },
        {
          label: 'Risk Parity',
          data: [],
          fill: false,
          backgroundColor: 'rgb(200, 0, 0)',
          borderColor: 'rgba(200, 0, 0, 0.2)',
          yAxisID: 'y-axis-3',
        },
      ],
    }

    if (backtest) {
      backtest.ind.forEach((i) => {
        newData.labels.push(`${i.Date.split('-')[0]}/${i.Date.split('-')[1]}`)
        newData.datasets[0].data.push(i.equally_weighted)
        newData.datasets[1].data.push(i.ibov)
        newData.datasets[2].data.push(i.risk_parity)
      })
    }

    setData(newData)
  }, [backtest])


  if (loading || !data) return (
    <Paper style={{ width: '100%', padding: 10 }} height={isMobile ? 300 : 400} >
      <Typography variant="h4">Gerando gráfico...</Typography>
    </Paper>

  )

  return (
    <Paper style={{ width: '100%', padding: 10 }} height={isMobile ? 300 : 400}>
      <Typography variant="h4">Backtest</Typography>
      <Line data={data} options={options} height={isMobile ? 200 : 50} />
    </Paper>
  )

}

const options = {
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
      },
      {
        type: 'linear',
        display: false,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          drawOnArea: false,
        },
      },
      {
        type: 'linear',
        display: false,
        position: 'left',
        id: 'y-axis-3',
        gridLines: {
          drawOnArea: false,
        },
      },
    ],
  },
}