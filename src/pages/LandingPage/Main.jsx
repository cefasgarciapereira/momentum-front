import { Page } from 'components';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Why from './Why';
import Feedback from './Feedback';
import Plans from './Plans';
import Footer from './Footer';
import { useMainStyles } from './styles';

export default function Main() {
    const classes = useMainStyles();

    return (
        <Page title="Home" className={classes.root}>
            <Header />
            <Hero/>
            <Features/>
            <Why/>
            <Feedback/>
            <Plans/>
            <Footer/>
        </Page>
    )
}