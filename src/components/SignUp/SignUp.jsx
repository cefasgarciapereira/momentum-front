import React, { useEffect, useState, Fragment } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormHelperText,
    CircularProgress
} from '@material-ui/core';
import PersonalForm from './PersonalForm';
import PaymentForm from './PaymentForm';
import { useSession } from 'contexts/session';
import { useHistory } from 'react-router-dom';

const initialState = {
    name: '',
    email: '',
    instagram_at: '',
    password: '',
    password_confirmation: '',
    plan: 'monthly'
}

export default function SignUp() {
    const { user, register, error, cleanError } = useSession();
    const history = useHistory();
    const [values, setValues] = useState(initialState);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0)

    useEffect(() => user && history.push('/home'), [user, history])

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        cleanError();
        setOpen(false);
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

    const goNext = () => {
        setStep(step + 1)
    }

    const goBack = () => {
        if (step > 0) {
            setStep(step - 1)
        }
    }

    return (
        <div>
            <c onClick={!open && handleClickOpen}>Cadastrar</c>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Cadastrar</DialogTitle>
                <DialogContent>
                    {
                        step === 0 &&
                        <Fragment>
                            <DialogContentText>
                                Por favor, informe suas credenciais abaixo para realizar o cadastro.
                            </DialogContentText>
                            <PersonalForm
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                handleInstagramAt={handleInstagramAt}
                                values={values}
                            />
                        </Fragment>

                    }
                    {
                        step === 1 &&
                        <Fragment>
                            <DialogContentText>
                                Agora, informe o plano desejado e seus dados de pagamento.
                                Caso Você seja assinante do close friends do Leonardo Siqueira,
                                você pode informar seu instagram e adquirir o seu acesso.
                            </DialogContentText>
                            <PaymentForm
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                                handleInstagramAt={handleInstagramAt}
                                values={values}
                            />
                        </Fragment>

                    }
                    <FormHelperText error>{error}</FormHelperText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancelar
                    </Button>

                    {
                        step > 0 &&
                        <Button onClick={goBack}>
                            Voltar
                        </Button>
                    }
                    {
                        step < 1 &&
                        <Button onClick={goNext}>
                            Próximo
                        </Button>
                    }
                    {
                        step === 1 &&
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
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}