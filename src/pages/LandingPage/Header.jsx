import { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Button, Link } from '@material-ui/core';
import { Login } from 'components';
import MenuIcon from '@material-ui/icons/Menu';
import textLogo from 'assets/black-text-logo.svg';
import { useHeaderStyles } from './styles';
import { useDeviceDetect } from 'utils/hooks';

export default function Header() {
    const classes = useHeaderStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const { isMobile } = useDeviceDetect();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function jumpTo(anchor) {
        window.location.href = "#" + anchor;
        setAnchorEl(null);
    }

    if (isMobile) {
        return (
            <Box className={classes.root} id="header">
                <img src={textLogo} alt="Easy Quant Logo" className={classes.logo} />
                <IconButton onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => jumpTo('home')}>Home</MenuItem>
                    <MenuItem onClick={() => jumpTo('why')}>Por Que?</MenuItem>
                    <MenuItem onClick={() => jumpTo('feedback')}>Depoimentos</MenuItem>
                    <MenuItem onClick={() => jumpTo('plans')}>Planos</MenuItem>
                    <MenuItem component={Link} to="/cadastrar"><Login /></MenuItem>
                    <MenuItem onClick={handleClose}>Cadastrar</MenuItem>
                </Menu>
            </Box>
        )
    }

    return (
        <Box className={classes.root} id="header">
            <img src={textLogo} alt="Easy Quant Logo" className={classes.logo} />
            <Box style={{ display: 'flex' }}>
                <Button href="#home">Home</Button>
                <Button href="#why">Por Que?</Button>
                <Button href="#feedback">Depoimentos</Button>
                <Button href="#plans">Planos</Button>
                <Button variant="outlined" color="primary" style={{ margin: '0 1rem' }} href="/cadastrar">Cadastrar</Button>
                <Button variant="contained" color="primary"><Login /></Button>
            </Box>
        </Box>
    )
}