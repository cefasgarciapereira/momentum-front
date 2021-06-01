import { useState, useEffect } from 'react';
import {
    Typography,
    Card,
    CardContent,
    CardActions
} from '@material-ui/core';
import { useSession } from 'contexts/session';
import { useApi } from 'utils/hooks';
import { parseError, parseChargeDate, stripeStatus } from 'utils/helper';

export default function CustomerCard() {
    const { user } = useSession();
    const [error, setError] = useState(null)
    const [values, setValues] = useState(null);
    const { api } = useApi()

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
                    console.log(subscription)

                })
                .catch(err => setError(parseError(err)))
        }
        // eslint-disable-next-line
    }, [user])

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
                <Typography variant="h5" style={{margin: '0 0 1rem 0'}}>Dados da Assinatura</Typography>
                <Typography><strong>Status:</strong> {stripeStatus(values.status)}</Typography>
                <Typography><strong>Valor:</strong> R$ {parseFloat(values.plan.amount / 100).toFixed(2)}/{values.plan.interval}</Typography>
                <Typography><strong>Cobrança:</strong> {parseChargeDate(values.start_date)}</Typography>
            </CardContent>
            <CardActions style={{ float: 'right' }}>
            </CardActions>
        </Card>
    )
}