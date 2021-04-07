import { makeStyles } from '@material-ui/core/styles';

export const useStatsStyles = makeStyles({
    root: {
      width: '88vw',
      margin: '20px 0'
    },
    container: {
      maxHeight: 440,
      
      "@media (min-width: 600px)":{
        width: '100%',
      }
    },
  });