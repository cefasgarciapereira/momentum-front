import { Box } from '@material-ui/core';
import { RichText } from 'prismic-reactjs';
import { useRichTextStyles } from './styles';

export default function PrismicText(props) {
    const { text } = props;
    const classes = useRichTextStyles();

    if (!text) return <h1>Carregando</h1>

    return (
        <Box className={classes.container}>
            {RichText.render(text)}
        </Box>
    )
}