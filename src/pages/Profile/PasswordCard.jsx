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
import { useApi } from 'utils/hooks';
import { parseError } from 'utils/helper';

export default function UserCard() {
    const { user, updateUser } = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [values, setValues] = useState({
        email: user.email,
        newPassowrd: '',
        confirmation: ''
    });
    const { api } = useApi()

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        if (
            (values.newPassowrd === values.confirmation) &&
            (values.newPassowrd) &&
            (values.confirmation)
        ) {
            setLoading(true)
            api.post('/user/updatePassword', {
                email: user.email,
                newPassword: values.newPassowrd
            })
                .then(res => {
                    updateUser(res.data.token)
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err.message);
                    setError(parseError(err))
                    setLoading(false)
                })
        } else {
            alert('Verifique os campos de senha!')
        }
    }

    return (
        <Card style={{ margin: '1rem 0' }}>
            <CardContent>
                <Typography variant="h5">Senhas</Typography>
                <Typography style={{ margin: '1rem 0 0 0' }}>Alterar as senhas de acesso</Typography>
                <Form
                    onSubmit={handleSubmit}
                    styles={{ flexDirection: 'row' }}
                    error={error}
                >
                    <TextField
                        fullWidth
                        value={values.newPassowrd}
                        onChange={handleChange}
                        label="Nova Senha"
                        name="newPassowrd"
                        variant="outlined"
                        type="password"
                        required
                    />

                    <TextField
                        fullWidth
                        value={values.confirmation}
                        onChange={handleChange}
                        label="Confirme a senha"
                        name="confirmation"
                        variant="outlined"
                        type="password"
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