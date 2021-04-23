import { useState } from 'react';
import { Page } from 'components';
import { Box, Typography, Paper } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useLoginStyles } from './styles';

export default function Login() {
    const classes = useLoginStyles();
    const [screen, setScreen] = useState('login')

    return (
        <div className={classes.container}>
            <Box className={classes.image}>
            </Box>
            <Paper className={classes.form} elevation={3} style={{overflow: 'auto'}}>
                <Page title="Entrar" style={{width: '100%'}}>
                    <Box style={{ width: '100%' }}>
                        <Typography variant="h2">Easy Quant</Typography>
                    </Box>
                    {screen === 'login' &&
                        <LoginForm navigateTo={setScreen} />
                    }

                    {screen === 'signup' &&
                        <SignUpForm navigateTo={setScreen} />
                    }
                    <Box style={{ width: '100%' }} display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="caption">Copyright © Momentum 2021.</Typography>
                        {/* <Typography variant="caption">Problemas com seu login?</Typography> */}
                    </Box>
                </Page>
            </Paper>
        </div>
    )
}