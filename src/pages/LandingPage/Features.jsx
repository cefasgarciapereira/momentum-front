import { Box, Paper, Typography } from '@material-ui/core';
import { useFeaturesStyles } from './styles';
import Fade from 'react-reveal/Fade';
import education from 'assets/education.svg';
import chart from 'assets/chart.svg';
import tools from 'assets/tools.svg';

export default function Features() {
    const classes = useFeaturesStyles();

    const Card = ({ cover, title, text }) => (
        <Fade bottom>
            <Paper className={classes.paper} elevation={5}>
                <img src={cover} className={classes.cover} alt={`Card ${title}`} />
                <Typography variant="h6">{title}</Typography>
                <Typography align="center">
                    {text}
                </Typography>
            </Paper>
        </Fade>
    )

    return (
        <Box className={classes.root} id="features">
            <Card
                cover={education}
                title="Educação"
                text="Conteúdo periódico desenvolvido por experts ensinando elementos da teoria de finanças e fatores de risco amplamente utilizados por acadêmicos e gestores"
            />

            <Card
                cover={chart}
                title="Acompanhamento"
                text="Acompanhamento diário da evolução dos fatores de risco"
            />

            <Card
                cover={tools}
                title="Ferramentas"
                text="Plataforma completa para você computar carteiras com diferentes parâmetros quantitativos, comparar diferentes especificações com benchmarks e backtests"
            />
        </Box>
    )
}