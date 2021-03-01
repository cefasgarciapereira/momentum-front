import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Dashboard } from 'components';
import { useSession } from 'contexts/session';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const { fetchApi } = useSession();
  const [data, setData] = useState();

  useEffect(() => {
    fetchApi('strategy')
    .then(response => setData(response.data.strategies[0]))
    .catch(err => console.log(err))
  },[fetchApi])
  console.log(data)
  return (
    <Dashboard>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ação</TableCell>
              <TableCell align="right">Sinal</TableCell>
              <TableCell align="right">Risco Budget</TableCell>
              <TableCell align="right">Risco Parity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.response.map((row) => (
              <TableRow key={row.signal}>
                <TableCell component="th" scope="row">
                  {row.stock}
                </TableCell>
                <TableCell align="right">{row.signal}</TableCell>
                <TableCell align="right">{row.risk_budgeting}</TableCell>
                <TableCell align="right">{row.risk_parity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dashboard>
  );
}