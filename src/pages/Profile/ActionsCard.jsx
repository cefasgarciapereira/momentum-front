import {
    Typography,
    Card,
    CardContent,
    CardActions,
    Button
} from '@material-ui/core';
import { useSession } from 'contexts/session';
import { useApi } from 'utils/hooks';
import { useSnackbar } from 'notistack';

export default function ActionsCard() {
    const { user } = useSession();
    const { api } = useApi();
    const { enqueueSnackbar } = useSnackbar();

    const cancelSubscription = () => {
        api.post("/user/cancel_subscription", { subscription_id: user.subscription_id })
        .then(() => enqueueSnackbar('Sua assinatura foi cancelada.', { variant: "success" }))
        .catch(() => enqueueSnackbar('Não foi possível cancelar sua assinatura.', { variant: "error" }))
    }

    const reactivateSubscription = () => {
        api.post("/user/reactivate_subscription", { subscription_id: user.subscription_id })
        .then(() => enqueueSnackbar('Sua assinatura foi reativada com sucesso.', { variant: "success" }))
        .catch(() => enqueueSnackbar('Não foi possível reativar sua assinatura.', { variant: "error" }))
    }

    return (
        <Card style={{ margin: '1rem 0' }}>
            <CardContent>
                <Typography variant="h5">Ações</Typography>
                <Button 
                onClick={cancelSubscription}
                variant="contained" 
                style={{backgroundColor: "red", color: "white", margin: '1rem 0'}}>
                    Cancelar Assinatura
                </Button>

                <Button 
                onClick={reactivateSubscription}
                variant="contained" 
                style={{backgroundColor: "green", color: "white", margin: '1rem'}}>
                    Reativar Assinatura
                </Button>
            </CardContent>
            <CardActions style={{ float: 'right' }}>
            </CardActions>
        </Card>
    )
}