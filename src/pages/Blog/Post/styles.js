import { makeStyles } from '@material-ui/core/styles';

export const usePostStyles = makeStyles((theme) => ({
    container:{
        display: 'flex', 
        justifyContent: 'center', 
        width: '100%'
    },
    inner:{
        width: '100%', 
        maxWidth: '960px', 
        padding: '1rem'
    },
    title:{
        marginBottom: '4rem'
    },
    authorBox:{
        display: "flex", 
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem'
    },
    name:{
        fontWeight: 'bold',
        margin: 0,
        
        '&:hover':{
            cursor: 'pointer'
        }
    }
}))