import { Box, Paper, Typography } from '@material-ui/core';
import { useFeaturesStyles } from './styles';
import education from 'assets/education.svg';
import chart from 'assets/chart.svg';
import tools from 'assets/tools.svg';

export default function Features() {
    const classes = useFeaturesStyles();

    const Card = ({ cover, title, text }) => (
        <Paper className={classes.paper} elevation={5}>
            <img src={cover} className={classes.cover} alt={`Card ${title}`}/>
            <Typography variant="h6">{title}</Typography>
            <Typography align="center">
                {text}
            </Typography>
        </Paper>
    )

    return (
        <Box className={classes.root}>

            <Card
                cover={education}
                title="Educação"
                text="Conteúdo periódico desenvolvido por experts
                ensinando elementos da teoria de finanças e fatores de risco"
            />

            <Card
                cover={chart}
                title="Técnicas"
                text="A EasyQuant é uma plataforma baseada no  investimento em fatores
                e mostra na prática as técnicas desenvolvidas e popularizadas no
                exterior, ainda pouco utilizada pelos investidores individuais no Brasil"
            />

            <Card
                cover={tools}
                title="Ferramentas"
                text="Plataforma completa para você computar carteiras com diferentes
                estratégias, smart-beta, avaliação de desempenho, comparação
                com benchmarks e backtests"
            />
        </Box>
    )
}