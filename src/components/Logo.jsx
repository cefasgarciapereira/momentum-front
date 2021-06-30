import textLogo from 'assets/black-text-logo.svg';

export default function Logo({...rest}) {
    return (
        <img src={textLogo} alt="Easy Quant Logo" {...rest}/>
    )
}