import { useState } from 'react';
import {
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    makeStyles,
    Container,
    Typography,
    CircularProgress,
    FormHelperText
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { useSession } from 'contexts/session';
import { Copyright, Logo } from 'components';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    divider: {
        margin: theme.spacing(5, 0),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const { registerWithCloseFriends } = useSession();
    const [values, setValues] = useState(initialValues)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [accepted, setAccepted] = useState(false)
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleInstagramAt = (e) => {
        if (e.target.value && e.target.value[0] !== '@') {
            setValues({ ...values, instagram_at: `@${e.target.value}` })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (accepted) {
            setLoading(true);
            registerWithCloseFriends(values)
                .then(res => {
                    console.log(res)
                    setLoading(false)
                })
                .catch(err => {
                    setError(err.message)
                    setLoading(false)
                })
        } else {
            enqueueSnackbar('Você deve concordar com os termos de uso.', { variant: "error" })
        }
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
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                label="Nome Completo"
                                variant="outlined"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value={values.email}
                                onChange={handleChange}
                                label="E-mail"
                                name="email"
                                variant="outlined"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value={values.phone}
                                onChange={handleChange}
                                label="Telefone/Celular"
                                name="phone"
                                variant="outlined"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value={values.instagram_at}
                                onChange={handleChange}
                                onBlur={handleInstagramAt}
                                name="instagram_at"
                                label="@instagram"
                                variant="outlined"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
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
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value={values.password_confirmation}
                                onChange={handleChange}
                                name="password_confirmation"
                                label="Confirme sua senha"
                                variant="outlined"
                                type="password"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value={accepted} color="primary" onChange={() => setAccepted(!accepted)} />}
                                label={<Typography>Afirmo que estou de acordo com os <Link href="/termos-de-uso"><b>Termos de Uso</b></Link>.</Typography>}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        label="Entrar"
                        loading='true'
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        endIcon={loading && <CircularProgress color="white" size={24} />}
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            margin: '2rem 0 .5rem 0'
                        }}
                    >
                        Enviar
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
                    <FormHelperText error>{error}</FormHelperText>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="login" variant="body2">
                                Já possui uma conta? Entrar
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

const initialValues = {

}