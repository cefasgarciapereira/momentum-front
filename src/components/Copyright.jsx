import { Typography, Link } from '@material-ui/core';

export default function Copyright({...rest}) {

    return (
        <Typography variant="body2" align="center" {...rest}>
            {'© Copyright '}
            {new Date().getFullYear()}
            {' '}
            <Link color="inherit" href="https://easyquant.com.br/">
                Easy Quant todos os direitos reservados.
            </Link>            
        </Typography>
    );
}