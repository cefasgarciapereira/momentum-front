import { Box, Typography } from '@material-ui/core';
import { useWhyStyles } from './styles';

export default function Why() {
    const classes = useWhyStyles();

    const Item = (props) => {
        const { number, title, text } = props;

        return (
            <Box className={classes.itemRoot}>
                <Box className={classes.itemNumberRoot}>
                    <Typography
                        variant="h6"
                        align="center"
                        style={{ alignSelf: 'center' }}
                    >
                        {number}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h5" className={classes.itemTitle}>
                        {title}
                    </Typography>
                    <Typography className={classes.itemText}>
                        {text}
                    </Typography>
                </Box>
            </Box>
        )

    }

    return (
        <Box className={classes.root}>
            <Typography
                variant="h4"
                align="center"
                className={classes.title}
            >
                Por que utilizar a Easy Quant?
            </Typography>

            <Typography
                align="center"
                className={classes.story}
                variant="h6"
            >
                Em 1973 o professor Burton Malkiel da Universidade de Princeton afirmou em seu livro,
                A Random Walk Down Wall Street, que um macaco vendado jogando dardos nas páginas de um
                jornal de finanças poderia selecionar um portfólio que performaria tão bem quanto um
                cuidadosamente selecionado por especialistas.
            </Typography>

            <Box className={classes.itemsContainer}>
                <Item
                    number="1"
                    title="Científico"
                    text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                    veritatis et quasi architecto beatae vitae dicta sunt explicabo."
                />

                <Item
                    number="2"
                    title="Verificabilidade"
                    text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                    veritatis et quasi architecto beatae vitae dicta sunt explicabo."
                />

                <Item
                    number="3"
                    title="Facilidade"
                    text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                    veritatis et quasi architecto beatae vitae dicta sunt explicabo."
                />
            </Box>

        </Box>
    )
}