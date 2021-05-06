import React, { useEffect, useState } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormHelperText,
    CircularProgress
} from '@material-ui/core'
import { useSession } from 'contexts/session'
import { useHistory } from 'react-router-dom'

const initialState = {
    email: '',
    password: '',
}

export default function Login() {
    const { user, login, error, cleanError } = useSession();
    const history = useHistory();
    const [values, setValues] = useState(initialState);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => user && history.push('/home'), [user, history])

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        cleanError();
        setOpen(false);
    };

    return (
        <div>
            <c onClick={handleClickOpen}>Entrar</c>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Entrar</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, informe suas credenciais abaixo para realizar o login.
                    </DialogContentText>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem 0' }}>
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
                        <FormHelperText error>{error}</FormHelperText>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        label="Entrar"
                        loading='true'
                        type="submit"
                        endIcon={loading && <CircularProgress color="white" size={24} />}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}