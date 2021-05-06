import { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Button } from '@material-ui/core';
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
                    <MenuItem onClick={handleClose}>Home</MenuItem>
                    <MenuItem onClick={handleClose}>Por Que?</MenuItem>
                    <MenuItem onClick={handleClose}>Depoimentos</MenuItem>
                    <MenuItem onClick={handleClose}>Planos</MenuItem>
                    <MenuItem><Login /></MenuItem>
                    <MenuItem onClick={handleClose}>Cadastrar</MenuItem>
                </Menu>
            </Box>
        )
    }

    return (
        <Box className={classes.root} id="header">
            <img src={textLogo} alt="Easy Quant Logo" className={classes.logo} />
            <Box style={{display: 'flex'}}>
                <Button onClick={handleClose}>Home</Button>
                <Button onClick={handleClose}>Por Que?</Button>
                <Button onClick={handleClose}>Depoimentos</Button>
                <Button onClick={handleClose}>Planos</Button>
                <Button variant="outlined" color="primary" style={{margin: '0 1rem'}}>Cadastrar</Button>
                <Button variant="contained" color="primary"><Login /></Button>
            </Box>
        </Box>
    )
}