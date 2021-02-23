import { useState, useContext, useEffect } from 'react';
import { 
    TextField, 
    Box,
    Button,
    CircularProgress,
    FormHelperText
} from '@material-ui/core';
import SessionContext from 'contexts/session';
import { useHistory } from 'react-router-dom';

const initialState = {
    email: '',
    password: '',
}

export default function LoginForm(){
    const { login, error, user } = useContext(SessionContext);
    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => user && history.push('/home'), [user, history])

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async () =>{
        setLoading(true);
        await login(values)
        setLoading(false);
    }

    return(
        <Box width={'100%'} style={{display: 'flex', flexDirection: 'column', gap: '1rem', margin: '2rem 0'}}>
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
            loading={true}
            endIcon={loading && <CircularProgress color="white" size={24} />}
            onClick={handleSubmit}
            >
                Entrar
            </Button>
            
            <FormHelperText error>{error}</FormHelperText>

            <Button
            fullWidth
            label="Entrar"
            variant="outlined"
            color="primary"
            >
                Cadastrar
            </Button>
        </Box>

    )
}