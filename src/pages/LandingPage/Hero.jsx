import { Box, Typography, IconButton } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';
import Fade from 'react-reveal/Fade';
import { useHeader } from 'utils/hooks';
import { useHeroStyles } from './styles';

import devices from 'assets/devices.png';

export default function Hero() {
    const { headerHeight } = useHeader();
    const classes = useHeroStyles();

    const height = `calc(100vh - ${headerHeight}px)`

    return (
        <Box className={classes.root} style={{ height: height }} id="hero">
            <Typography variant='h4' align="center" component="h1" className={classes.title}>
                <Fade left>
                    A plataforma que elevará seu conhecimento em investimentos quantitativos a um novo nível
                </Fade>
                <Fade right>
                    <Typography style={{ margin: '2rem 0' }} component="h2">
                        A EasyQuant é uma plataforma de ensino baseada no investimento em fatores e mostra na prática as técnicas desenvolvidas
                        e popularizadas no exterior, ainda pouco utilizadas pelos investidores individuais no Brasil.
                    </Typography>
                </Fade>
            </Typography>

            <Fade>
                <img src={devices} className={classes.devices} alt="iphone and ipad" />
            </Fade>

            <Box className={classes.socialMedia}>
                <Fade bottom cascade>
                    <IconButton>
                        <FacebookIcon />
                    </IconButton>

                    <IconButton>
                        <InstagramIcon />
                    </IconButton>

                    <IconButton href="mailto: contato@easyquant.com.br">
                        <EmailIcon />
                    </IconButton>
                </Fade>
            </Box>
        </Box>
    )
}