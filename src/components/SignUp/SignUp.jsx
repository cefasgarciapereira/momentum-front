import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogTitle,
} from '@material-ui/core';
import OptionForm from './OptionForm';
import ClosefriendsForm from './ClosefriendsForm';
import SubscriptionForm from './SubscriptionForm';
import { useSession } from 'contexts/session';
import { useHistory } from 'react-router-dom';
import { signUp as initialValues } from './initialState';

export default function SignUp() {
    const history = useHistory();
    const { user, cleanError } = useSession();
    const [open, setOpen] = useState(false);
    const [formStatus, setFormStatus] = useState(initialValues)

    useEffect(() => user && history.push('/home'), [user, history])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        cleanError();
        setFormStatus(initialValues);
        setOpen(false);
    };

    const handleFormOption = (option) => {
        setFormStatus({
            open: true,
            option: option
        })
    }

    return (
        <div>
            <c onClick={!open && handleClickOpen}>Cadastrar</c>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
                <DialogTitle id="form-dialog-title">Cadastrar</DialogTitle>
                {
                    !formStatus.open &&
                    <OptionForm handleFormOption={handleFormOption} handleClose={handleClose}/>
                }

                {
                    formStatus.open && (
                        formStatus.option === 'closefriends' ?
                            <ClosefriendsForm 
                            handleClose={handleClose}
                            setFormStatus={setFormStatus}
                            /> :
                            <SubscriptionForm 
                            handleClose={handleClose}
                            setFormStatus={setFormStatus}
                            />
                    )
                }
            </Dialog>
        </div>
    );
}