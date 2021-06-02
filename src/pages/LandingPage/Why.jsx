import { Box, Typography } from '@material-ui/core';
import { useWhyStyles } from './styles';
import Fade from 'react-reveal/Fade';

export default function Why() {
    const classes = useWhyStyles();

    const Item = (props) => {
        const { number, title, text } = props;

        return (
            <Box className={classes.itemRoot}>
                <Box className={classes.itemNumberRoot}>
                    <Typography
                        variant="h6"
                        align="center"
                        style={{ alignSelf: 'center' }}
                    >
                        {number}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h5" className={classes.itemTitle}>
                        {title}
                    </Typography>
                    <Typography className={classes.itemText}>
                        {text}
                    </Typography>
                </Box>
            </Box>
        )

    }

    return (
        <Fade>
            <Box className={classes.root}  id="why">
                <Typography
                    variant="h4"
                    align="center"
                    className={classes.title}
                >
                    Por que utilizar a Easy Quant?
            </Typography>

                <Typography
                    align="center"
                    className={classes.story}
                    variant="h6"
                >
                    Em 1973 o professor Burton Malkiel da Universidade de Princeton afirmou em seu livro,
                    A Random Walk Down Wall Street, que um macaco vendado jogando dardos nas páginas de um
                    jornal de finanças poderia selecionar um portfólio que performaria tão bem quanto um
                    cuidadosamente selecionado por especialistas.
            </Typography>

                <Box className={classes.itemsContainer}>
                    <Item
                        number="1"
                        title="Científico"
                        text="Os textos didáticos sobre a teoria de finanças e fatores de risco 
                        são baseados em literatura que vai desde artigos seminais até a literatura moderna de investimentos."
                    />

                    <Item
                        number="2"
                        title="Verificabilidade"
                        text="A plataforma ensina técnicas acadêmicas de comparação de estratégias de investimento 
                        utilizando algoritmos e também permite que o próprio usuário consiga computar e comparar diferentes abordagens"
                    />

                    <Item
                        number="3"
                        title="Facilidade"
                        text="A computação das estratégias não exige conhecimentos profundos em diversas linguagens de programação. 
                        A proposta da easyquant é tornar o conhecimento de investimentos em fatores de risco acessível ao público geral"
                    />
                </Box>
            </Box>
        </Fade>
    )
}