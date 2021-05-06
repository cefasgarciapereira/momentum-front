import {
    TextField,
    FormControl,
    Select,
    InputLabel
} from '@material-ui/core';

export default function PersonalForm(props) {
    const {
        handleChange,
        values,
        handleSubmit,
        handleInstagramAt
    } = props;

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem 0', overflow: 'auto' }}>
            <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">Plano</InputLabel>
                <Select
                    native
                    value={values.plan}
                    onChange={handleChange}
                    label="Plano"
                    inputProps={{
                        name: 'plan',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option value="monthly">Mensal - R$29,90</option>
                    <option value="quaterly">Trimestral - R$73,90</option>
                    <option value="yearly">Anual - R$ 238,90</option>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                value={values.instagram_at}
                onChange={handleChange}
                onBlur={handleInstagramAt}
                name="instagram_at"
                label="@instagram"
                variant="outlined"
                helperText="Opcional: Informe seu instagram caso você seja close friends do Leonardo Siqueira"
            />
        </form>
    )
}