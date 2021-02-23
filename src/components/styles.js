import { makeStyles } from '@material-ui/core';

export const usePageStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));