import { Box, Typography, IconButton } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';
import { useHeader } from 'utils/hooks';
import { useHeroStyles } from './styles';

export default function Hero() {
    const { headerHeight } = useHeader();
    const classes = useHeroStyles();

    const height = `calc(100vh - ${headerHeight}px)`

    return (
        <Box className={classes.root} style={{ height: height }}>
            <Typography variant='h3' align="center" className={classes.title}>
                A plataforma que levará seus investimentos a um novo nível
            </Typography>

            <Box className={classes.socialMedia}>
                <IconButton>
                    <FacebookIcon />
                </IconButton>

                <IconButton>
                    <InstagramIcon />
                </IconButton>

                <IconButton>
                    <EmailIcon />
                </IconButton>
            </Box>
        </Box>
    )
}