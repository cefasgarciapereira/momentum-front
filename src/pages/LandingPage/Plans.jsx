import { Box, Paper, Typography, Button } from '@material-ui/core'
import Fade from 'react-reveal/Fade'

import { usePlansStyles } from './styles'

export default function Plans() {
    const classes = usePlansStyles();

    /*const Card = ({ title, price }) => (
        <Paper className={classes.paper} elevation={5}>
            <Typography variant="h5">{title}</Typography>
            <Typography align="center" variant="h3">{price}</Typography>
            <Button variant="contained" color="primary" href="/cadastrar">
                Começar
            </Button>
        </Paper>
    )*/

    const PromotionCard = ({ title, price, promotionalPrice, monthPrice, chargePeriod }) => (
        <Paper className={classes.paper} elevation={5}>
            <Typography variant="h5">{title}</Typography>
            <Typography align="center" variant="h4" className={classes.lined}>
                {price}
            </Typography>
            <Typography align="center" variant="h3">{promotionalPrice}</Typography>
            <Typography align="center">cobrança {chargePeriod}</Typography>
            <Typography align="center">equivalente a {monthPrice} por mês</Typography>
            <Typography align="center">valor promocional válido até 31/08/2021</Typography>
            <Button variant="contained" color="primary" href="/cadastrar">
                Começar
            </Button>
        </Paper >
    )

    return (
        <Box className={classes.root} id="plans">
            <Typography variant="h4" align="center" className={classes.title}>
                Comece agora a melhorar
                seus investimentos com nossos valores promocionais de lançamento
            </Typography>

            <Typography variant="h6" align="center" className={classes.subtitle}>
                Você tem 7 dias grátis para testar qualquer plano.
            </Typography>


            <Fade bottom cascade>
                <Box className={classes.cardsContainer}>
                    <PromotionCard
                        title="Mensal"
                        price="R$ 39,90"
                        promotionalPrice="R$ 19,90"
                        chargePeriod='mensal'
                        monthPrice='R$19,90'
                    />
                    <PromotionCard
                        title="Semestral"
                        price="R$ 219,90"
                        promotionalPrice="R$ 109,90"
                        chargePeriod='semestral'
                        monthPrice='R$18,30'
                    />
                    <PromotionCard
                        title="Anual"
                        price="R$ 379,90"
                        promotionalPrice="R$ 189,90"
                        chargePeriod='anual'
                        monthPrice='R$15,80'
                    />
                </Box>
            </Fade>
        </Box>
    )
}