import {
    TextField,
    Box
} from '@material-ui/core';
import { MaskedInput } from 'components';

export default function AddressForm(props) {
    const {
        handleChange,
        values,
        handleSubmit
    } = props;

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem 0', overflow: 'auto' }}>
            <TextField
                fullWidth
                value={values.city}
                onChange={handleChange}
                name="city"
                label="Cidade"
                variant="outlined"
                type="text"
            />

            <TextField
                fullWidth
                value={values.line}
                onChange={handleChange}
                name="line"
                label="Endereço"
                variant="outlined"
                type="text"
                helperText="Ex: Av. Rômulo Braga, 731"
            />

            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <TextField
                    fullWidth
                    value="BR"
                    name="country"
                    label="País"
                    variant="outlined"
                    type="text"
                    inputProps={{ maxLength: 2 }}
                />

                <TextField
                    fullWidth
                    value={values.state}
                    onChange={handleChange}
                    name="state"
                    label="Estado"
                    variant="outlined"
                    type="text"
                    inputProps={{ maxLength: 2 }}
                />

                <MaskedInput
                    fullWidth
                    value={values.postal_code}
                    onChange={handleChange}
                    name="postal_code"
                    label="CEP"
                    variant="outlined"
                    mask="99999-999"
                />
            </Box>
        </form>
    )
}