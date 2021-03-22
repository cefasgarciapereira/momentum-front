import { Box, Typography, Paper } from '@material-ui/core';
import LoginForm from './LoginForm';
import { useLoginStyles } from './styles';

export default function Login() {
    const classes = useLoginStyles();

    return (
        <div className={classes.container}>
            <Box className={classes.image}>
            </Box>
            <Paper className={classes.form} elevation={3}>
                <Box style={{ width: '100%' }}>
                    <Typography variant="h2">Easy Quant</Typography>
                </Box>
                <LoginForm />
                <Box style={{ width: '100%' }} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="caption">Copyright © Momentum 2021.</Typography>
                    {/* <Typography variant="caption">Problemas com seu login?</Typography> */}
                </Box>
            </Paper>
        </div>
    )
}