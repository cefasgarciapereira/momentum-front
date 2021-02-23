import { makeStyles } from '@material-ui/core';
import bg from 'assets/bg1.jpeg'

export const useLoginStyles = makeStyles((theme) => ({
    container:{
        "@media (min-width: 600px)":
        {
            display: 'flex',
            margin: 0,
            padding: 0,
        }
    },
    image:{
        background: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100vh',
        margin: 0,
        
        "@media (min-width: 600px)":
        {
            width: '80%',
        }
    },
    form:{
        backgroundColor: 'rgba(255,255,255)',
        margin: 0,
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        padding: '2rem',
        
        "@media (min-width: 600px)":
        {
            backgroundColor: theme.palette.background.default,
            position: 'relative',
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }
    }
}));