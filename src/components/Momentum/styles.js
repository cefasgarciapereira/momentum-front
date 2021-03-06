import { makeStyles } from '@material-ui/core/styles';

export const useMomenutumStyles = makeStyles({
    root: {
    },
    container: {
      width: '100%',
      margin: '1rem 0',
      
      "@media (min-width: 600px)":{
        width: '100%',
      }
    },
    tableRow:{
      '& :hover':{
        cursor: 'pointer',
        backgroundColor: 'rgba(0,0,0,.1)'
      }
    }
  });