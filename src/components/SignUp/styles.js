import { makeStyles } from '@material-ui/core';

export const useSignUpStyles = makeStyles((theme) => ({
    card: {
        width: '40%',
        padding: '1rem',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        height: 100,
        transition: 'background-color .4s',
        
        "&:hover":{
            backgroundColor: '#030303',
            color: 'white',
            cursor: 'pointer'
        }
    }
}));