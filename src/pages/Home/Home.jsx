import { useState } from 'react';
import {
  MomentumTable,
  BacktestChart,
  FilterDialog,
  LoadingScreen
} from 'components';
import { Box, Fab } from '@material-ui/core';
import { useStrategy } from 'contexts/strategy';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useHomeStyles } from './styles';


export default function Home() {
  const { loading } = useStrategy();
  const [filter, setFilter] = useState(false);
  const classes = useHomeStyles();

  if (loading) return <LoadingScreen />

  return (
    <Box className={classes.container}>
      <Fab
        onClick={() => setFilter(true)}
        color="primary"
        size="large"
        aria-label="add"
        className={classes.fab}
      >
        <FilterListIcon />
      </Fab>
      <MomentumTable />
      <BacktestChart />
      <FilterDialog
        visible={filter}
        handleClose={() => setFilter(false)}
      />
    </Box>
  )
}