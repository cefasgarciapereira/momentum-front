import { makeStyles } from '@material-ui/core';

export const useSignUpStyles = makeStyles((theme) => ({

}));

export const useOptionForm = makeStyles((theme) => ({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        gap: '1rem',

        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
        }
    },
    card: {
        width: '80%',
        padding: '1rem',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        height: 100,
        transition: 'background-color .4s',

        "&:hover": {
            backgroundColor: '#030303',
            color: 'white',
            cursor: 'pointer'
        },

        [theme.breakpoints.up('md')]: {
            width: '40%',
        }
    }
}))