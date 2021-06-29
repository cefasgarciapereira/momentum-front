import { Box, Typography, Paper, Link } from '@material-ui/core';
import Fade from 'react-reveal/Fade';

import { useFeedbackStyles } from './styles';
import leonardosiqueira from 'assets/leonardosiqueira.jpg'

export default function Feedback() {
    const classes = useFeedbackStyles();

    const Card = (props) => {
        const { picture, name, text, linkTo } = props;

        return (
            <Paper className={classes.paper} elevation={0}>
                <img src={picture} className={classes.picture} alt={`Foto de perfil ${name}`} />
                <Box>
                    <Typography variant="h6" component={Link} href={linkTo}>{name}</Typography>
                    <Typography align="justify">
                        {text}
                    </Typography>
                </Box>
            </Paper>
        )
    }

    return (
        <Box className={classes.root} id="feedback">
            <Typography variant="h4" align="center" className={classes.title}>
                <Fade left>
                    A impressão de quem já usa a Easy Quant
                </Fade>
            </Typography>

            <Fade bottom cascade>
                <Box className={classes.cardsContainer}>
                    <Card
                        name="Leonardo Siqueira"
                        text="Por que a gente deveria investir hoje da mesma maneira que fazíamos na década de 70? Não faz sentido algum, dado que o mundo evoluiu.
                        Eu utilizo a Easy Quant nos meus investimentos porque é a filosofia que acredito. Uma estratégia baseada em dados e modelos matemáticos, 
                        replicáveis e com backtests que mostram os retornos consistentes acima do mercado."
                        picture={leonardosiqueira}
                        linkTo="https://www.instagram.com/leonardosiqueirabr/"
                    />

                    <Card
                        name="Carlos da Silva"
                        text="Não sou da área, então aprender programação para depois aprender finanças é inviável. A EQ é um grande atalho"
                        picture={profilePic}
                    />

                    <Card
                        name="Carlos da Silva"
                        text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                 accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae 
                 ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                  explicabo."
                        picture={profilePic}
                    />
                </Box>
            </Fade>
        </Box>
    )
}

const profilePic = "https://o.aolcdn.com/images/dimse/5845cadfecd996e0372f/9f0ca92e753493a62191831229cf2f459cb2c1ce/Y3JvcD00NTAlMkM0NTAlMkMwJTJDMCZxdWFsaXR5PTg1JmZvcm1hdD1qcGcmcmVzaXplPTE2MDAlMkMxNjAwJmltYWdlX3VyaT1odHRwcyUzQSUyRiUyRnMueWltZy5jb20lMkZvcyUyRmNyZWF0ci11cGxvYWRlZC1pbWFnZXMlMkYyMDE5LTAxJTJGZDBlZmM4ZDAtMjRhNS0xMWU5LTllNmEtNWUwZjJhY2U5ZGNjJmNsaWVudD1hMWFjYWMzZTFiMzI5MDkxN2Q5MiZzaWduYXR1cmU9Y2FiZWI1NWMyYjI5NTgyOTc0NTc4YzM0OWMxMWNlZmUwYzU4MWE1YQ=="