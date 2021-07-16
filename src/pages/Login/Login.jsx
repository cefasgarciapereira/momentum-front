import { useState, useEffect } from 'react';
import {
    CircularProgress,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    makeStyles,
    Container,
    FormHelperText
} from '@material-ui/core';

import { Logo, Copyright } from 'components';
import { useSession } from 'contexts/session';
import { useHistory } from 'react-router-dom';


export default function SignIn() {
    const classes = useStyles();
    const { login, error, user } = useSession();
    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => user && history.push('/home'), [user, history])

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        await login(values)
        setLoading(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Logo style={{ width: '50%' }} />
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value={values.email}
                                onChange={handleChange}
                                label="E-mail"
                                variant="outlined"
                                name="email"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value={values.password}
                                onChange={handleChange}
                                label="Senha"
                                variant="outlined"
                                type="password"
                                name="password"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormHelperText error>{error}</FormHelperText>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                label="Entrar"
                                variant="contained"
                                color="primary"
                                loading='true'
                                type="submit"
                                endIcon={loading && <CircularProgress color="white" size={24} />}
                                onClick={handleSubmit}
                            >
                                Entrar
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                href="/home"
                                fullWidth
                                style={{
                                    margin: '.5rem 0 2rem 0'
                                }}
                            >
                                Voltar
                            </Button>
                        </Grid>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/esqueci-minha-senha" variant="body2">
                                    Esqueceu sua senha?
                                </Link>
                            </Grid>

                            <Grid item>
                                <Link href="/cadastrar" variant="body2">
                                    Não possui uma conta? Cadastre-se
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
                <Grid container justify="center" align="center" fullWidth>
                    <Grid item>
                        <FormHelperText>Fale conosco: contato@easyquant.com.br</FormHelperText>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

const initialState = {
    email: '',
    password: '',
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
