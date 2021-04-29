import { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    CircularProgress,
    FormHelperText
} from '@material-ui/core';
import { useSession } from 'contexts/session';
import { useHistory } from 'react-router-dom';

const initialState = {
    name: '',
    email: '',
    instagram_at: '',
    password: '',
    password_confirmation: '',
}

export default function SignUpForm(props) {
    const { navigateTo } = props;
    const { register, error, user, cleanError } = useSession();
    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => user && history.push('/home'), [user, history])

    const handleNavigation = () => {
        cleanError()
        navigateTo('login')
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleInstagramAt = (e) => {
        if (e.target.value && e.target.value[0] !== '@') {
            setValues({ ...values, instagram_at: `@${e.target.value}` })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await register(values)
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit}style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem 0', overflow: 'auto' }}>
            <TextField
                fullWidth
                value={values.name}
                onChange={handleChange('name')}
                label="Nome Completo"
                variant="outlined"
                required
            />

            <TextField
                fullWidth
                value={values.email}
                onChange={handleChange('email')}
                label="E-mail"
                variant="outlined"
                required
            />

            <TextField
                fullWidth
                value={values.instagram_at}
                onChange={handleChange('instagram_at')}
                onBlur={handleInstagramAt}
                label="@instagram"
                variant="outlined"
                required
            />

            <TextField
                fullWidth
                value={values.password}
                onChange={handleChange('password')}
                label="Senha"
                variant="outlined"
                type="password"
                required
            />

            <TextField
                fullWidth
                value={values.password_confirmation}
                onChange={handleChange('password_confirmation')}
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
                endIcon={loading && <CircularProgress color="white" size={24} />}
                onClick={handleSubmit}
                type="submit"
            >
                Cadastrar
            </Button>

            <Button
                fullWidth
                label="Entrar"
                variant="outlined"
                color="primary"
                onClick={handleNavigation}
            >
                Cancelar
            </Button>
            <FormHelperText error>{error}</FormHelperText>
        </form>
    )
}