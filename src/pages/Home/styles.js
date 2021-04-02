import { makeStyles } from '@material-ui/core/styles';

export const useHomeStyles = makeStyles((theme) => ({
    container: {
        width: '100%',

        "@media (min-width: 600px)": {
            width: '90%',
        }
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    }
}));