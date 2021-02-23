import { Box, Typography, Paper } from '@material-ui/core';
import LoginForm from './LoginForm';
import { useLoginStyles } from './styles';

export default function Login(){
    const classes = useLoginStyles();

    return (
        <div className={classes.container}>
            <Box className={classes.image}>
            </Box>
            <Paper className={classes.form} elevation={3}>
                <Box style={{width: '100%'}}>
                    <Typography variant="h2">Momentum</Typography>
                    <Typography>Investir ficou mais fácil.</Typography>
                </Box>
                <LoginForm/>
                <Typography variant="caption">Copyright © Momentum 2021.</Typography>
            </Paper>
        </div>
    )
}