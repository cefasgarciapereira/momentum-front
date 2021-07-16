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
    Divider,
    FormControl,
    InputLabel,
    Select,
    FormHelperText
} from '@material-ui/core';
import Cards from 'react-credit-cards';
import { useSnackbar } from 'notistack';

import { useSession } from 'contexts/session';
import { Copyright, MaskedInput, Logo } from 'components';
import plans from 'utils/plans';

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
    const { registerAndSubscribe } = useSession();
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

    const handleInputFocus = (e) => {
        setValues({ ...values, focus: e.target.name });
    }

    const clearInputFocus = () => {
        setValues({ ...values, focus: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validated()) {
            let params = values;
            params.card_exp_month = values.card_expiry.split('/')[0]
            params.card_exp_year = values.card_expiry.split('/')[1]
            params.plan_id = plans[values.plan]
            setLoading(true);
            registerAndSubscribe(params)
                .then(res => {
                    console.log(res)
                    setLoading(false)
                })
                .catch(err => {
                    setError(err.message)
                    setLoading(false)
                })
        }
    }

    function validated() {
        let res = true

        if (!accepted) {
            enqueueSnackbar('Você deve concordar com os termos de uso.', { variant: "error" })
            res = false
        }

        if (values.email !== values.emailConfirmation) {
            enqueueSnackbar('Os emails não coincidem.', { variant: "error" })
            res = false
        }

        if (values.password !== values.password_confirmation) {
            enqueueSnackbar('As senhas não coincidem.', { variant: "error" })
            res = false
        }

        return res
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Logo style={{ width: '50%' }} />
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Informações pessoais
                            </Typography>
                            <Typography>
                                Informe suas credenciais abaixo para realizar o acesso na plataforma após o cadastro.
                            </Typography>
                        </Grid>
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
                            <MaskedInput
                                fullWidth
                                value={values.phone}
                                onChange={handleChange}
                                label="Telefone/Celular"
                                name="phone"
                                variant="outlined"
                                type="tel"
                                required
                                mask="(99) 9999-9999"
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
                                value={values.emailConfirmation}
                                onChange={handleChange}
                                label="Confirme seu e-mail"
                                name="emailConfirmation"
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
                    </Grid>

                    <Divider className={classes.divider} />

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Endereço
                            </Typography>
                            <Typography>
                                Informe o seu endereço de cobrança.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <MaskedInput
                                fullWidth
                                value={values.postal_code}
                                onChange={handleChange}
                                name="postal_code"
                                label="CEP"
                                variant="outlined"
                                mask="99999-999"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value={values.state}
                                onChange={handleChange}
                                name="state"
                                label="Estado"
                                variant="outlined"
                                type="text"
                                inputProps={{ maxLength: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value="BR"
                                name="country"
                                label="País"
                                variant="outlined"
                                type="text"
                                inputProps={{ maxLength: 2 }}
                            />
                        </Grid>
                    </Grid>

                    <Divider className={classes.divider} />

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Pagamento
                            </Typography>
                            <Typography>
                                Informe o plano desejado e seus dados de pagamento.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-age-native-simple">Plano</InputLabel>
                                <Select
                                    native
                                    value={values.plan}
                                    onChange={handleChange}
                                    label="Plano"
                                    inputProps={{
                                        name: 'plan',
                                        id: 'outlined-age-native-simple',
                                    }}
                                >
                                    <option value="monthly">Mensal - R$19,90 / mês</option>
                                    <option value="semiannually">Semestral - R$109,90 / semestre</option>
                                    <option value="annual">Anual - R$ 189,90 / ano</option>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <MaskedInput
                                fullWidth
                                value={values.card_number}
                                onChange={handleChange}
                                name="card_number"
                                label="Número"
                                variant="outlined"
                                type="text"
                                pattern="[0-9]*"
                                onFocus={handleInputFocus}
                                mask="9999 9999 9999 9999"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                value={values.card_name}
                                onChange={handleChange}
                                name="card_name"
                                label="Nome no cartão"
                                variant="outlined"
                                type="text"
                                onFocus={handleInputFocus}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <MaskedInput
                                fullWidth
                                value={values.card_expiry}
                                onChange={handleChange}
                                name="card_expiry"
                                label="Vencimento"
                                variant="outlined"
                                type="text"
                                onFocus={handleInputFocus}
                                mask="99/9999"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                value={values.cvc}
                                onChange={handleChange}
                                name="cvc"
                                label="CVC"
                                variant="outlined"
                                type="numeric"
                                onFocus={handleInputFocus}
                                onBlur={clearInputFocus}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Cards
                                number={values.card_number}
                                name={values.card_name}
                                expiry={values.card_expiry}
                                cvc={values.cvc}
                                focused={values.focus}
                                locale={{
                                    valid: 'vencimento',
                                }}
                                placeholders={{
                                    name: 'seu nome aqui',
                                }}
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
                <Grid container justify="center" align="center" fullWidth>
                    <Grid item>
                        <FormHelperText>Fale conosco: contato@easyquant.com.br</FormHelperText>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

const initialValues = {
    name: '',
    email: '',
    emailConfirmation: '',
    phone: '',
    instagram_at: '',
    password: '',
    password_confirmation: '',
    plan: 'monthly',
    focus: '',
    card_cvc: '',
    card_expiry: '',
    card_name: '',
    card_number: '',
    city: '',
    line: '',
    postal_code: '',
    country: 'BR',
    state: ''
}