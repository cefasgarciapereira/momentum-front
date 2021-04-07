import { makeStyles } from '@material-ui/core/styles';

export const useStatsStyles = makeStyles({
    root: {
      width: '88vw',
      margin: '20px 0',
      
      "@media (min-width: 600px)":{
        width: '100%',
      }
    },
    container: {
      
      "@media (min-width: 600px)":{
        width: '100%',
      }
    },
  });