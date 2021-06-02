import { Box, Paper, Typography, Button } from '@material-ui/core'
import Fade from 'react-reveal/Fade'

import { SignUp } from 'components';
import { usePlansStyles } from './styles'

export default function Plans() {
    const classes = usePlansStyles();

    const Card = ({ title, price }) => (
        <Paper className={classes.paper} elevation={5}>
            <Typography variant="h5">{title}</Typography>
            <Typography align="center" variant="h3">{price}</Typography>
            <Button variant="contained" color="primary">
                <SignUp/>
            </Button>
        </Paper>
    )

    return (
        <Box className={classes.root} id="plans">
            <Typography variant="h4" align="center" className={classes.title}>
                Comece agora a melhorar
                seus investimentos
            </Typography>

            <Fade bottom cascade>
                <Box className={classes.cardsContainer}>

                    <Card
                        title="Mensal"
                        price="R$ 29,90"
                    />
                    <Card
                        title="Trimestral"
                        price="R$ 73,90"
                    />
                    <Card
                        title="Anual"
                        price="R$ 238,90"
                    />
                </Box>

            </Fade>
        </Box>
    )
}