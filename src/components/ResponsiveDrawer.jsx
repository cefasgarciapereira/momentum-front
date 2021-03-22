import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Avatar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Toolbar
} from '@material-ui/core';
import { Link } from 'react-router-dom'; 
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DescriptionIcon from '@material-ui/icons/Description';
import { generateAvatar } from 'utils/helper';
import { useSession } from 'contexts/session';
import { useTheme } from '@material-ui/core/styles';
import { useDrawerStyles } from './styles';

function ResponsiveDrawer(props) {
  const { window, children } = props;
  const { user, logout } = useSession();
  const classes = useDrawerStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem style={{gap: '1rem'}}>
          <Avatar>{generateAvatar(user.name)}</Avatar>
          <Typography>{user.name}</Typography>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem component={Link}  to='/home' style={{gap: '1rem', textDecoration: 'none'}}>
          <ListItemIcon><TimelineOutlinedIcon/></ListItemIcon>
            <Typography>Momentum</Typography>
        </ListItem>
        <ListItem component={Link}  to='/blog' style={{gap: '1rem', textDecoration: 'none'}}>
          <ListItemIcon><DescriptionIcon/></ListItemIcon>
            <Typography>Blog</Typography>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button style={{gap: '1rem'}} onClick={logout} active>
          <ListItemIcon><ExitToAppIcon/></ListItemIcon>
          <Typography>Sair</Typography>
        </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Easy Quant
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;