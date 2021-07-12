import {
    TextField,
    FormControl,
    Select,
    InputLabel,
    Box
} from '@material-ui/core';
import { MaskedInput } from 'components';
import Cards from 'react-credit-cards';
import { useDeviceDetect } from 'utils/hooks';
import 'react-credit-cards/es/styles-compiled.css';

export default function PersonalForm(props) {
    const { isMobile } = useDeviceDetect();
    const {
        handleChange,
        values,
        handleInputFocus,
        clearInputFocus,
        handleSubmit
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
                    <option value="monthly">Mensal - R$29,90 / mês</option>
                    <option value="semiannually">Semestral - R$73,90 / semestre</option>
                    <option value="annual">Anual - R$ 238,90 / ano</option>
                </Select>
            </FormControl>

            <MaskedInput
                fullWidth
                value={values.card_number}
                onChange={handleChange}
                name="card_number"
                label="Número"
                variant="outlined"
                type="text"
                pattern="[0-9]*"
                onFocus={handleInputFocus}
                mask="9999 9999 9999 9999"
            />

            <TextField
                fullWidth
                value={values.card_name}
                onChange={handleChange}
                name="card_name"
                label="Nome no cartão"
                variant="outlined"
                type="text"
                onFocus={handleInputFocus}
            />

            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>

                <MaskedInput
                    fullWidth
                    value={values.card_expiry}
                    onChange={handleChange}
                    name="card_expiry"
                    label="Vencimento"
                    variant="outlined"
                    type="text"
                    onFocus={handleInputFocus}
                    mask="99/9999"
                />

                <TextField
                    fullWidth
                    value={values.cvc}
                    onChange={handleChange}
                    name="cvc"
                    label="CVC"
                    variant="outlined"
                    type="numeric"
                    onFocus={handleInputFocus}
                    onBlur={clearInputFocus}
                />
            </Box>
            {
                !isMobile &&
                <Cards
                    number={values.card_number}
                    name={values.card_name}
                    expiry={values.card_expiry}
                    cvc={values.cvc}
                    focused={values.focus}
                    locale={{
                        valid: 'vencimento',
                    }}
                    placeholders={{
                        name: 'seu nome aqui',
                    }}
                />
            }
        </form>
    )
}