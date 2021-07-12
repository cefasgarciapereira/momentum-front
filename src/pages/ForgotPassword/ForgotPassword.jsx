import { useState } from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    CircularProgress,
    FormHelperText,
    Box
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { Page } from 'components';
import { useSession } from 'contexts/session';

const initialState = {
    email: ''
}

export default function ForgotPassword() {
    const { requestNewPassword } = useSession()
    const [values, setValues] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [isEmailSent, setIsEmailSent] = useState(false)
    const [error, setError] = useState(false)

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        requestNewPassword(values.email)
            .then(() => {
                setIsEmailSent(true);
                setLoading(false);
            }).catch(err => {
                if (err.response.data.error) {
                    setError(err.response.data.error)
                } else {
                    setError('Um erro inesperado ocorreu')
                }
                setLoading(false);
            })
    }

    return (
        <Page title="Esqueci Minha Senha" style={{ backgroundColor: '#eee' }}>
            <Container style={{ height: '100vh' }}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{
                        height: '100%'
                    }}
                >
                    <Paper elevation={3} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', overflow: 'auto' }}>
                        <Typography variant="h5">Recuperar senha</Typography>
                        {
                            isEmailSent ?
                                <Box>
                                    <Typography variant="body1">
                                        Tudo certo! Enviamos um e-mail para você configurar uma nova senha.
                                        O código será válido por 15 minutos.
                                </Typography>
                                    <Button component={RouterLink} to="/login">Voltar</Button>
                                </Box> :
                                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0', overflow: 'auto' }}>
                                    <Typography variant="body1">Por favor, informe seu e-mail para solicitar a mudança de senha.</Typography>
                                    <TextField
                                        fullWidth
                                        value={values.email}
                                        onChange={handleChange('email')}
                                        label="E-mail"
                                        variant="outlined"
                                        required
                                    />
                                    <Button
                                        fullWidth
                                        label="Cadastrar"
                                        variant="contained"
                                        color="primary"
                                        loading='true'
                                        disabled={loading}
                                        endIcon={loading && <CircularProgress color="white" size={24} />}
                                        onClick={handleSubmit}
                                        type="submit"
                                    >
                                        Enviar
                                    </Button>
                                    <FormHelperText error>{error}</FormHelperText>
                                </form>
                        }
                    </Paper>
                </Grid>
            </Container>
        </Page>
    )
}