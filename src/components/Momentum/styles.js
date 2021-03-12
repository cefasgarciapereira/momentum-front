import { makeStyles } from '@material-ui/core/styles';

export const useMomenutumStyles = makeStyles({
    root: {
    },
    container: {
      width: '86vw',
      maxHeight: '60vh',
      
      "@media (min-width: 600px)":{
        width: '100%',
        maxHeight: '70vh',
      }
    },
  });