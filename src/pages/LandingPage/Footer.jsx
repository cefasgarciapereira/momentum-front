import { Box, Button, IconButton, Link } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';
import { useFooterStyles } from './styles'
import logo from 'assets/white-text-logo.svg';

import { Copyright } from 'components';

export default function Footer(){
    const classes = useFooterStyles();

    function jumpTo(anchor) {
        window.location.href = "#" + anchor;
    }

    return(
        <Box className={classes.root} id="footer">
            <img className={classes.logo} src={logo} alt="Footer Easyqaunt Logo"/>
            <Box className={classes.linkContainer}>
                <Button color="secondary"  onClick={() => jumpTo('home')}>Home</Button>
                <Button color="secondary" onClick={() => jumpTo('why')}>Por Que?</Button>
                <Button color="secondary" onClick={() => jumpTo('feedback')}>Depoimentos</Button>
                <Button color="secondary" onClick={() => jumpTo('plans')}>Planos</Button>
                <Button color="secondary" component={Link} href="/login">Entrar</Button>
                <Button color="secondary" component={Link} href="/cadastrar">Assinar</Button>
            </Box>

            <Box className={classes.socialMedia}>
                <IconButton>
                    <FacebookIcon color="secondary"/>
                </IconButton>

                <IconButton>
                    <InstagramIcon color="secondary"/>
                </IconButton>

                <IconButton href="mailto: contato@easyquant.com.br">
                    <EmailIcon color="secondary"/>
                </IconButton>
            </Box>
            <Copyright style={{color: 'white'}}/>
        </Box>
    )
}