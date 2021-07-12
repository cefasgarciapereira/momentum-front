import { useState, Fragment } from 'react';
import {
    TextField,
    DialogContentText,
    DialogContent,
    FormHelperText,
    CircularProgress,
    DialogActions,
    Button
} from '@material-ui/core';
import { useSession } from 'contexts/session';
import { closefriends as initialValues } from './initialState';

export default function ClosefriendsFrom(props) {
    const { handleClose, setFormStatus } = props;
    const { registerWithCloseFriends } = useSession();
    const [values, setValues] = useState(initialValues);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    const handleInstagramAt = (e) => {
        if (e.target.value && e.target.value[0] !== '@') {
            setValues({ ...values, instagram_at: `@${e.target.value}` })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        /*
        setLoading(true);
        await register(values);
        setLoading(false);*/
    }

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const goBack = () => {
        setFormStatus({
            open: false,
            option: null
        })
    }

    return (
        <Fragment>
            <DialogContent>
                <DialogContentText>
                    Informe suas credenciais abaixo para realizar o acesso na plataforma após o cadastro.
                </DialogContentText>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem 0', overflow: 'auto' }}>
                    <TextField
                        fullWidth
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        label="Nome Completo"
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
                        required
                    />

                    <TextField
                        fullWidth
                        value={values.phone}
                        onChange={handleChange}
                        label="Telefone/Celular"
                        name="phone"
                        variant="outlined"
                        required
                    />

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
                        value={values.password_confirmation}
                        onChange={handleChange}
                        name="password_confirmation"
                        label="Confirme sua senha"
                        variant="outlined"
                        type="password"
                        required
                    />
                    <FormHelperText error>{error}</FormHelperText>
                </form>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>
                    Cancelar
                </Button>

                <Button onClick={goBack}>
                    Voltar
                </Button>

                <Button
                    label="Entrar"
                    loading='true'
                    type="submit"
                    endIcon={loading && <CircularProgress color="inherit" size={24} />}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Enviar
                </Button>
            </DialogActions>
        </Fragment >
    )
}