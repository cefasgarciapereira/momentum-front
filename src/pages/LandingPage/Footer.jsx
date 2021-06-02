import { Box, Typography, Button, IconButton } from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';
import { useFooterStyles } from './styles'
import logo from 'assets/white-text-logo.svg'

export default function Footer(){
    const classes = useFooterStyles();

    return(
        <Box className={classes.root} id="footer">
            <img className={classes.logo} src={logo} alt="Footer Easyqaunt Logo"/>
            <Box className={classes.linkContainer}>
                <Button color="secondary">Home</Button>
                <Button color="secondary">Por Que?</Button>
                <Button color="secondary">Depoimentos</Button>
                <Button color="secondary">Planos</Button>
                <Button color="secondary">Entrar</Button>
                <Button color="secondary">Assinar</Button>
            </Box>

            <Box className={classes.socialMedia}>
                <IconButton>
                    <FacebookIcon color="secondary"/>
                </IconButton>

                <IconButton>
                    <InstagramIcon color="secondary"/>
                </IconButton>

                <IconButton>
                    <EmailIcon color="secondary"/>
                </IconButton>
            </Box>

            <Typography style={{color: 'white'}} align="center">© Copyright 2021 Easy Quant todos os direitos reservados</Typography>
        </Box>
    )
}