import { useState } from 'react';
import { Box, IconButton, Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab/';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import { useSession } from 'contexts/session';
import { useApi } from 'utils/hooks';

export default function TransitionAlerts() {
    const { user, updateUser } = useSession();
    const { api } = useApi();
    const [open, setOpen] = useState(true);

    const firstName = () => (
        user && user.name ? user.name.split(' ')[0] : ''
    )

    const closeWelcomeMessage = async () => {
        await api.post('user/hideMessage', { user: user })
        updateUser({ ...user, welcome_message: false })
    }

    const Actions = () => (
        <Box display="flex">
            <IconButton
                aria-label="minimize"
                color="inherit"
                size="small"
                onClick={() => {
                    setOpen(false);
                }}
            >
                <RemoveIcon fontSize="inherit" />
            </IconButton>

            <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={closeWelcomeMessage}
            >
                <CloseIcon fontSize="inherit" />
            </IconButton>
        </Box>
    )

    return (
        (user && user.welcome_message) ?
            <Collapse in={open} style={{ margin: '1rem 0' }}>
                <Alert
                    action={<Actions />}
                >
                    Olá, <strong>{firstName()}</strong>. Estamos felizes que você tenha se cadastrado na Easy Quant e te desjamos bons investimentos !!
            </Alert>
            </Collapse>
            : null
    );
}