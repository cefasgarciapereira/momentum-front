import { useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import textLogo from 'assets/black-text-logo.svg';

export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box 
        id="header"
        style={{
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem',
        }}>
            <img src={textLogo} alt="Easy Quant Logo" style={{ width: '120px' }} />
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
                <MenuItem onClick={handleClose}>Entrar</MenuItem>
                <MenuItem onClick={handleClose}>Assinar</MenuItem>
            </Menu>
        </Box>
    )
}