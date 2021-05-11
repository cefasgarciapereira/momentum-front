import { Fragment, useState } from 'react';
import {
    DialogContent,
    DialogContentText,
    Button,
    DialogActions,
    CircularProgress,
    FormHelperText
} from '@material-ui/core';
import { useSession } from 'contexts/session';
import AddressForm from './AddressForm';
import PersonalForm from './PersonalForm';
import PaymentForm from './PaymentForm';
import { subscription as initialValues } from './initialState';

export default function SubscriptionForm(props) {
    const { handleClose, setFormStatus } = props;
    const { registerAndSubscribe } = useSession();
    const [values, setValues] = useState(initialValues)
    const [step, setStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const goNext = () => {
        if (step < 2) {
            setStep(step + 1)
        }
    }

    const goBack = () => {
        if (step === 0) {
            setFormStatus({
                open: false,
                option: null
            })
        } else {
            setStep(step - 1)
        }
    }

    const handleInputFocus = (e) => {
        setValues({ ...values, focus: e.target.name });
    }

    const clearInputFocus = () => {
        setValues({ ...values, focus: '' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let params = values;
        params.card_exp_month=values.card_expiry.split('/')[0]
        params.card_exp_year=values.card_expiry.split('/')[1]
        params.plan_id = 'price_1In5oRIoqiuDenozaQ0lNzeP'
        console.log(params);
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

    return (
        <Fragment>
            <DialogContent>
                {
                    step === 0 &&
                    <Fragment>
                        <DialogContentText>
                            Informe suas credenciais abaixo para realizar o acesso na plataforma após o cadastro.
                        </DialogContentText>
                        <PersonalForm handleSubmit={handleSubmit} handleChange={handleChange} values={values} />
                    </Fragment>
                }

                {
                    step === 1 &&
                    <Fragment>
                        <DialogContentText>
                            Informe o seu endereço de cobrança.
                        </DialogContentText>
                        <AddressForm handleSubmit={handleSubmit} values={values} handleChange={handleChange} />
                    </Fragment>
                }

                {
                    step === 2 &&
                    <Fragment>
                        <DialogContentText>
                            Informe o plano desejado e seus dados de pagamento.
                        </DialogContentText>
                        <PaymentForm
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            values={values}
                            handleInputFocus={handleInputFocus}
                            clearInputFocus={clearInputFocus}
                        />
                    </Fragment>
                }
                <FormHelperText error>{error}</FormHelperText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>
                    Cancelar
                </Button>

                <Button onClick={goBack}>
                    Voltar
                </Button>

                {
                    step < 2 &&
                    <Button onClick={goNext}>
                        Próximo {`${step+1}/3`}
                    </Button>
                }

                {
                    step === 2 &&
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
        </Fragment>
    )
}