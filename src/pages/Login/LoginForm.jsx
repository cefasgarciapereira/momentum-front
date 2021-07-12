import { useState, useEffect } from 'react';
import {
    TextField,
    Box,
    Button,
    CircularProgress,
    FormHelperText
} from '@material-ui/core';
import { useSession } from 'contexts/session';
import { useHistory } from 'react-router-dom';

const initialState = {
    email: '',
    password: '',
}

export default function LoginForm(props) {
    const { navigateTo } = props;
    const { login, error, user, cleanError } = useSession();
    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => user && history.push('/home'), [user, history])

    const handleNavigation = () => {
        cleanError()
        navigateTo('signup')
    }

    const handleChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: event.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        await login(values)
        setLoading(false);
    }

    return (
        <Box>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem 0'}}>
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
                    value={values.password}
                    onChange={handleChange('password')}
                    label="Senha"
                    variant="outlined"
                    type="password"
                    required
                />
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
                    fullWidth
                    label="Entrar"
                    variant="outlined"
                    color="primary"
                    onClick={handleNavigation}
                >
                    Cadastrar
                </Button>
                <FormHelperText error>{error}</FormHelperText>
            </form>
        </Box>

    )
}