import { useState, useEffect } from 'react'
import { Paper, Typography } from '@material-ui/core'
import { Line } from '@reactchartjs/react-chart.js'
import { useStrategy } from 'contexts/strategy';
import { useDeviceDetect } from 'utils/hooks';

export default function MultiAxisLine() {
  const { backtest, loading } = useStrategy();
  const { isMobile } = useDeviceDetect();
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null)

  useEffect(() => {
    let newData = {
      labels: [],
      datasets: [
        {
          label: 'Equally Weighted',
          data: [],
          fill: false,
          backgroundColor: 'rgb(200, 0, 0)',
          borderColor: 'rgba(200, 0, 0, 0.2)',
        },
        {
          label: 'IBOV',
          data: [],
          fill: false,
          backgroundColor: 'rgb(0, 200, 0)',
          borderColor: 'rgba(0, 200, 0, 0.2)',
        },
        {
          label: 'Risk Parity',
          data: [],
          fill: false,
          backgroundColor: 'rgb(0, 0, 200)',
          borderColor: 'rgba(0, 0, 200, 0.2)',
        },
      ],
    }

    let yAxis = {}

    if (backtest) {
      let min = backtest.ind[0].equally_weighted
      let max = backtest.ind[0].equally_weighted

      backtest.ind.forEach((i) => {
        if (i.equally_weighted < min) {
          min = i.equally_weighted
        }

        if (i.ibov < min) {
          min = i.ibov
        }

        if (i.risk_parity < min) {
          min = i.risk_parity
        }

        if (i.equally_weighted > max) {
          max = i.equally_weighted
        }

        if (i.ibov > max) {
          max = i.ibov
        }

        if (i.risk_parity > max) {
          max = i.risk_parity
        }

        newData.labels.push(`${i.Date.split('-')[0]}/${i.Date.split('-')[1]}`)
        newData.datasets[0].data.push(i.equally_weighted)
        newData.datasets[1].data.push(i.ibov)
        newData.datasets[2].data.push(i.risk_parity)
      })
      
      yAxis = {
        min: Math.trunc(min) - 1,
        max: Math.trunc(max) + 1,
      }
    }

    setOptions({
      scales: {
        yAxes: [
          {
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
            min: yAxis.min,
            max: yAxis.max
          },
          {
            type: 'linear',
            display: false,
            position: 'right',
            id: 'y-axis-2',
            min: yAxis.min,
            max: yAxis.max
          },
          {
            type: 'linear',
            display: false,
            position: 'left',
            id: 'y-axis-3',
            min: yAxis.min,
            max: yAxis.max
          },
        ],
      },
    })
    setData(newData)
  }, [backtest])


  if (loading || !data) return (
    <Paper style={{ width: '100%', padding: 10 }} height={isMobile ? 300 : 800} >
      <Typography variant="h4">Gerando gráfico...</Typography>
    </Paper>

  )

  return (
    <Paper style={{ width: '100%', padding: 10 }} height={isMobile ? 300 : 800}>
      <Typography variant="h4">Backtest</Typography>
      <Line data={data} options={options} height={isMobile ? 200 : 100} />
    </Paper>
  )

}