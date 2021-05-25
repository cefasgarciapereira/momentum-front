import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    FormHelperText,
    Grid,
    Paper
} from '@material-ui/core';
import axios from 'axios'

const initialValues = {
    instagram_at: '',
    pass: ''
}

export default function AddCloseFriends() {
    const [values, setValues] = useState(initialValues);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleInstagramAt = (e) => {
        if (e.target.value && e.target.value[0] !== '@') {
            setValues({ ...values, instagram_at: `@${e.target.value}` })
        }
    }

    const handleSubmit = () => {
        const BASE_URL = process.env.REACT_APP_ENV === 'prod' ? "https://easyquant-api.herokuapp.com" :
            process.env.REACT_APP_ENV === 'homolog' ? "https://homolog-momentum-api.herokuapp.com" : 'http://localhost:9000'

        setLoading(true)
        setError(null)
        axios.post(`${BASE_URL}/close-friends/add`, { 
            instagram_at: values.instagram_at,
            pass: values.pass
         })
            .then(res => {
                alert(`${values.instagram_at} adicionado!`)
                setLoading(false)
            })
            .catch(err => {
                try{
                    setError(err.response.data.error)

                }catch(e){
                    setError(`${err.message}`)
                }
                setLoading(false)
            })
    }

    return (
        <Grid
            wrap
            fullWidth
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ padding: '2rem' }}
        >
            <Paper style={{ padding: '2rem' }} elevation={4}>
                <Typography variant="h4">Adicionar Close Friends</Typography>

                <Box width={'100%'} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '2rem 0', marginTop: '25%' }}>

                    <TextField
                        fullWidth
                        name="instagram_at"
                        value={values.instagram_at}
                        onChange={handleChange}
                        onBlur={handleInstagramAt}
                        label="@instagram"
                        variant="outlined"
                        required
                    />

                    <TextField
                        fullWidth
                        name="pass"
                        value={values.pass}
                        onChange={handleChange}
                        label="Código"
                        variant="outlined"
                        required
                    />

                    <Button
                        fullWidth
                        label="Entrar"
                        variant="contained"
                        color="primary"
                        loading='true'
                        endIcon={loading && <CircularProgress color="white" size={24} />}
                        onClick={handleSubmit}
                    >
                        Entrar
                    </Button>
                    <FormHelperText error>{error}</FormHelperText>
                </Box>
            </Paper>
        </Grid>
    )
}
