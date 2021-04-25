import { makeStyles } from '@material-ui/core/styles';

export const useMomentumStyles = makeStyles((theme) => ({
    container: {
        width: '98%',
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    }
}));