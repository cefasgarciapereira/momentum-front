import { useState } from 'react';
import {
  MomentumTable,
  BacktestChart,
  FilterDialog,
  LoadingScreen,
  Stats,
  Page
} from 'components';
import { Box, Button } from '@material-ui/core';
import { useStrategy } from 'contexts/strategy';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useMomentumStyles } from './styles';

export default function Momentum() {
  const { loading } = useStrategy();
  const [filter, setFilter] = useState(false);
  const classes = useMomentumStyles();

  if (loading) return <LoadingScreen />

  return (
    <Page title="Estratégias">
      <Box className={classes.container}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FilterListIcon />}
          onClick={() => setFilter(true)}>
          Filtrar
        </Button>
        <MomentumTable />
        <BacktestChart />
        <FilterDialog
          visible={filter}
          handleClose={() => setFilter(false)}
        />
        <Stats />
      </Box>
    </Page>
  )
}