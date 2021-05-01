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
import { useQuery } from 'utils/hooks';

export default function ForgotPassword() {
    const query = useQuery();
    const { resetPassword } = useSession()
    const [values, setValues] = useState({})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (values.password !== values.passwordConfirmation) {
            setError('As senhas não coincidem.')
        } else {
            setLoading(true);
            resetPassword({
                email: query.get("email"),
                token: query.get("token"),
                newPassword: values.password
            })
                .then(() => {
                    setSuccess(true);
                    setLoading(false);
                    setError(false);
                }).catch(err => {
                    console.log(err.response.data.error)
                    if (err.response.data.error) {
                        setError(err.response.data.error)
                    } else {
                        setError('Um erro inesperado ocorreu')
                    }
                    setLoading(false);
                })
        }
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
                        <Typography variant="h5">Resetar senha</Typography>
                        {
                            success ?
                                <Box>
                                    <Typography variant="body1">
                                        Tudo certo! Sua senha foi alterada.
                                    </Typography>
                                    <Button component={RouterLink} to="/login">Voltar</Button>
                                </Box> :
                                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0', overflow: 'auto' }}>
                                    <Typography variant="body1">Insira e confirme sua nova senha abaixo.</Typography>
                                    <TextField
                                        fullWidth
                                        value={query.get("email")}
                                        name="email"
                                        disabled
                                        label="E-mail"
                                        variant="outlined"
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        value={values.password}
                                        onChange={handleChange}
                                        name="password"
                                        label="Senha"
                                        variant="outlined"
                                        type="password"
                                        required
                                    />

                                    <TextField
                                        fullWidth
                                        value={values.passwordConfirmation}
                                        onChange={handleChange}
                                        name="passwordConfirmation"
                                        label="Confirme sua senha"
                                        variant="outlined"
                                        type="password"
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