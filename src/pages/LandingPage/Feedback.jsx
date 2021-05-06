import { Box, Typography, Paper } from '@material-ui/core';
import { useFeedbackStyles } from './styles';
import Fade from 'react-reveal/Fade';

export default function Feedback() {
    const classes = useFeedbackStyles();

    const Card = (props) => {
        const { picture, name, text } = props;

        return (
            <Paper className={classes.paper} elevation={0}>
                <img src={picture} className={classes.picture} alt={`Foto de perfil ${name}`} />
                <Box>
                    <Typography variant="h6">{name}</Typography>
                    <Typography align="justify">
                        {text}
                    </Typography>
                </Box>
            </Paper>
        )
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h4" align="center" className={classes.title}>
                <Fade left>
                    A impressão de quem já usa a Easy Quant
                </Fade>
            </Typography>
            
            <Fade bottom cascade>
                <Box className={classes.cardsContainer}>
                    <Card
                        name="Carlos da Silva"
                        text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                 accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae 
                 ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                  explicabo."
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