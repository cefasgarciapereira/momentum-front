import { useState, useEffect, Fragment } from 'react';
import {
    Typography,
    Card,
    CardContent,
    CardActions,
    Grid,
} from '@material-ui/core';
import { useSession } from 'contexts/session';
import { useApi } from 'utils/hooks';
import { parseError, parseChargeDate, stripeStatus } from 'utils/helper';
import { planTitle } from 'utils/plans';

export default function CustomerCard() {
    const { user } = useSession();
    const [error, setError] = useState(null)
    const [values, setValues] = useState(null);
    const [card, setCard] = useState(null)
    const [billingDetails, setBillingDetails] = useState(null)
    const { api } = useApi()

    const intervals = {
        year: 'ano',
        month: 'mês',
        quarter: 'trimestre',
        semiannualy: 'semestre'
    }

    const pluralIntervals = {
        year: 'anos',
        month: 'meses',
    }

    const parsePriceInterval = (intervalCount, interval) => {
        return intervalCount > 1 ? `${intervalCount} ${pluralIntervals[interval]}` : intervals[interval]
    }

    useEffect(() => {
        if (user.subscription_id) {
            api.get('/user/subscription', {
                params: {
                    subscription_id: user.subscription_id
                }
            })
            .then(res => {
                const subscription = res.data.subscription;
                setValues(subscription)
                fetchPaymentMethod(subscription.default_payment_method)
            })
            .catch(err => setError(parseError(err)))
        }
        // eslint-disable-next-line
    }, [user])

    const fetchPaymentMethod = (paymentMethodId) => {
        api.get('/user/payment_methods', {
            params: {
                payment_method_id: paymentMethodId
            }
        })
        .then(res => {
            const data = res.data.paymentMethod.card;
            const billing = res.data.paymentMethod.billing_details;

            setCard(data)
            setBillingDetails(billing)
        })
        .catch(err => setError(parseError(err)))
    }

    if (!values) return (
        <Card>
            <CardContent>
                <Typography variant="h5">Dados da Assinatura</Typography>
                {error ? error : "Carregando os dados..."}
            </CardContent>
        </Card>
    )

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Dados da Assinatura</Typography>
                <Typography style={{ margin: '1rem 0 0 0' }}>Visulize os dados associados à sua assinatura</Typography>

                <Typography variant="h6" style={{ margin: '1rem 0 .5rem 0' }}>Detalhes do Plano</Typography>

                <Typography><strong>Plano:</strong> {planTitle[values.plan.id]}</Typography>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                >
                    <Typography style={{margin: '0 .5rem 0 0'}}><strong>Código: </strong></Typography>
                    <Typography variant="caption" style={{padding: '.3rem', backgroundColor: 'rgba(80,80,80,.1)', borderRadius: '5px'}}>{values.plan.id}</Typography>
                </Grid>

                <Typography>
                    <strong>Status:</strong> {stripeStatus(values.status)}
                    {values.cancel_at_period_end && ` com cancelamento agendado para ${parseChargeDate(values.current_period_end)}`}
                </Typography>
                <Typography><strong>Valor:</strong> R$ {parseFloat(values.plan.amount / 100).toFixed(2)} / {parsePriceInterval(values.plan.interval_count, values.plan.interval)}</Typography>
                <Typography><strong>Dia de Cobrança:</strong> {parseChargeDate(values.start_date)}</Typography>

                {
                    billingDetails &&
                    <Fragment>
                        <Typography variant="h6" style={{ margin: '1rem 0 .5rem 0' }}>Endereço</Typography>
                        <Typography><strong>Cidade:</strong> {billingDetails.address.city}</Typography>
                        <Typography><strong>Estado:</strong> {billingDetails.address.state}</Typography>
                        <Typography><strong>Logradouro:</strong> {billingDetails.address.line1}</Typography>
                        <Typography><strong>CEP:</strong> {billingDetails.address.postal_code}</Typography>
                    </Fragment>
                }

                {
                    card &&
                    <Fragment>
                        <Typography variant="h6" style={{ margin: '1rem 0 .5rem 0' }}>Método de Pagamento</Typography>
                        <Typography><strong>Cartão:</strong> Crédito</Typography>
                        <Typography><strong>Bandeira:</strong> {card.brand}</Typography>
                        <Typography><strong>Número:</strong> •••• {card.last4}</Typography>
                        <Typography><strong>Vencimento:</strong> {card.exp_month}/{card.exp_year}</Typography>
                    </Fragment>
                }
            </CardContent>
            <CardActions style={{ float: 'right' }}>
            </CardActions>
        </Card>
    )
}