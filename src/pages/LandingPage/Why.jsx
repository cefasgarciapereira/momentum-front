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
                    cuidadosamente selecionado por especialistas. Porém, um método verdadeiramente eficiente não se pauta no acaso! A Easy Quant é...
            </Typography>

                <Box className={classes.itemsContainer}>
                    <Item
                        number="1"
                        title="Científico"
                        text="	A literatura em finanças quantitativas é vasta em mostrar a existência de 
                        prêmios para fatores sistemáticos em diversas áreas da economia, 
                        diversos países e em diversos momentos do tempo."
                    />

                    <Item
                        number="2"
                        title="Verificabilidade"
                        text="Os investimentos sistemáticos minimizam a subjetividade do investidor, sendo baseados em sinais gerados pelos dados."
                    />

                    <Item
                        number="3"
                        title="Facilidade"
                        text="A Easy Quant ensina de maneira objetiva e simples o que são os fatores e como são formadas as estratégias sistemáticas de investimento,  
                        fornecendo conjuntamente uma ferramenta computacional que permite a visualização e a avaliação das estratégias de investimento baseadas em fatores."
                    />
                </Box>
            </Box>
        </Fade>
    )
}