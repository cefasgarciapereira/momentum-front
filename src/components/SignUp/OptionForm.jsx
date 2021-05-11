import { Fragment } from 'react';
import {
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Box,
    Card
} from '@material-ui/core';
import { useOptionForm } from './styles';

export default function OptionForm(props) {
    const { handleFormOption, handleClose } = props;
    const classes = useOptionForm();

    return (
        <Fragment>
            <DialogContent>
                <DialogContentText>
                    Você pode se cadastrar de duas formas.
                    Realizando a assinatura de acordo com o plano que você preferir,
                    ou caso você seja close friends do Leonardo Siqueira, você já
                    está pré aprovado e, portanto,  não há necessidade de realizar assinatura .
                </DialogContentText>
                <Box className={classes.cardContainer}>
                    <Card
                        variant="outlined"
                        className={classes.card}
                        onClick={() => handleFormOption('paid')}
                    >
                        Desejo escolher um plano e realizar uma assinatura
                    </Card>
                    <Card
                        variant="outlined"
                        className={classes.card}
                        onClick={() => handleFormOption('closefriends')}
                    >
                        Sou close friends do Leonardo Siqueira e desejo informar o meu @instagram
                    </Card>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>
                    Cancelar
                </Button>
            </DialogActions>
        </Fragment>
    )
}