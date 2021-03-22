import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

export const usePageStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

export const useDrawerStyles =  makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const useRichTextStyles = makeStyles((theme) => ({
  container:{
    '& h1':{
      fontSize: '5rem',
      margin: 0

    },
    '& h2':{
      fontSize: '4rem',
      margin: 0

    },
    '& h3':{
      fontSize: '3rem',
      margin: 0
    },
    '& h4':{
      fontSize: '2rem',
      margin: 0

    },
    '& h5':{
      fontSize: '1.4rem',
      margin: 0

    },
    '& h6':{
      fontSize: '1rem',
      margin: 0
    },
    '& p, li, ol, pre':{
      fontSize: '1.2rem',
      lineHeight: '1.8rem',
    },
    '& li, ol':{
      margin: '1rem 0'
    }
  }
}))