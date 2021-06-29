import { makeStyles } from '@material-ui/core/styles';
import logo from 'assets/opacity-logo.svg';

export const useMainStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: 0,
        scrollBehavior: 'smooth'
    }
}));

export const useHeaderStyles = makeStyles((theme) => ({
    root: {
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
    },
    logo: {
        width: '12rem'
    }
}));

export const useHeroStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundImage: `url(${logo})`,
        backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
        boxSizing: 'border-box',

        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            backgroundSize: 'contain',
            backgroundPosition: 'center left',
            justifyContent: 'space-between',
            padding: '0 5rem'
        }
    },
    title: {
        fontWeight: 'bold',
        maxWidth: '700px',

        [theme.breakpoints.up('md')]: {
            textAlign: 'left',
            fontSize: '3rem',
        }
    },
    devices: {
        display: 'none',
        [theme.breakpoints.up('lg')]: {
            display: 'block',
            width: '35%'
        }
    },
    socialMedia: {
        display: 'flex',

        [theme.breakpoints.up('md')]: {
            flexDirection: 'column',
            gap: '1rem'
        }
    }
}));

export const useFeaturesStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        gap: '1rem',

        [theme.breakpoints.up('md')]: {
            gap: '0',
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: '8rem 0'
        }
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        width: '100%',
        maxWidth: '250px',

        [theme.breakpoints.up('md')]: {
            height: '400px',
            maxWidth: '300px',
        }
    },
    cover: {
        width: '80%',
        maxWidth: '250px'
    }
}))

export const useWhyStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: ' black',
        padding: '2rem',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        aligItems: 'center',
        gap: '2rem'
    },
    title: {
        color: 'white',
        alignSelf: 'center',
        justifySelf: 'center',
        fontWeight: 'bold',
        maxWidth: '400px',

        [theme.breakpoints.up('md')]: {
            fontSize: '3rem'
        }
    },
    itemsContainer: {
        [theme.breakpoints.up('md')]: {
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-around'
        }
    },
    itemRoot: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: '1rem',
        width: '100%',
        margin: '2rem 0',
        maxWidth: '400px',

        [theme.breakpoints.up('md')]: {
            flexGrow: 1,
            height: '400px',
            margin: '0',
        }
    },
    itemNumberRoot: {
        display: 'flex',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: '#C4C4C4',
        minWidth: '40px',
        minHeight: '40px',
        borderRadius: "100px"
    },
    itemTitle: {
        color: 'white',
        marginBottom: '.5rem'
    },
    itemText: {
        color: 'white',
        weight: '100'
    },
    story: {
        color: 'rgba(255,255,255, .7)',
        maxWidth: '800px',
        alignSelf: 'center',
        fontWeight: '100'
    }
}))

export const useFeedbackStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: '2rem',
        boxSizing: 'border-box',

        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        }
    },
    title: {
        fontWeight: 'bold',
        maxWidth: '700px',
        [theme.breakpoints.up('md')]: {
            fontSize: '5rem',
            textAlign: 'left'
        }
    },
    cardsContainer: {
        [theme.breakpoints.up('md')]: {
            maxHeight: '60vh',
            overflow: 'auto',

            "&::-webkit-scrollbar": {
                width: 0,
                background: '#F7F7F7'
            }
        }
    },
    paper: {
        padding: '2rem',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#F7F7F7',
        margin: '1rem 0',
        gap: '1rem',
        maxWidth: '400px'
    },
    picture: {
        width: 64,
        borderRadius: '100px'
    }
}))

export const usePlansStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        aligItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        padding: '2rem',
        boxSizing: 'border-box',
        backgroundColor: '#F7F7F7'
    },
    title: {
        fontWeight: 'bold',
        maxWidth: '600px',
        alignSelf: 'center',

        [theme.breakpoints.up('md')]: {
            fontSize: '3rem'
        }
    },
    subtitle: {
        color: 'rgba(0,0,0, .7)',
        maxWidth: '800px',
        alignSelf: 'center',
        fontWeight: '100'
    },
    cardsContainer: {
        display: 'flex',
        flexDirection: 'column',
        aligItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',

        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            aligItems: 'flex-start',
            padding: '3rem 0'
        }
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifiContent: 'center',
        padding: '1rem',
        gap: '6rem',
        maxWidth: '250px',
        width: '100%',
        alignSelf: 'center'
    },
}))

export const useFooterStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        aligItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '2rem',
        boxSizing: 'border-box',
        backgroundColor: 'black',
    },
    logo: {
        width: '150px',
        alignSelf: 'center'
    },
    linkContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',

        [theme.breakpoints.up('md')]: {
            display: 'flex',
            alignSelf: 'center'
        }
    },
    socialMedia: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '400px',

        [theme.breakpoints.up('md')]: {
            alignSelf: 'center'
        }
    }
}))