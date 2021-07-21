import { useState } from 'react';
import {
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    FormControl,
    InputLabel,
    Select
} from '@material-ui/core';
import { useSession } from 'contexts/session';
import { useApi } from 'utils/hooks';
import { useSnackbar } from 'notistack';
import PLANS from 'utils/plans';

export default function ActionsCard() {
    const { user } = useSession();
    const { api } = useApi();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [plan, setPlan] = useState("monthly")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const selectPlan = (e) => {
        setPlan(e.target.value);
    };

    const cancelSubscription = () => {
        api.post("/user/cancel_subscription", { subscription_id: user.subscription_id })
            .then(() => {
                enqueueSnackbar('O cancelamento da sua assinatura foi agendado para o próximo vencimento.', { variant: "success", onClose:refreshPage})
                document.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfmDNglKZgPqh_sPgGZI5zLeVOD0YGQEOcfgQyfl8RCbEp4hA/viewform'
            })
            .catch(() => enqueueSnackbar('Não foi possível cancelar sua assinatura.', { variant: "error" }))
    }

    const reactivateSubscription = () => {
        api.post("/user/reactivate_subscription", { subscription_id: user.subscription_id })
            .then(() => enqueueSnackbar('Sua assinatura foi reativada com sucesso.', { variant: "success", onClose:refreshPage }))
            .catch(() => enqueueSnackbar('Não foi possível reativar sua assinatura.', { variant: "error", onClose:refreshPage }))
    }

    const handleSubmit = () => {
        api.post("/user/change_plan", { subscription_id: user.subscription_id, price_id: PLANS[plan] })
            .then(() => enqueueSnackbar('Sua assinatura foi alterada com sucesso.', { variant: "success", onClose:refreshPage }))
            .catch(() => enqueueSnackbar('Não foi possível alterar sua assinatura.', { variant: "error", onClose:refreshPage }))
    }
    
    const refreshPage = () => {window.location.reload();}

    return (
        <Card style={{ margin: '1rem 0' }}>
            <CardContent>
                <Typography variant="h5">Ações</Typography>

                <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ margin: '1rem 1rem 1rem 0' }}>
                    Alterar Plano
                </Button>

                <Button
                    onClick={cancelSubscription}
                    variant="contained"
                    style={{ backgroundColor: "red", color: "white", margin: '1rem' }}>
                    Cancelar Assinatura
                </Button>

                <Button
                    onClick={reactivateSubscription}
                    variant="contained"
                    style={{ backgroundColor: "green", color: "white", margin: '1rem' }}>
                    Reativar Assinatura
                </Button>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Alterar Plano</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Escolha o novo plano que você deseja aderir.
                        </DialogContentText>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-age-native-simple">Plano</InputLabel>
                            <Select
                                native
                                value={plan}
                                onChange={selectPlan}
                                label="Plano"
                                inputProps={{
                                    name: 'plan',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option value="monthly">Mensal - R$29,90 / mês</option>
                                <option value="semiannually">Semestral - R$73,90 / semestre</option>
                                <option value="annual">Anual - R$ 238,90 / ano</option>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
            <CardActions style={{ float: 'right' }}>
            </CardActions>
        </Card>
    )
}