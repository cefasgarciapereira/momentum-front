import { useState } from 'react';
import {
    Typography,
    TextField,
    CircularProgress,
    Button,
    Card,
    CardContent,
    CardActions
} from '@material-ui/core';
import { useSession } from 'contexts/session';
import { Form } from 'components';
import { useApi, useDeviceDetect } from 'utils/hooks';
import { useUserCardStyles } from './styles';

export default function UserCard() {
    const classes = useUserCardStyles();
    const { user, updateUser } = useSession();
    const { isMobile } = useDeviceDetect();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [values, setValues] = useState({
        ...user
    });
    const { api } = useApi()

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        console.log('submit')
        setLoading(true)
        api.post('/user/update', {
            email: user.email,
            user: values
        })
        .then(res => {
            updateUser(res.data.token)
            setLoading(false)
        })
        .catch(err => {
            setError(err)
            setLoading(false)
        })
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Dados Pessoais</Typography>
                <Typography className={classes.title}>Editar dados pessoais</Typography>
                <Form
                    onSubmit={handleSubmit}
                    styles={{ flexDirection: isMobile ? 'column' : 'row' }}
                    error={error}
                >
                    <TextField
                        fullWidth
                        value={values.name}
                        onChange={handleChange}
                        label="Nome"
                        name="name"
                        variant="outlined"
                        required
                    />

                    <TextField
                        fullWidth
                        value={values.email}
                        onChange={handleChange}
                        label="E-mail"
                        name="email"
                        variant="outlined"
                        disabled
                        helperText="O e-mail não pode ser alterado"
                        required
                    />
                </Form>
            </CardContent>
            <CardActions style={{ float: 'right' }}>
                <Button
                    label="Salvar"
                    variant="contained"
                    color="primary"
                    loading='true'
                    type="submit"
                    endIcon={loading && <CircularProgress color="white" size={24} />}
                    onClick={handleSubmit}
                >
                    Salvar
                </Button>
            </CardActions>
        </Card>
    )
}