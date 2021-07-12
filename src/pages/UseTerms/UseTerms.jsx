import { Page } from 'components';
import { Typography, Grid } from '@material-ui/core';

export default function SignUp() {
    return (
        <Page title="Termos de Uso">
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
                xs={12}
                style={{
                    padding: 14
                }}
            >
                <Grid item xs={12}>
                    <Typography variant="h4">Termos de uso da EasyQuant</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        Ao acessar a plataforma, o usuário da EasyQuant CONCORDA em não reproduzir,
                        distribuir ou copiar qualquer qualquer conteúdo acessado pela plataforma.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        Ao acessar a plataforma, o usuário CONCORDA que os conteúdos disponibilizados pela
                        EasyQuant são de cunho educacional bem como as estratégias computadas pelos usuários
                        através da plataforma são meramente ilustrativas para fins educacionais,
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        O usuário CONCORDA que é responsável por quaisquer usos indevidos dos conteúdos
                        da EasyQuant, que conhece a possibilidade de erros de previsão e modelagem,
                        sejam de natureza dos dados seja de resultados estatísticos computados utilizando
                        a plataforma e que entende que os resultados da plataforma são meramente ilustrativos
                        e voltados ao estudo e ensino de finanças, se responsabilizando pelas consequências de
                        uso dos conteúdos para outros fins.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        A EasyQuant não faz recomendação de investimentos, embora tenha parceiros que realizem,
                        além de não ter qualquer função realizada por corretoras e gestoras de portfólios.
                        Somos uma plataforma voltada ao estudante que quer conhecer elementos avançados da teoria evitando
                        a necessidade de diversos conhecimentos paralelos que rondam as finanças, como programação,
                        aprendizagem estatística e teoria econômica.
                    </Typography>
                </Grid>
            </Grid>
        </Page>
    )
}