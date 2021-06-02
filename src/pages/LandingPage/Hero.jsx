import { Box, Typography, IconButton } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';
import Fade from 'react-reveal/Fade';
import { useHeader } from 'utils/hooks';
import { useHeroStyles } from './styles';

export default function Hero() {
    const { headerHeight } = useHeader();
    const classes = useHeroStyles();

    const height = `calc(100vh - ${headerHeight}px)`

    return (
        <Box className={classes.root} style={{ height: height }} id="hero">
            <Typography variant='h3' align="center" className={classes.title}>
                <Fade left>
                    A plataforma que te ensinará a prática dos 
                    investimentos quant em fatores de risco
                </Fade>
            </Typography>

            <Box className={classes.socialMedia}>
                <Fade bottom cascade>
                    <IconButton>
                        <FacebookIcon />
                    </IconButton>

                    <IconButton>
                        <InstagramIcon />
                    </IconButton>

                    <IconButton>
                        <EmailIcon />
                    </IconButton>
                </Fade>
            </Box>
        </Box>
    )
}